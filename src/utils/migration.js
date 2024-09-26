// /src/utils/migrateData.mjs

import mongoose from "mongoose";
import dotenv from "dotenv";
import Ninja from "../models/ninjaModel.js";
import JutsuScroll from "../models/jutsuScrollModel.js";
import Emprunt from "../models/empruntModel.js";

dotenv.config();

// Données fictives pour les ninjas
const ninjasData = [
    {
        nom: "Naruto Uzumaki",
        rang: "Genin",
        jutsus_maitrises: ["Rasengan", "Shadow Clone Jutsu"],
        clan: "Uzumaki",
        specialite: "Ninjutsu",
    },
    {
        nom: "Sasuke Uchiha",
        rang: "Genin",
        jutsus_maitrises: ["Chidori", "Sharingan"],
        clan: "Uchiha",
        specialite: "Ninjutsu",
    },
    {
        nom: "Sakura Haruno",
        rang: "Chunin",
        jutsus_maitrises: ["Medical Ninjutsu", "Chakra Control"],
        clan: "Haruno",
        specialite: "Medical Ninjutsu",
    },
];

// Données fictives pour les parchemins de jutsu
const jutsuScrollsData = [
    {
        nom: "Rasengan Scroll",
        createur: "Minato Namikaze",
        rang: "A",
        quantite: 3,
        description: "Technique de sphère de chakra concentrée",
        categorie: "Ninjutsu",
        techniquesAssociees: ["Giant Rasengan"],
    },
    {
        nom: "Chidori Scroll",
        createur: "Kakashi Hatake",
        rang: "A",
        quantite: 2,
        description: "Technique de pénétration de foudre",
        categorie: "Ninjutsu",
        techniquesAssociees: ["Chidori Sharp Spear"],
    },
    {
        nom: "Shadow Clone Scroll",
        createur: "Tobirama Senju",
        rang: "B",
        quantite: 5,
        description: "Technique de clonage avancée",
        categorie: "Ninjutsu",
        techniquesAssociees: ["Multiple Shadow Clone"],
    },
];

// Fonction principale pour migrer les données
const migrateData = async () => {
    try {
        // Connexion à la base de données
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "ninja_library",
        });
        console.log("Connecté à MongoDB");

        // Nettoyer les collections existantes
        await Emprunt.deleteMany();
        await Ninja.deleteMany();
        await JutsuScroll.deleteMany();
        console.log("Collections nettoyées");

        // Insérer les parchemins de jutsu
        const jutsuScrolls = await JutsuScroll.insertMany(jutsuScrollsData);
        console.log("Parchemins de jutsu insérés");

        // Insérer les ninjas
        const ninjas = await Ninja.insertMany(ninjasData);
        console.log("Ninjas insérés");

        // Créer des emprunts fictifs
        const empruntsData = [
            {
                ninjaId: ninjas[0]._id,
                jutsuScrollId: jutsuScrolls[0]._id,
                dateRetourPrevue: new Date("2024-12-31"),
                statut: "En cours",
                notes: "Premier emprunt de Naruto",
            },
            {
                ninjaId: ninjas[1]._id,
                jutsuScrollId: jutsuScrolls[1]._id,
                dateRetourPrevue: new Date("2024-11-30"),
                statut: "En cours",
                notes: "Sasuke veut maîtriser le Chidori",
            },
            {
                ninjaId: ninjas[2]._id,
                jutsuScrollId: jutsuScrolls[2]._id,
                dateRetourPrevue: new Date("2024-10-15"),
                statut: "En cours",
                notes: "Sakura étudie les clones",
            },
        ];

        await Emprunt.insertMany(empruntsData);
        console.log("Emprunts insérés");

        // Fermer la connexion
        await mongoose.connection.close();
        console.log("Migration terminée, connexion fermée");
    } catch (error) {
        console.error("Erreur lors de la migration des données:", error);
        process.exit(1);
    }
};

migrateData();
