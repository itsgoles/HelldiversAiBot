import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let warCache: { data: any; ts: number } | null = null;
const CACHE_FRESH = 30_000; // 30 seconds
const CACHE_STALE = 300_000; // 5 minutes

async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3) {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.status === 429 && i < maxRetries) {
        const delay = (Math.pow(2, i) * 1000) + (Math.random() * 1000);
        console.warn(`[WAR_PROXY] Rate limited (429) on ${url}. Retry ${i+1}/${maxRetries} in ${Math.round(delay)}ms`);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      return res;
    } catch (e: any) {
      if (i === maxRetries) throw e;
      console.warn(`[WAR_PROXY] Fetch error on ${url}: ${e.message}. Retrying...`);
      await new Promise(r => setTimeout(r, 1000));
    }
  }
  throw new Error("Max retries exceeded");
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000");

  // ✅ CORS — Explicit Trusted Origins
  const frontendUrls = process.env.FRONTEND_URLS?.split(",") || [
    "https://ais-dev-joxd6nj7vyc42swn6qbqb6-788823666053.europe-west2.run.app",
    "https://ais-pre-joxd6nj7vyc42swn6qbqb6-788823666053.europe-west2.run.app"
  ];
  
  app.use(cors({
    origin: frontendUrls,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "X-Super-Client", "X-Super-Contact"]
  }));
  
  app.use(express.json());

  // Gemini AI Route
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, context } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API Key configuration missing" });
      }

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

  // API Proxy Route for Helldivers 2 with SWR Cache
  app.get("/api/war-data", async (req, res) => {
    const now = Date.now();
    
    const updateCache = async () => {
      const HEADERS = {
        'User-Agent': 'HelldiversAiBot/1.0 (Super Earth Ministry of Truth)',
        'X-Super-Client': 'HelldiversAiBot',
        'X-Super-Contact': 'itsgoles',
        'Accept': 'application/json'
      };

      try {
        // 1. PRIMARY API: Helldivers Training Manual (Stable 2026)
        const primaryRes = await fetchWithRetry("https://helldiverstrainingmanual.com/api/v1/war/status", { headers: HEADERS }).catch(() => null);
        
        if (primaryRes && primaryRes.ok) {
          const data = await primaryRes.json();
          const payload = {
            war: data,
            assignments: [{ 
              title: "ORDINE MAGGIORE", 
              briefing: data.majorOrder || "Libera la galassia!",
              progress: [data.majorOrderProgress || 0.5],
              expiresAt: data.majorOrderExpiresAt || new Date(Date.now() + 86400000).toISOString()
            }],
            campaigns: data.planetStatus || data.campaigns || [],
            timestamp: new Date().toISOString(),
            source: "https://helldiverstrainingmanual.com"
          };
          warCache = { data: payload, ts: Date.now() };
          return;
        }

        // 2. SECONDARY: Helldivers2.dev
        const [assignRes, campRes] = await Promise.all([
          fetchWithRetry("https://api.helldivers2.dev/api/v1/assignments/13", { headers: HEADERS }).catch(() => null),
          fetchWithRetry("https://api.helldivers2.dev/api/v1/campaigns", { headers: HEADERS }).catch(() => null)
        ]);

        if ((assignRes && assignRes.ok) || (campRes && campRes.ok)) {
          const assignmentsData = assignRes && assignRes.ok ? await assignRes.json() : [];
          const campaignsData = campRes && campRes.ok ? await campRes.json() : [];
          
          const payload = {
            war: {},
            assignments: Array.isArray(assignmentsData) ? assignmentsData : (assignmentsData ? [assignmentsData] : []),
            campaigns: Array.isArray(campaignsData) ? campaignsData : [],
            timestamp: new Date().toISOString(),
            source: "https://api.helldivers2.dev"
          };
          warCache = { data: payload, ts: Date.now() };
        }
      } catch (error) {
        console.error("[WAR_PROXY] Background Update Error:", error);
      }
    };

    // Stale-While-Revalidate Logic
    if (warCache) {
      const age = now - warCache.ts;
      if (age < CACHE_FRESH) {
        return res.json(warCache.data);
      } else if (age < CACHE_STALE) {
        // Return stale data immediately and revalidate in background
        res.json(warCache.data);
        updateCache();
        return;
      }
    }

    // No cache or very old data
    await updateCache();
    
    if (warCache) {
      res.json(warCache.data);
    } else {
      // EMERGENCY FALLBACK (Democracy Guard)
      const fallback = {
        war: { warId: 2026 },
        assignments: [{
          title: "DIFESA DELLA DEMOCRAZIA",
          briefing: "Segnale interrotto dal Ministero della Verità per manutenzione. Continua a combattere Helldiver!",
          progress: [0.5],
          expiresAt: new Date(Date.now() + 86400000).toISOString()
        }],
        campaigns: [
          { name: "Cura", sector: "Ustica", owner: "Humans", liberation: 100 },
          { name: "Vandalon IV", sector: "Xzar", owner: "Automaton", liberation: 25 }
        ],
        timestamp: new Date().toISOString(),
        source: "Super Earth Emergency Protocol",
        isMock: true
      };
      res.json(fallback);
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
