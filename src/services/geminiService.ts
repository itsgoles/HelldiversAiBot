import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY non configurata. Controlla i segreti di AI Studio.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function askTacticalAdvisor(message: string, context: any) {
  try {
    const ai = getAI();
    const prompt = `Sei un Ufficiale Scientifico di Super Terra. 
    Contesto Helldiver: Archetipo: ${context.archetype}, Forze: ${context.strengths.join(', ')}.
    Dati di Guerra: ${JSON.stringify(context.warData || 'In attesa di uplink')}.
    
    Domanda Helldiver: ${message}
    
    Rispondi con tono patriottico, autoritario ma incoraggiante. Usa termini come 'Cittadino', 'Libertà', 'Democrazia Gestita'. 
    Risposta breve ed efficace (max 3-4 frasi).`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "ERRORE DI COMUNICAZIONE CON IL QUARTIER GENERALE. RE-INVIARE IL MESSAGGIO.";
  }
}
