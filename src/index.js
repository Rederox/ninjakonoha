import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Charger les variables d'environnement à partir d'un fichier .env
dotenv.config();

// Initialiser l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Connexion à MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Arrêter le serveur en cas d'échec de connexion
    }
};

app.get('/', (req, res) => {
    res.send('Bienvenue dans mon API');
});

// Lancer le serveur et se connecter à la base de données
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Le serveur fonctionne sur le port ${PORT}`);
    });
};

startServer();
