// /src/routes/ninja.routes.js

/**
 * @swagger
 * tags:
 *   name: Ninjas
 *   description: Gestion des ninjas
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
 * /ninjas/:
 *   post:
 *     summary: Create a new ninja
 *     tags: [Ninjas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ninja'
 *     responses:
 *       201:
 *         description: Ninja created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ninja'
 *       400:
 *         description: Bad request
 */
router.post('/', createNinja);

/**
 * @swagger
 * /ninjas/:
 *   get:
 *     summary: Get all ninjas
 *     tags: [Ninjas]
 *     responses:
 *       200:
 *         description: List of all ninjas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ninja'
 *       500:
 *         description: Server error
 */
router.get('/', getNinjas);

/**
 * @swagger
 * /ninjas/{id}:
 *   get:
 *     summary: Get ninja by ID
 *     tags: [Ninjas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ninja ID
 *     responses:
 *       200:
 *         description: Ninja found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ninja'
 *       404:
 *         description: Ninja not found
 */
router.get('/:id', getNinjaById);

/**
 * @swagger
 * /ninjas/{id}:
 *   put:
 *     summary: Update ninja by ID
 *     tags: [Ninjas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ninja ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ninja'
 *     responses:
 *       200:
 *         description: Ninja updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ninja'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Ninja not found
 */
router.put('/:id', updateNinja);

/**
 * @swagger
 * /ninjas/{id}:
 *   delete:
 *     summary: Delete ninja by ID
 *     tags: [Ninjas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ninja ID
 *     responses:
 *       200:
 *         description: Ninja deleted successfully
 *       404:
 *         description: Ninja not found
 */
router.delete('/:id', deleteNinja);
router.get('/:id/recommandations', recommanderJutsus);

export default router;
