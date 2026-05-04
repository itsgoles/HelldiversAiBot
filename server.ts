import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache for War Data
let warCache: { data: any; ts: number } | null = null;
const CACHE_TTL = 60_000; // 60 seconds

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "8080");

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Gemini AI Route
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, context } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API Key configuration missing" });
      }

      // We'll use a direct fetch to the Gemini API to avoid SDK version issues in server.ts
      // or we can use the SDK if we ensure it's compatible. 
      // Let's use the REST API for maximum reliability here as requested in your report.
      const prompt = `Sei un Ufficiale Scientifico di Super Terra. 
      Contesto missione: ${JSON.stringify(context)}
      Messaggio Helldiver: ${message}
      
      Rispondi con tono patriottico, autoritario ma incoraggiante. Massima fedeltà al mondo di Helldivers 2. 
      Usa termini come 'Cittadino', 'Libertà', 'Democrazia Gestita'. Risposta breve (max 3 frasi).`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "ERRORE DI COMUNICAZIONE CON IL QUARTIER GENERALE.";
      
      res.json({ response: text });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to communicate with Super Earth Headquarters" });
    }
  });

  // API Proxy Route for Helldivers 2 with Cache and Resilient Fallback
  app.get("/api/war-data", async (req, res) => {
    const now = Date.now();
    if (warCache && now - warCache.ts < CACHE_TTL) {
      return res.json(warCache.data);
    }

    const tryFetch = async (baseUrl: string) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const fetchOptions = { 
        headers: { 
          'User-Agent': 'Helldivers2TacticalAnalyst/1.0 (Super Earth Ministry of Truth)',
          'Accept': 'application/json',
          'Accept-Language': 'en-US,en;q=0.9'
        },
        signal: controller.signal
      };

      try {
        console.log(`[WAR_PROXY] Tentativo di recupero dati da: ${baseUrl}`);
        
        // We try to fetch the most critical endpoints
        const [warRes, assignmentsRes, campaignsRes] = await Promise.all([
          fetch(`${baseUrl}/war`, fetchOptions).catch(e => { console.error(`[WAR_PROXY] Fetch error /war from ${baseUrl}:`, e.message); return null; }),
          fetch(`${baseUrl}/assignments`, fetchOptions).catch(e => { console.error(`[WAR_PROXY] Fetch error /assignments from ${baseUrl}:`, e.message); return null; }),
          fetch(`${baseUrl}/campaigns`, fetchOptions).catch(e => { console.error(`[WAR_PROXY] Fetch error /campaigns from ${baseUrl}:`, e.message); return null; })
        ]);

        let warData = warRes && warRes.ok ? await warRes.json().catch(() => null) : null;
        let assignmentsData = assignmentsRes && assignmentsRes.ok ? await assignmentsRes.json().catch(() => null) : null;
        let campaignsData = campaignsRes && campaignsRes.ok ? await campaignsRes.json().catch(() => null) : null;

        // Fallback: Some APIs (like Diveharder) might have different structures or combined status
        if (!warData && !assignmentsData && !campaignsData) {
           console.log(`[WAR_PROXY] Verificando endpoint alternativi (/status) su ${baseUrl}`);
           const statusRes = await fetch(`${baseUrl}/status`, fetchOptions).catch(() => null);
           if (statusRes && statusRes.ok) {
             const statusData = await statusRes.json().catch(() => null);
             if (statusData) {
               warData = statusData;
               assignmentsData = statusData.assignments || statusData.Assignments || statusData.majorOrder;
               campaignsData = statusData.campaigns || statusData.Campaigns || statusData.activeCampaigns;
             }
           }
        }

        // Final consistency check
        const finalAssignments = Array.isArray(assignmentsData) ? assignmentsData : (warData?.assignments || []);
        const finalCampaigns = Array.isArray(campaignsData) ? campaignsData : (warData?.campaigns || warData?.activeCampaigns || []);

        if (finalCampaigns.length > 0 || finalAssignments.length > 0 || (warData && warData.warId)) {
          console.log(`[WAR_PROXY] Successo parziale/totale da ${baseUrl}`);
          return {
            war: warData || {},
            assignments: Array.isArray(finalAssignments) ? finalAssignments : [],
            campaigns: Array.isArray(finalCampaigns) ? finalCampaigns : [],
            timestamp: new Date().toISOString(),
            source: baseUrl
          };
        }
      } catch (e) {
        console.error(`[WAR_PROXY] Errore critico durante il fetch da ${baseUrl}:`, e instanceof Error ? e.message : e);
      } finally {
        clearTimeout(timeoutId);
      }
      return null;
    };

    try {
      // Expanded Priority List of Helldivers 2 Community APIs
      const apiSources = [
        "https://api.helldivers2.dev/api/v1",
        "https://helldivers-2-api.vercel.app/api/v1",
        "https://helldivers-2-dotnet.vercel.app/api/v1",
        "https://api.live.helldivers2.dev/api/v1",
        "https://hds.mivv.bot/api/v1",
        "https://api.diveharder.com/v1",
        "https://hellhub.app/api/v1",
        "https://galactic-war.fly.dev/api/v1"
      ];

      let result = null;
      for (const source of apiSources) {
        result = await tryFetch(source);
        if (result) break;
      }

      // EMERGENCY FALLBACK (Democracy Guard)
      // If all APIs fail, return a simulated tactical context so the app doesn't break
      if (!result) {
        console.warn("[WAR_PROXY] Tutte le sorgenti API hanno fallito. Attivazione Protocollo Emergenza (MOCK DATA).");
        result = {
          war: { warId: 888, season: 1 },
          assignments: [{
            title: "DIFESA DELLA DEMOCRAZIA",
            briefing: "Interferenze nemiche hanno interrotto i collegamenti satellitari. Procedere con cautela in tutti i settori. La libertà non si ferma mai.",
            progress: [0.75],
            expiresAt: new Date(Date.now() + 86400000).toISOString()
          }],
          campaigns: [
            { planet: { name: "Cura", sector: "Settore Ustica", health: 1000, maxHealth: 5000, owner: "Humans" } },
            { planet: { name: "Vandalon IV", sector: "Settore Xzar", health: 4000, maxHealth: 5000, owner: "Automaton" } },
            { planet: { name: "Estanu", sector: "Settore L'estran", health: 2000, maxHealth: 5000, owner: "Terminids" } }
          ],
          timestamp: new Date().toISOString(),
          source: "Protocollo Emergenza Super Terra",
          isMock: true
        };
      }

      // Update cache
      warCache = { data: result, ts: now };

      res.json(result);
    } catch (error) {
      console.error("Proxy Error:", error);
      res.status(500).json({ error: "Errore fatale nelle comunicazioni del Quartier Generale." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
