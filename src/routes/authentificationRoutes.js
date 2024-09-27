// /src/routes/ninja.routes.js

/**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: Gestion des authentifications
 */
import express from 'express';
import { login } from '../controllers/authentificationController.js';

const router = express.Router();

/**
 * @swagger
 * /authentification/:
 *   post:
 *     summary: Authentificate
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Authentification'
 *     responses:
 *       201:
 *         description: Authentification succefully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Authentification'
 *       400:
 *         description: Bad request
 */
router.post('/login/:id', login);


export default router;
