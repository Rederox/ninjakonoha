// src/routes/jutsuScrollRoutes.js

/**
 * @swagger
 * tags:
 *   name: JutsuScrolls
 *   description: Gestion des parchemins de jutsu
 */

import express from "express";
import {
  createJutsuScroll,
  getJutsuScrolls,
  getJutsuScrollById,
  updateJutsuScroll,
  deleteJutsuScroll,
} from "../controllers/jutsuScrollController.js";

const router = express.Router();

/**
 * @swagger
 * /jutsu-scrolls/:
 *   post:
 *     summary: Create a new jutsu scroll
 *     tags: [JutsuScrolls]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JutsuScroll'
 *     responses:
 *       201:
 *         description: Jutsu scroll created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JutsuScroll'
 *       400:
 *         description: Bad request
 */
router.post("/", createJutsuScroll);

/**
 * @swagger
 * /jutsu-scrolls/:
 *   get:
 *     summary: Get all jutsu scrolls
 *     tags: [JutsuScrolls]
 *     responses:
 *       200:
 *         description: A list of jutsu scrolls
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JutsuScroll'
 *       500:
 *         description: Server error
 */
router.get("/", getJutsuScrolls);

/**
 * @swagger
 * /jutsu-scrolls/{id}:
 *   get:
 *     summary: Get a jutsu scroll by ID
 *     tags: [JutsuScrolls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The jutsu scroll ID
 *     responses:
 *       200:
 *         description: Jutsu scroll retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JutsuScroll'
 *       404:
 *         description: Jutsu scroll not found
 */
router.get("/:id", getJutsuScrollById);

/**
 * @swagger
 * /jutsu-scrolls/{id}:
 *   put:
 *     summary: Update a jutsu scroll by ID
 *     tags: [JutsuScrolls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The jutsu scroll ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JutsuScroll'
 *     responses:
 *       200:
 *         description: Jutsu scroll updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JutsuScroll'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Jutsu scroll not found
 */
router.put("/:id", updateJutsuScroll);

/**
 * @swagger
 * /jutsu-scrolls/{id}:
 *   delete:
 *     summary: Delete a jutsu scroll by ID
 *     tags: [JutsuScrolls]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The jutsu scroll ID
 *     responses:
 *       200:
 *         description: Jutsu scroll deleted
 *       404:
 *         description: Jutsu scroll not found
 */
router.delete("/:id", deleteJutsuScroll);

export default router;