/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: "Gestion des réservations de rouleaux de jutsu"
 */

import express from 'express';
import { reserverJutsuScroll } from '../controllers/reservationController.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - ninjaId
 *         - jutsuScrollId
 *       properties:
 *         id:
 *           type: string
 *           description: "ID auto-généré de la réservation"
 *         ninjaId:
 *           type: string
 *           description: "ID du ninja qui fait la réservation"
 *         jutsuScrollId:
 *           type: string
 *           description: "ID du rouleau de jutsu réservé"
 *         dateReservation:
 *           type: string
 *           format: date-time
 *           description: "Date à laquelle la réservation a été effectuée"
 *         statut:
 *           type: string
 *           enum: ['En attente', 'Notifié', 'Annulé']
 *           description: "Statut de la réservation (ex: en attente ou notifié)"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: "Date de création de la réservation"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: "Date de dernière mise à jour de la réservation"
 */

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
 *               ninjaId:
 *                 type: string
 *                 description: "ID du ninja qui réserve"
 *               jutsuScrollId:
 *                 type: string
 *                 description: "ID du rouleau de jutsu à réserver"
 *             required:
 *               - ninjaId
 *               - jutsuScrollId
 *     responses:
 *       201:
 *         description: "Réservation créée avec succès"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "Message de confirmation de la réservation"
 *                 reservation:
 *                   $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: "Erreur dans les données envoyées"
 *       404:
 *         description: "Rouleau de jutsu introuvable ou non disponible pour réservation"
 */

router.post('/', reserverJutsuScroll);

export default router;

