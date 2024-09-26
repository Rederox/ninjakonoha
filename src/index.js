// src/index.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import jutsuScrollRoutes from "./routes/jutsuScrollRoutes.js";
import ninjaRoutes from "./routes/ninjaRoutes.js";
import empruntRoutes from "./routes/empruntRoutes.js";
import reservationRoutes from './routes/reservationRoutes.js';
import statistiquesRoutes from './routes/statistiquesRoutes.js';
import { swaggerUi, swaggerDocs } from "./config/swagger.js";
import './utils/reminder.js';
import './utils/jutsuDuMois.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Gestion des versions de l'API
app.use("/jutsu-scrolls", jutsuScrollRoutes);
app.use("/ninjas", ninjaRoutes);
app.use("/emprunts", empruntRoutes);
app.use('/reservations', reservationRoutes);
app.use('/statistiques', statistiquesRoutes);



// Lancer le serveur et se connecter à la base de données
const PORT = process.env.PORT || 3000;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
  });
};

startServer();
