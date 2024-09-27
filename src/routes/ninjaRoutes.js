/**
 * @swagger
 * tags:
 *   name: Ninjas
 *   description: "Gestion des ninjas"
 */

import express from 'express';
import {
  createNinja,
  getNinjas,
  getNinjaById,
  updateNinja,
  deleteNinja,
  recommanderJutsus 
} from '../controllers/ninjaController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Ninja:
 *       type: object
 *       required:
 *         - nom
 *         - rang
 *       properties:
 *         id:
 *           type: string
 *           description: "ID auto-généré du ninja"
 *         nom:
 *           type: string
 *           description: "Nom du ninja"
 *         rang:
 *           type: string
 *           enum: ["Genin", "Chunin", "Jonin", "Anbu", "Kage"]
 *           description: "Le rang du ninja"
 *         jutsus_maitrises:
 *           type: array
 *           items:
 *             type: string
 *           description: "Liste des jutsus maîtrisés par le ninja"
 *         clan:
 *           type: string
 *           description: "Clan du ninja (facultatif)"
 *         specialite:
 *           type: string
 *           description: "Spécialité du ninja (facultatif)"
 *         historiqueEmprunts:
 *           type: array
 *           items:
 *             type: string
 *           description: "Liste des IDs des emprunts effectués par le ninja"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: "Date de création du ninja"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: "Date de dernière mise à jour du ninja"
 */

/**
 * @swagger
 * /ninjas/:
 *   post:
 *     summary: Créer un nouveau ninja
 *     tags: [Ninjas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ninja'
 *     responses:
 *       201:
 *         description: Ninja créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ninja'
 *       400:
 *         description: Requête invalide
 */
router.post('/', createNinja);

/**
 * @swagger
 * /ninjas/:
 *   get:
 *     summary: Obtenir tous les ninjas
 *     tags: [Ninjas]
 *     responses:
 *       200:
 *         description: Liste de tous les ninjas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ninja'
 *       500:
 *         description: Erreur du serveur
 */
router.get('/', getNinjas);

/**
 * @swagger
 * /ninjas/{id}:
 *   get:
 *     summary: Obtenir un ninja par ID
 *     tags: [Ninjas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du ninja
 *     responses:
 *       200:
 *         description: Ninja trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ninja'
 *       404:
 *         description: Ninja non trouvé
 */
router.get('/:id', getNinjaById);

/**
 * @swagger
 * /ninjas/{id}:
 *   put:
 *     summary: Mettre à jour un ninja par ID
 *     tags: [Ninjas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du ninja
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ninja'
 *     responses:
 *       200:
 *         description: Ninja mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ninja'
 *       400:
 *         description: Requête invalide
 *       404:
 *         description: Ninja non trouvé
 */
router.put('/:id', updateNinja);

/**
 * @swagger
 * /ninjas/{id}:
 *   delete:
 *     summary: Supprimer un ninja par ID
 *     tags: [Ninjas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du ninja
 *     responses:
 *       200:
 *         description: Ninja supprimé avec succès
 *       404:
 *         description: Ninja non trouvé
 */
router.delete('/:id', deleteNinja);

/**
 * @swagger
 * /ninjas/{id}/recommandations:
 *   get:
 *     summary: Obtenir des recommandations de jutsus
 *     tags: [Recommandations]
 *     description: Recommander des jutsus basés sur l'historique d'emprunts d'un ninja
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de l'utilisateur (ninja) pour lequel obtenir des recommandations
 *     responses:
 *       200:
 *         description: Recommandations de jutsus retournées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   jutsuScrollId:
 *                     type: string
 *                     description: "ID du rouleau de jutsu recommandé"
 *                   title:
 *                     type: string
 *                     description: "Titre du rouleau de jutsu recommandé"
 *                   jutsuType:
 *                     type: string
 *                     description: "Type de jutsu recommandé (ex: Ninjutsu, Genjutsu, Taijutsu)"
 *       400: 
 *         description: Requête invalide ou ID incorrect
 *       404:
 *         description: Utilisateur ou recommandations non trouvées
 */
router.get('/:id/recommandations', recommanderJutsus);

export default router;

