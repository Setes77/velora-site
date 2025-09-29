// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques (dist ou build selon ton config)
const staticDir = path.join(__dirname, "build"); // si tu utilises "build" change en "build"
app.use(express.static(staticDir, { maxAge: "1d" }));

// Fallback pour SPA : toutes les routes renvoient index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(staticDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} — serving ${staticDir}`);
});
