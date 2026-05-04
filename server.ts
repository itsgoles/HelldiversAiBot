import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Proxy Route for Helldivers 2
  // We use this to avoid CORS issues and have more control over the fetch
  app.get("/api/war-data", async (req, res) => {
    try {
      // Trying different endpoints for better reliability
      const API_BASE = "https://api.helldivers2.dev/api/v1";
      
      const [warRes, assignmentsRes, campaignsRes] = await Promise.all([
        fetch(`${API_BASE}/war`, { headers: { 'User-Agent': 'Helldivers2TacticalAnalyst/1.0' } }),
        fetch(`${API_BASE}/assignments`, { headers: { 'User-Agent': 'Helldivers2TacticalAnalyst/1.0' } }),
        fetch(`${API_BASE}/campaigns`, { headers: { 'User-Agent': 'Helldivers2TacticalAnalyst/1.0' } })
      ]);

      const warData = warRes.ok ? await warRes.json() : {};
      const assignmentsData = assignmentsRes.ok ? await assignmentsRes.json() : [];
      const campaignsData = campaignsRes.ok ? await campaignsRes.json() : [];

      res.json({
        war: warData,
        assignments: assignmentsData,
        campaigns: campaignsData,
        timestamp: new Date().toISOString()
      });
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
