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
 * /auth/login/{id}:
 *  
 *   post:
 *     summary: Authentificate
 *     tags: [Authentification]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID du ninja"
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
