
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
      if (response.status === 404) throw new Error("MINISTERO_PIANETI_NON_TROVATI");
      if (response.status === 504) throw new Error("GATEWAY_TIMEOUT_SATELLITE");
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "ERRORE_CONNESSIONE_SUPER_TERRA");
    }
    
    const data = await response.json();
    console.log("[WAR_SERVICE] Raw Data Received:", JSON.stringify(data).substring(0, 500) + "...");
    
    if (!data || (!data.campaigns && !data.assignments)) {
      throw new Error("DATI_VUOTI_DALLA_RETE");
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
        if (typeof p.liberation === 'number') {
          liberation = p.liberation;
        } else if (typeof s.health === 'number' && typeof s.maxHealth === 'number' && s.maxHealth > 0) {
          liberation = 100 - ((s.health / s.maxHealth) * 100);
        } else if (typeof p.health === 'number' && typeof p.maxHealth === 'number' && p.maxHealth > 0) {
          liberation = 100 - ((p.health / p.maxHealth) * 100);
        }

        return {
          name,
          sector,
          liberation: Math.max(0, Math.min(100, liberation)),
          owner: (owner === "Humans" || owner === "Terminids" || owner === "Automaton" || owner === "Illuminate") ? owner : "Humans",
          health: s.health || p.health || 0,
          maxHealth: s.maxHealth || p.maxHealth || 1000,
          players
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
