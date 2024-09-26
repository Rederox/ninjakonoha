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
 */
router.get("/", getJutsuScrolls);
router.get("/:id", getJutsuScrollById);
router.put("/:id", updateJutsuScroll);
router.delete("/:id", deleteJutsuScroll);

export default router;
