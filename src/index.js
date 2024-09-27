// src/index.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import jutsuScrollRoutes from "./routes/jutsuScrollRoutes.js";
import ninjaRoutes from "./routes/ninjaRoutes.js";
import empruntRoutes from "./routes/empruntRoutes.js";
import reservationRoutes from './routes/reservationRoutes.js';
import statistiquesRoutes from './routes/statistiquesRoutes.js';
import authentificationRoutes from './routes/authentificationRoutes.js';
import { swaggerUi, swaggerDocs } from "./config/swagger.js";
import './utils/reminder.js';
import './utils/jutsuDuMois.js';
import authenticateJWT from './middleware/authenticateJWT.js'

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Gestion des versions de l'API
app.use("/jutsu-scrolls", authenticateJWT, jutsuScrollRoutes);
app.use("/ninjas", authenticateJWT,  ninjaRoutes);
app.use("/emprunts", authenticateJWT, empruntRoutes);
app.use('/reservations', authenticateJWT, reservationRoutes);
app.use('/statistiques', authenticateJWT, statistiquesRoutes);
app.use('/auth', authentificationRoutes);

app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'Accès autorisé à la route protégée!' });
});

// Lancer le serveur et se connecter à la base de données
const PORT = process.env.PORT || 3000;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Le serveur fonctionne sur le port ${PORT}`);
  });
};

startServer();
