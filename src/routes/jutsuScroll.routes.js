// /src/routes/jutsuScroll.routes.js

import express from "express";
import {
  createJutsuScroll,
  getJutsuScrolls,
  getJutsuScrollById,
  updateJutsuScroll,
  deleteJutsuScroll,
} from "../controllers/jutsuScroll.controller.js";

const router = express.Router();

router.post("/", createJutsuScroll);
router.get("/", getJutsuScrolls);
router.get("/:id", getJutsuScrollById);
router.put("/:id", updateJutsuScroll);
router.delete("/:id", deleteJutsuScroll);

export default router;
