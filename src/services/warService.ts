
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

// Proxy endpoint defined in server.ts
export async function fetchWarStatus(): Promise<WarStatus | null> {
  try {
    const response = await fetch("/api/war-data");
    
    if (!response.ok) throw new Error("Errore nel recupero della Guerra Galattica");
    
    const { assignments, campaigns } = await response.json();
    
    const majorOrder = assignments?.[0] ? {
      title: assignments[0].title || "ORDINE MAGGIORE",
      description: assignments[0].briefing || "Libera la galassia!",
      progress: (assignments[0].progress?.[0] || 0) * 100,
      expiresAt: assignments[0].expiresAt || new Date().toISOString()
    } : undefined;

    const activePlanets = (campaigns || []).slice(0, 10).map((c: any) => {
      const health = c.planet?.health || 0;
      const maxHealth = c.planet?.maxHealth || 1000;
      // liberation is usually: health / maxHealth * 100 if health represents progress
      // or 100 - (health / maxHealth * 100) if health represents enemy presence.
      // Based on helldivers2.dev, health often starts at max and goes to 0 for liberation.
      const liberation = 100 - ((health / maxHealth) * 100);

      return {
        name: c.planet?.name || "Pianeta Ignoto",
        sector: c.planet?.sector || "Settore Sconosciuto",
        liberation: Math.max(0, Math.min(100, liberation)),
        owner: c.planet?.owner || "Humans",
        health: health,
        maxHealth: maxHealth,
        players: c.planet?.statistics?.playerCount || 0
      };
    });

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
