/**
 * @swagger
 * tags:
 *   name: Emprunts
 *   description: Gestion des emprunts
 */

import express from 'express';
import {
  createEmprunt,
  getEmprunt,
  getEmpruntById,
  updateEmprunt,
  deleteEmprunt,
  emprunterJutsuScroll
} from '../controllers/empruntController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Emprunt:
 *       type: object
 *       required:
 *         - ninjaId
 *         - jutsuScrollId
 *         - dateRetourPrevue
 *       properties:
 *         id:
 *           type: string
 *           description: ID auto-généré de l'emprunt
 *         ninjaId:
 *           type: string
 *           description: ID du ninja qui a emprunté
 *         jutsuScrollId:
 *           type: string
 *           description: ID du rouleau de jutsu emprunté
 *         dateEmprunt:
 *           type: string
 *           format: date-time
 *           description: Date à laquelle l'emprunt a été effectué
 *         dateRetourPrevue:
 *           type: string
 *           format: date-time
 *           description: Date prévue pour le retour de l'emprunt
 *         statut:
 *           type: string
 *           enum: ["En cours", "Terminé", "En retard"]
 *           description: Statut de l'emprunt
 *         notes:
 *           type: string
 *           description: Notes éventuelles liées à l'emprunt
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création de l'emprunt
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière mise à jour de l'emprunt
 */

/**
 * @swagger
 * /emprunts/:
 *   post:
 *     summary: Créer un nouvel emprunt
 *     tags: [Emprunts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Emprunt'
 *     responses:
 *       201:
 *         description: Emprunt créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprunt'
 *       400:
 *         description: Requête invalide
 */
router.post('/', createEmprunt);

/**
 * @swagger
 * /emprunts/:
 *   get:
 *     summary: Obtenir tous les emprunts
 *     tags: [Emprunts]
 *     responses:
 *       200:
 *         description: Liste de tous les emprunts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Emprunt'
 *       500:
 *         description: Erreur du serveur
 */
router.get('/', getEmprunt);

/**
 * @swagger
 * /emprunts/{id}:
 *   get:
 *     summary: Obtenir un emprunt par ID
 *     tags: [Emprunts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'emprunt
 *     responses:
 *       200:
 *         description: Emprunt trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprunt'
 *       404:
 *         description: Emprunt non trouvé
 */
router.get('/:id', getEmpruntById);

/**
 * @swagger
 * /emprunts/{id}:
 *   put:
 *     summary: Mettre à jour un emprunt par ID
 *     tags: [Emprunts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'emprunt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Emprunt'
 *     responses:
 *       200:
 *         description: Emprunt mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprunt'
 *       400:
 *         description: Requête invalide
 *       404:
 *         description: Emprunt non trouvé
 */
router.put('/:id', updateEmprunt);

/**
 * @swagger
 * /emprunts/{id}:
 *   delete:
 *     summary: Supprimer un emprunt par ID
 *     tags: [Emprunts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'emprunt
 *     responses:
 *       200:
 *         description: Emprunt supprimé avec succès
 *       404:
 *         description: Emprunt non trouvé
 */
router.delete('/:id', deleteEmprunt);

/**
 * @swagger
 * /emprunter:
 *   post:
 *     summary: Emprunter un rouleau de jutsu
 *     tags: [Emprunts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: "ID de l'utilisateur qui emprunte le rouleau"
 *               jutsuScrollId:
 *                 type: string
 *                 description: "ID du rouleau de jutsu à emprunter"
 *             required:
 *               - userId
 *               - jutsuScrollId
 *     responses:
 *       201:
 *         description: Emprunt créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "Message de confirmation"
 *                 emprunt:
 *                   $ref: '#/components/schemas/Emprunt'
 *       400:
 *         description: Requête invalide
 *       404:
 *         description: Rouleau de jutsu ou utilisateur non trouvé
 */
router.post('/emprunter', emprunterJutsuScroll);

export default router;

