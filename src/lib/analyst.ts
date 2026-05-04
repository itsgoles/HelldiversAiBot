import { Build, BUILDS, ARCHETYPES } from "../constants";

export interface ProfileInput {
  [key: string]: string;
}

export interface PlayerStats {
  playTime?: string;
  missionsPlayed?: string;
  missionsWon?: string;
  avgDifficulty?: string;
  killAvg?: "basse" | "medie" | "alte";
  deathAvg?: "poche" | "medie" | "tante";
  extractionRate?: "bassa" | "media" | "alta";
  secondaryFocus?: "mai" | "a volte" | "quasi sempre";
  friendlyFire?: "mai" | "ogni tanto" | "spesso";
}

export interface AnalysisResult {
  archetypeId: string;
  archetype: string;
  summary: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  statsFeedback: { label: string; value: string; target: string; status: "basso" | "medio" | "alto" }[];
  recommendedBuilds: Build[];
  isExtended: boolean;
  categoryAnalyses?: { label: string; score: number; feedback: string }[];
}

export function analyzePlayer(input: ProfileInput, stats?: PlayerStats): AnalysisResult {
  const isExtended = Object.keys(input).some(k => k.startsWith('EQ'));
  
  // Point system for archetypes
  const scores: Record<string, number> = {
    stealth: 0,
    tank: 0,
    sniper: 0,
    support: 0,
    leader: 0,
    pyro: 0,
    demolition: 0
  };

  if (!isExtended) {
    // Logic for 8 Questions (Short Quiz)
    // Q1: Distance (Likert 1-5). 1=Aggro, 5=Sniper
    const q1 = parseInt(input.Q1 || "3");
    if (q1 <= 2) { scores.tank += 3; scores.pyro += 2; }
    if (q1 >= 4) { scores.sniper += 3; scores.stealth += 2; }

    // Q2: Priority (Multi)
    if (input.Q2 === 'obj') scores.demolition += 3;
    if (input.Q2 === 'samples') scores.stealth += 2;
    if (input.Q2 === 'mates') scores.support += 3;
    if (input.Q2 === 'stats') scores.pyro += 2;

    // Q3: Sacrifice (Boolean)
    if (input.Q3 === 'true') scores.tank += 2;
    if (input.Q3 === 'false') scores.stealth += 2;

    // Q4: Nest reaction (Multi)
    if (input.Q4 === 'orbital') scores.tank += 2;
    if (input.Q4 === 'grenade') scores.demolition += 2;
    if (input.Q4 === 'bypass') scores.stealth += 3;

    // Q5: Support role (Likert 1-5). 5=Support
    const q5 = parseInt(input.Q5 || "3");
    if (q5 >= 4) scores.support += 4;

    // Q6: Tool (Multi)
    if (input.Q6 === 'shield') scores.tank += 3;
    if (input.Q6 === 'supply') scores.support += 3;
    if (input.Q6 === 'autocannon') scores.demolition += 3;
    if (input.Q6 === 'jump') scores.stealth += 3;

    // Q7: Friendly Fire (Boolean)
    if (input.Q7 === 'true') scores.pyro += 2;

    // Q8: Communication (Multi)
    if (input.Q8 === 'voice') scores.leader += 4;
    if (input.Q8 === 'ping') scores.leader += 2;
  } else {
    // Logic for 45 Questions (Extended Quiz)
    // Map Likert 1-5 to points
    const getLikert = (id: string) => parseInt(input[id] || "3");

    // Combat
    if (input.EQ1 === 'aggro') scores.tank += 3;
    if (input.EQ1 === 'bypass') scores.stealth += 3;
    if (getLikert('EQ3') >= 4) scores.tank += 2;
    if (input.EQ4 === 'true') scores.support += 2;

    // Map
    if (getLikert('EQ8') >= 4) scores.leader += 2;
    if (input.EQ10 === 'hot') scores.tank += 3;
    if (input.EQ10 === 'safe') scores.stealth += 3;

    // Survival
    if (input.EQ17 === 'heavy') scores.tank += 4;
    if (input.EQ17 === 'light') scores.stealth += 4;

    // Team
    if (input.EQ28 === 'instareinforce') scores.support += 2;
    if (getLikert('EQ29') >= 4) scores.support += 2;
    if (input.EQ32 === 'lead') scores.leader += 3;

    // Weapons
    if (input.EQ21 === 'shotgun') scores.pyro += 2;
    if (input.EQ21 === 'marksman') scores.sniper += 3;
    
    // Categorical aggregation (for display)
    // Combat, Map, Survival, Weapons, Team, Mind, Identity
  }

  // Determine winning archetype
  let archetypeId = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

  // If all zero, default to support
  if (Object.values(scores).every(v => v === 0)) archetypeId = "support";

  const categoryAnalyses: { label: string; score: number; feedback: string }[] = [];
  if (isExtended) {
    const getCatScore = (ids: string[]) => {
      let total = 0;
      ids.forEach(id => {
        const val = input[id];
        if (val === 'true' || val === 'always' || val === 'constant' || val === 'expert' || val === 'everything' || val === 'heavy') total += 20;
        else if (val === '5') total += 20;
        else if (val === '4') total += 15;
        else if (val === '3') total += 10;
        else if (val === '2') total += 5;
        else total += 2;
      });
      return Math.min(100, Math.max(0, total * (100 / (ids.length * 20))));
    };

    categoryAnalyses.push(
      { label: "Istinto Combattimento", score: getCatScore(['EQ1', 'EQ2', 'EQ3', 'EQ4', 'EQ5', 'EQ6', 'EQ7']), feedback: "Aggressività" },
      { label: "Gestione Mappa", score: getCatScore(['EQ8', 'EQ9', 'EQ10', 'EQ11', 'EQ12', 'EQ13']), feedback: "Orientamento" },
      { label: "Sopravvivenza", score: getCatScore(['EQ14', 'EQ15', 'EQ16', 'EQ17', 'EQ18', 'EQ19', 'EQ20']), feedback: "Resilienza" },
      { label: "Dinamiche Squadra", score: getCatScore(['EQ28', 'EQ29', 'EQ30', 'EQ31', 'EQ32']), feedback: "Coordinazione" },
      { label: "Identità Helldiver", score: getCatScore(['EQ39', 'EQ40', 'EQ41', 'EQ42', 'EQ43', 'EQ44', 'EQ45']), feedback: "Patriottismo" }
    );
  }

  const selectedArchetype = ARCHETYPES.find(a => a.id === archetypeId) || ARCHETYPES[0];
  const resultStrengths = [...selectedArchetype.strengths];
  const resultWeaknesses = [...selectedArchetype.weaknesses];

  // Contextual feedback
  if (input.Q6 === "prudente" || input.EQ14 === "small") resultStrengths.push("Sopravvivenza metodica");
  if (input.Q8 === "amici" || input.EQ31 === "yes") resultStrengths.push("Coordinazione eccellente");
  
  if (input.Q6 === "eroico" || input.EQ40 === "hero") resultWeaknesses.push("Eccessivo spirito di sacrificio");

  // Build mapping
  const builds: Build[] = [];
  if (BUILDS[archetypeId]) builds.push(...BUILDS[archetypeId]);
  
  // Fillers
  const allBuildPool = Object.values(BUILDS).flat();
  while (builds.length < 3) {
    const randomBuild = allBuildPool[Math.floor(Math.random() * allBuildPool.length)];
    if (!builds.find(b => b.name === randomBuild.name)) {
      builds.push(randomBuild);
    }
  }

  // Stats feedback
  const statsFeedback: any[] = [];
  if (stats) {
    const mapStatus = (val: string, target: string) => val === target ? "alto" : "medio";
    if (stats.killAvg) statsFeedback.push({ label: "Volume Sterminio", value: stats.killAvg, target: "alte", status: mapStatus(stats.killAvg, "alte") });
    if (stats.deathAvg) statsFeedback.push({ label: "Tasso Sopravvivenza", value: stats.deathAvg, target: "poche", status: mapStatus(stats.deathAvg, "poche") });
    if (stats.friendlyFire) statsFeedback.push({ label: "Disciplina Fuoco", value: stats.friendlyFire, target: "mai", status: mapStatus(stats.friendlyFire, "mai") });
    if (stats.extractionRate) statsFeedback.push({ label: "Affidabilità Estrazione", value: stats.extractionRate, target: "alta", status: mapStatus(stats.extractionRate, "alta") });
  }

  return {
    archetypeId,
    archetype: selectedArchetype.name,
    description: selectedArchetype.description,
    summary: isExtended 
      ? `Analisi Biometrica Completa: Il profilo riflette un Helldiver con inclinazione ${selectedArchetype.name}. La tua dottrina è solida.` 
      : `${selectedArchetype.description} La democrazia conta su di te!`,
    strengths: Array.from(new Set(resultStrengths)),
    weaknesses: Array.from(new Set(resultWeaknesses)),
    statsFeedback,
    recommendedBuilds: builds.slice(0, 3),
    isExtended,
    categoryAnalyses
  };
}
