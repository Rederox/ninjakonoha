// /src/routes/ninja.routes.js

/**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: Gestion des authentifications
 */
import express from 'express';
import { login, register } from '../controllers/authentificationController.js';

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *  
 *   post:
 *     summary: Authentificate
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Utilisateur'
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
router.post('/login', login);


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Enregistrer un nouvel utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom_utilisateur:
 *                 type: string
 *                 description: Le nom d'utilisateur
 *                 example: "JohnDoe"
 *               mot_de_passe:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Utilisateur enregistré avec succès"
 *                 token:
 *                   type: string
 *                   description: Le token JWT pour l'utilisateur
 *                 utilisateur:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     nom_utilisateur:
 *                       type: string
 *                       example: "JohnDoe"
 *       400:
 *         description: Nom d'utilisateur déjà pris ou mauvaise requête
 *       500:
 *         description: Erreur interne du serveur
 */
router.post('/register', register);

export default router;
