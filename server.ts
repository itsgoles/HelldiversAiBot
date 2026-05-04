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
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // API Proxy Route for Helldivers 2 with Cache
  app.get("/api/war-data", async (req, res) => {
    const now = Date.now();
    if (warCache && now - warCache.ts < CACHE_TTL) {
      return res.json(warCache.data);
    }

    try {
      const API_BASE = "https://api.helldivers2.dev/api/v1";
      
      const fetchOptions = { 
        headers: { 
          'User-Agent': 'Helldivers2TacticalAnalyst/1.0',
          'Accept': 'application/json'
        } 
      };

      const [warRes, assignmentsRes, campaignsRes] = await Promise.all([
        fetch(`${API_BASE}/war`, fetchOptions),
        fetch(`${API_BASE}/assignments`, fetchOptions),
        fetch(`${API_BASE}/campaigns`, fetchOptions)
      ]);

      const warData = warRes.ok ? await warRes.json() : {};
      const assignmentsData = assignmentsRes.ok ? await assignmentsRes.json() : [];
      const campaignsData = campaignsRes.ok ? await campaignsRes.json() : [];

      const result = {
        war: warData,
        assignments: assignmentsData,
        campaigns: campaignsData,
        timestamp: new Date().toISOString()
      };

      // Update cache
      warCache = { data: result, ts: now };

      res.json(result);
    } catch (error) {
      console.error("Proxy Error:", error);
      res.status(500).json({ error: "Failed to fetch war data" });
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
