
export interface WarStatus {
  time: string;
  source?: string;
  isMock?: boolean;
  majorOrder?: {
    title: string;
    description: string;
    progress: number;
    expiresAt: string;
  };
  activePlanets: {
    name: string;
    sector: string;
    liberation: number;
    owner: "Humans" | "Terminids" | "Automaton" | "Illuminate";
    health: number;
    maxHealth: number;
    players: number;
    isDefense?: boolean;
    thumbnail?: string;
    timeRemaining?: string;
  }[];
}

// Proxy endpoint defined in server.ts
// Client-side cache to persist across reloads
const CACHE_KEY = "helldivers_war_cache";
const CACHE_EXPIRY = 60000; // 1 minute local cache

export interface WarStatusError {
  type: 'timeout' | 'offline' | 'invalid_data' | 'server_error';
  message: string;
}

// Faction translations
const fictionsMap: Record<string, string> = {
  "Humans": "Super Terra",
  "Terminids": "Terminidi",
  "Automaton": "Automi",
  "Illuminate": "Illuminati"
};

// Common sector translations (partial list, will fallback to original if not found)
const sectorsMap: Record<string, string> = {
  "Umlaut": "Sotto-settore Umlaut",
  "Orion": "Settore Orion",
  "Xzar": "Settore Xzar",
  "Ustica": "Settore Ustica",
  "L'estran": "Settore L'estran"
};

export async function fetchWarStatus(): Promise<WarStatus | null> {
  // Try local cache first if we're quickly re-accessing
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        console.log("[WAR_SERVICE] Using fresh local cache");
        return data;
      }
    }
  } catch (e) {
    console.warn("[WAR_SERVICE] Failed to read local cache");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch("/api/war-data", { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const status = response.status;
      if (status === 404) throw new Error("ERRORE_404_SATELLITE_NON_TROVATO");
      if (status === 429) throw new Error("ERRORE_429_LIMITAZIONE_MINISTERIALE");
      if (status === 500) throw new Error("ERRORE_500_QG_OFFLINE");
      if (status === 503) throw new Error("ERRORE_503_MANUTENZIONE_RETE");
      if (status === 504) throw new Error("ERRORE_504_TIMEOUT_SATELLITE");
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `ERRORE_CONNESSIONE_${status}`);
    }
    
    const data = await response.json();
    console.log("[WAR_SERVICE] Raw Data Received:", JSON.stringify(data).substring(0, 500) + "...");
    
    if (!data || (!data.campaigns && !data.assignments && !data.war)) {
      throw new Error("ERRORE_DATI_CORROTTI_O_VUOTI");
    }

    const { assignments, campaigns, war } = data;
    
    // Robust Major Order Mapping
    const firstAssignment = assignments?.[0] || war?.majorOrder;
    let majorOrder: WarStatus['majorOrder'] = undefined;

    if (firstAssignment) {
      let progress = 0;
      // Handle various progress formats (array of floats, direct number, or tasks)
      if (Array.isArray(firstAssignment.progress)) {
        const val = firstAssignment.progress[0];
        progress = val <= 1 ? val * 100 : val;
      } else if (typeof firstAssignment.progress === 'number') {
        progress = firstAssignment.progress <= 1 ? firstAssignment.progress * 100 : firstAssignment.progress;
      } else {
        // Fallback to task calculation
        const task = firstAssignment.tasks?.[0] || firstAssignment.setting?.tasks?.[0];
        const current = firstAssignment.progress?.[0] || 0;
        const target = task?.values?.[0] || task?.value || task?.amount || 1;
        progress = Math.min(100, (current / target) * 100);
      }

      majorOrder = {
        title: firstAssignment.title || firstAssignment.setting?.overrideTitle || "ORDINE MAGGIORE",
        description: firstAssignment.briefing || firstAssignment.setting?.overrideBriefing || firstAssignment.description || "Libera la galassia!",
        progress: Math.min(100, Math.max(0, progress)),
        expiresAt: firstAssignment.expiresAt || new Date(Date.now() + 86400000).toISOString()
      };
    }

    // Robust Planet Mapping
    const activePlanets = (campaigns || [])
      .map((c: any) => {
        // Attempt to find the planet object in various common structures
        const p = c.planet || c;
        const s = c.planetStatus || p; // Some APIs use a status sub-object
        
        // Extract basic info with fallbacks
        const name = p.name || p.planetName || "Pianeta Ignoto";
        const sector = p.sector || p.planetSector || "Settore Sconosciuto";
        const owner = p.owner || p.currentOwner || "Humans";
        const players = p.statistics?.playerCount || p.players || c.players || 0;
        
        // Better liberation logic: direct field or calculate from health
        let liberation = 0;
        let isDefense = false;

        if (typeof p.liberation === 'number') {
          liberation = p.liberation;
        } else if (typeof s.health === 'number' && typeof s.maxHealth === 'number' && s.maxHealth > 0) {
          liberation = 100 - ((s.health / s.maxHealth) * 100);
        }

        // Defense detection (liberation usually represents enemy progress on human planets)
        if (owner === "Humans" && liberation < 100) {
          isDefense = true;
          // In defense, we show Super Earth progress (flipping it if the API gives current enemy health)
          if (liberation > 0 && liberation < 100) liberation = 100 - liberation;
        }

        // Time estimation (simulated based on players if not in API)
        const timeRemaining = p.players > 5000 ? "Libertà in circa 12 ore" : "Forze schiaccianti attestate";

        return {
          name,
          sector: sectorsMap[sector] || sector,
          liberation: Math.max(0, Math.min(100, liberation)),
          owner: (owner === "Humans" || owner === "Terminids" || owner === "Automaton" || owner === "Illuminate") ? owner : "Humans",
          health: s.health || p.health || 0,
          maxHealth: s.maxHealth || p.maxHealth || 1000,
          players,
          isDefense,
          timeRemaining,
          thumbnail: `https://images.unsplash.com/photo-1614728263952-84ea206f25b2?auto=format&fit=crop&q=80&w=300&h=150` // Placeholder cinematic planet
        };
      })
      .filter((p: any) => p.name !== "Pianeta Ignoto") // Filter out obviously failed mappings
      .slice(0, 10);

    const result: WarStatus = {
      time: new Date().toISOString(),
      source: data.source,
      isMock: data.isMock,
      majorOrder,
      activePlanets
    };

    // Update local cache
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: result,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn("[WAR_SERVICE] Failed to update local cache");
    }

    return result;
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error("War Service Error:", error);
    
    // If it's a fetch failure and we have ANY cache (even stale), return it as fallback
    try {
      const stale = localStorage.getItem(CACHE_KEY);
      if (stale) {
        const { data } = JSON.parse(stale);
        console.warn("[WAR_SERVICE] Connection failed, using stale cache as fallback");
        return {
          ...data,
          time: data.time + " (STALEDATA)"
        };
      }
    } catch (e) {}

    return null;
  }
}
