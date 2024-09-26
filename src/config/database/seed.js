import mongoose from 'mongoose';
import connectDB from './database';
import dotenv from 'dotenv';

dotenv.config();
// Importer vos modèles
import jutsuScrolls from './models/jutsuScrolls.js';
import ninjas from './models/ninjas.js';
import emprunts from './models/emprunts';

const seedData = async () => {
  await connectDB();

  // Supprimer les collections existantes
  await JutsuScroll.deleteMany({});
  await Ninja.deleteMany({});
  await Emprunt.deleteMany({});

  // Inserer des donnees de test
  const jutsuScroll = await JutsuScroll.create({
    nom: 'Technique de l’ombre',
    createur: 'Nidaime Hokage',
    rang: 'A',
    quantite: 3,
    description: 'Technique permettant de se dedoubler',
    categorie: 'Ninjutsu',
    techniquesAssociees: ['Clone Jutsu'],
  });

  const ninja = await Ninja.create({
    nom: 'Naruto Uzumaki',
    rang: 'Genin',
    jutsus_maîtrises: ['Rasengan', 'Shadow Clone'],
    clan: 'Uzumaki',
    specialite: 'Ninjutsu',
    historiqueEmprunts: [],
  });

  await Emprunt.create({
    ninjaId: ninja._id,
    jutsuScrollId: jutsuScroll._id,
    dateEmprunt: new Date(),
    dateRetourPrevue: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // +7 jours
    statut: 'En cours',
    notes: 'Handle with care',
  });

  console.log('Donnees de test inserees');
  process.exit();
};

seedData();