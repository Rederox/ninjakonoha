// src/index.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import jutsuScrollRoutes from "./routes/jutsuScroll.routes.js";
import ninjaRoutes from "./routes/ninja.routes.js";
import empruntRoutes from "./routes/emprunt.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Gestion des versions de l'API
app.use("/api/v1/jutsu-scrolls", jutsuScrollRoutes);
app.use("/api/v1/ninjas", ninjaRoutes);
app.use("/api/v1/emprunts", empruntRoutes);

// Lancer le serveur et se connecter à la base de données
const PORT = process.env.PORT || 3000;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
  });
};

startServer();
