export async function askTacticalAdvisor(message: string, context: any) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, context }),
    });

    if (!response.ok) throw new Error("Errore comunicazione server");
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "ERRORE DI COMUNICAZIONE CON IL QUARTIER GENERALE. RE-INVIARE IL MESSAGGIO.";
  }
}
