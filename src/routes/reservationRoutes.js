/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations de rouleaux de jutsu
 */

import express from 'express';
import { reserverJutsuScroll } from '../controllers/reservationController.js';

const router = express.Router();

/**
 * @swagger
 * /reservations/:
 *   post:
 *     summary: Réserver un rouleau de jutsu
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID de l'utilisateur qui réserve
 *               jutsuScrollId:
 *                 type: string
 *                 description: ID du rouleau de jutsu à réserver
 *             required:
 *               - userId
 *               - jutsuScrollId
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de confirmation de la réservation
 *                 reservation:
 *                   $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Erreur dans les données envoyées
 *       404:
 *         description: Rouleau de jutsu introuvable ou non disponible pour réservation
 */

router.post('/', reserverJutsuScroll);

export default router;
