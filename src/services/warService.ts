
export interface WarStatus {
  time: string;
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

const API_BASE = "https://api.helldivers2.dev/v1";

export async function fetchWarStatus(): Promise<WarStatus | null> {
  try {
    const response = await fetch("/api/war-data");
    
    if (!response.ok) throw new Error("Errore nel recupero della Guerra Galattica");
    
    const { war, assignments, campaigns } = await response.json();
    
    const majorOrder = assignments?.[0] ? {
      title: assignments[0].title || "ORDINE MAGGIORE",
      description: assignments[0].briefing || "Libera la galassia!",
      progress: (assignments[0].progress?.[0] || 0) * 100,
      expiresAt: assignments[0].expiresAt || new Date().toISOString()
    } : undefined;

    const activePlanets = (campaigns || []).slice(0, 10).map((c: any) => ({
      name: c.planet?.name || "Pianeta Ignoto",
      sector: c.planet?.sector || "Settore Sconosciuto",
      liberation: 100 - (c.planet?.health / c.planet?.maxHealth * 100 || 0),
      owner: c.planet?.owner || "Humans",
      health: c.planet?.health || 0,
      maxHealth: c.planet?.maxHealth || 1000,
      players: c.planet?.statistics?.playerCount || 0
    }));

    return {
      time: new Date().toISOString(),
      majorOrder,
      activePlanets
    };
  } catch (error) {
    console.error("War Service Error:", error);
    return null;
  }
}
