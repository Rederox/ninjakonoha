/**
 * @swagger
 * tags:
 *   name: JutsuScrolls
 *   description: "Gestion des parchemins de jutsu"
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
 * components:
 *   schemas:
 *     JutsuScroll:
 *       type: object
 *       required:
 *         - nom
 *         - createur
 *         - rang
 *         - quantite
 *         - categorie
 *       properties:
 *         id:
 *           type: string
 *           description: "ID auto-généré du parchemin de jutsu"
 *         nom:
 *           type: string
 *           description: "Nom du rouleau de jutsu"
 *         createur:
 *           type: string
 *           description: "Nom du créateur du jutsu"
 *         rang:
 *           type: string
 *           enum: ["D", "C", "B", "A", "S"]
 *           description: "Le rang du jutsu (D étant le plus bas, S le plus élevé)"
 *         quantite:
 *           type: integer
 *           description: "Quantité disponible de ce rouleau"
 *         description:
 *           type: string
 *           description: "Description du jutsu (maximum 500 caractères)"
 *         categorie:
 *           type: string
 *           enum: ["Ninjutsu", "Taijutsu", "Genjutsu", "Kinjutsu", "Fuinjutsu"]
 *           description: "Catégorie du jutsu"
 *         techniquesAssociees:
 *           type: array
 *           items:
 *             type: string
 *           description: "Techniques associées à ce rouleau de jutsu"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: "Date de création du parchemin"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: "Date de dernière mise à jour du parchemin"
 */

/**
 * @swagger
 * /jutsu-scrolls/:
 *   post:
 *     summary: Créer un nouveau parchemin de jutsu
 *     tags: [JutsuScrolls]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JutsuScroll'
 *     responses:
 *       201:
 *         description: "Jutsu scroll créé avec succès"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JutsuScroll'
 *       400:
 *         description: "Requête invalide"
 */
router.post("/", createJutsuScroll);

/**
 * @swagger
 * /jutsu-scrolls/:
 *   get:
 *     summary: Récupérer tous les parchemins de jutsu
 *     tags: [JutsuScrolls]
 *     responses:
 *       200:
 *         description: "Liste des parchemins de jutsu"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JutsuScroll'
 *       500:
 *         description: "Erreur du serveur"
 */
router.get("/", getJutsuScrolls);

/**
 * @swagger
 * /jutsu-scrolls/{id}:
 *   get:
 *     summary: Récupérer un parchemin de jutsu par ID
 *     tags: [JutsuScrolls]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID du parchemin de jutsu"
 *     responses:
 *       200:
 *         description: "Parchemin de jutsu récupéré"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JutsuScroll'
 *       404:
 *         description: "Parchemin de jutsu non trouvé"
 */
router.get("/:id", getJutsuScrollById);

/**
 * @swagger
 * /jutsu-scrolls/{id}:
 *   put:
 *     summary: Mettre à jour un parchemin de jutsu par ID
 *     tags: [JutsuScrolls]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID du parchemin de jutsu"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JutsuScroll'
 *     responses:
 *       200:
 *         description: "Parchemin de jutsu mis à jour"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JutsuScroll'
 *       400:
 *         description: "Requête invalide"
 *       404:
 *         description: "Parchemin de jutsu non trouvé"
 */
router.put("/:id", updateJutsuScroll);

/**
 * @swagger
 * /jutsu-scrolls/{id}:
 *   delete:
 *     summary: Supprimer un parchemin de jutsu par ID
 *     tags: [JutsuScrolls]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: "ID du parchemin de jutsu"
 *     responses:
 *       200:
 *         description: "Parchemin de jutsu supprimé"
 *       404:
 *         description: "Parchemin de jutsu non trouvé"
 */
router.delete("/:id", deleteJutsuScroll);

export default router;
