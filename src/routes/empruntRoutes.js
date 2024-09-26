// /src/routes/emprunt.routes.js

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
} from '../controllers/emprunt.controller.js';

const router = express.Router();

/**
 * @swagger
 * /emprunts/:
 *   post:
 *     summary: Create a new emprunt
 *     tags: [Emprunts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Emprunt'
 *     responses:
 *       201:
 *         description: Emprunt created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprunt'
 *       400:
 *         description: Bad request
 */
router.post('/', createEmprunt);

/**
 * @swagger
 * /emprunts/:
 *   get:
 *     summary: Get all emprunts
 *     tags: [Emprunts]
 *     responses:
 *       200:
 *         description: A list of emprunts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Emprunt'
 *       500:
 *         description: Server error
 */
router.get('/', getEmprunt);

/**
 * @swagger
 * /emprunts/{id}:
 *   get:
 *     summary: Get an emprunt by ID
 *     tags: [Emprunts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The emprunt ID
 *     responses:
 *       200:
 *         description: Emprunt found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprunt'
 *       404:
 *         description: Emprunt not found
 */
router.get('/:id', getEmpruntById);

/**
 * @swagger
 * /emprunts/{id}:
 *   put:
 *     summary: Update an emprunt by ID
 *     tags: [Emprunts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The emprunt ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Emprunt'
 *     responses:
 *       200:
 *         description: Emprunt updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprunt'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Emprunt not found
 */
router.put('/:id', updateEmprunt);

/**
 * @swagger
 * /emprunts/{id}:
 *   delete:
 *     summary: Delete an emprunt by ID
 *     tags: [Emprunts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The emprunt ID
 *     responses:
 *       200:
 *         description: Emprunt deleted
 *       404:
 *         description: Emprunt not found
 */
router.delete('/:id', deleteEmprunt);

export default router;
