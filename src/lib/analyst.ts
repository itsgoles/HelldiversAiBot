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
  let archetypeId = "support"; 

  const categoryAnalyses: { label: string; score: number; feedback: string }[] = [];

  if (isExtended) {
    // Categories: Combat, Map, Survival, Weapons, Team, Mind, Identity
    const catScores = {
      combat: input.EQ1 === 'aggro' ? 80 : 40,
      map: input.EQ8 === 'constant' ? 90 : 50,
      survival: input.EQ17 === 'heavy' ? 85 : 45,
      weapons: input.EQ22 === 'god' ? 75 : 55,
      team: input.EQ28 === 'instareinforce' ? 95 : 60,
      mind: input.EQ33 === 'stats' ? 88 : 42,
      identity: input.EQ39 === 'everything' ? 100 : 50
    };

    categoryAnalyses.push(
      { label: "Istinto Combattimento", score: catScores.combat, feedback: catScores.combat > 70 ? "Aggressività controllata" : "Approccio cauto" },
      { label: "Gestione Mappa", score: catScores.map, feedback: catScores.map > 70 ? "Visione globale" : "Focus locale" },
      { label: "Sopravvivenza", score: catScores.survival, feedback: catScores.survival > 70 ? "Resilienza d'acciaio" : "Agilità reattiva" },
      { label: "Filosofia Armi", score: catScores.weapons, feedback: catScores.weapons > 70 ? "Dominio stratagemmi" : "Precisione balistica" },
      { label: "Dinamiche Squadra", score: catScores.team, feedback: catScores.team > 70 ? "Pilastro del team" : "Lupo solitario" },
      { label: "Mentalità", score: catScores.mind, feedback: catScores.mind > 70 ? "Analitico" : "Istintivo" },
      { label: "Identità Helldiver", score: catScores.identity, feedback: catScores.identity > 90 ? "Eroe Nazionale" : "Patriota Devoto" }
    );

    // Decision logic (simplified for example)
    if (catScores.combat > 70 && catScores.survival > 70) archetypeId = "tank";
    else if (catScores.map > 70 && catScores.team > 75) archetypeId = "leader";
    else if (catScores.combat > 70 && catScores.weapons < 60) archetypeId = "pyro";
    else if (catScores.survival > 70 && catScores.team > 80) archetypeId = "support";
    else if (catScores.combat < 50 && catScores.map > 80) archetypeId = "stealth";
    else archetypeId = "demolition";
  } else {
    // Logic for 8 Questions
    if (input.Q2 === "stealth" || input.Q5 === "solitario") {
      archetypeId = "stealth";
    } else if (input.Q1 === "lungo") {
      archetypeId = "sniper";
    } else if (input.Q2 === "aggressivo") {
      if (input.Q3 === "kill" || input.Q4 === "terminidi") {
        archetypeId = "pyro";
      } else {
        archetypeId = "tank";
      }
    } else if (input.Q3 === "obiettivi_principali" && input.Q5 === "entry") {
      archetypeId = "demolition";
    } else if (input.Q5 === "leader") {
      archetypeId = "leader";
    } else if (input.Q5 === "supporto") {
      archetypeId = "support";
    }
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
