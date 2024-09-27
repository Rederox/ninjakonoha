/**
 * @swagger
 * tags:
 *   name: Statistiques
 *   description: Gestion des statistiques liées aux jutsus
 */

import express from 'express';
import { obtenirJutsuDuMois } from '../controllers/statistiquesController.js';

const router = express.Router();

/**
 * @swagger
 * /statistiques/jutsu-du-mois:
 *   get:
 *     summary: Obtenir le Jutsu du mois
 *     tags: [Statistiques]
 *     description: >
 *       Récupère le jutsu le plus emprunté du mois.
 *     responses:
 *       200:
 *         description: Le jutsu du mois a été récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 jutsuTitle:
 *                   type: string
 *                   description: "Le titre du jutsu du mois"
 *                 jutsuType:
 *                   type: string
 *                   description: "Le type de jutsu (ex: Ninjutsu, Genjutsu, Taijutsu)"
 *                 borrowCount:
 *                   type: integer
 *                   description: "Nombre d'emprunts pour ce jutsu durant le mois"
 *                 jutsuScrollId:
 *                   type: string
 *                   description: "ID du rouleau de jutsu"
 *       404:
 *         description: Aucun jutsu du mois trouvé
 *       500:
 *         description: Erreur interne du serveur
 */


router.get('/jutsu-du-mois', obtenirJutsuDuMois);

export default router;
