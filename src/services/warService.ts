
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
    if (!data || (Object.keys(data.war || {}).length === 0 && !data.campaigns)) {
      throw new Error("DATI_VUOTI_DALLA_RETE");
    }

    const { assignments, campaigns } = data;
    
    let progress = 0;
    const firstAssignment = assignments?.[0];
    if (firstAssignment) {
      const task = firstAssignment.tasks?.[0] || firstAssignment.setting?.tasks?.[0];
      const current = firstAssignment.progress?.[0] || 0;
      const target = task?.values?.[0] || task?.value || task?.amount || 1;
      progress = Math.min(100, (current / target) * 100);
      
      if (current > 0 && current <= 1 && target === 1) {
        progress = current * 100;
      }
    }

    const majorOrder = firstAssignment ? {
      title: firstAssignment.title || firstAssignment.setting?.overrideTitle || "ORDINE MAGGIORE",
      description: firstAssignment.briefing || firstAssignment.setting?.overrideBriefing || "Libera la galassia!",
      progress: progress,
      expiresAt: firstAssignment.expiresAt || new Date().toISOString()
    } : undefined;

    const activePlanets = (campaigns || []).slice(0, 10).map((c: any) => {
      const planet = c.planet || c;
      const status = c.planetStatus || planet;
      const health = status?.health || planet?.health || 0;
      const maxHealth = status?.maxHealth || planet?.maxHealth || 1000;
      const liberation = 100 - ((health / maxHealth) * 100);

      return {
        name: planet?.name || "Pianeta Ignoto",
        sector: planet?.sector || "Settore Sconosciuto",
        liberation: Math.max(0, Math.min(100, liberation)),
        owner: planet?.owner || "Humans",
        health,
        maxHealth,
        players: (planet?.statistics?.playerCount || c.statistics?.playerCount || 0)
      };
    });

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
