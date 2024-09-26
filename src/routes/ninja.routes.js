// /src/routes/ninja.routes.js

import express from 'express';
import {
  createNinja,
  getNinjas,
  getNinjaById,
  updateNinja,
  deleteNinja,
} from '../controllers/ninja.controller.js';

const router = express.Router();

router.post('/', createNinja);
router.get('/', getNinjas);
router.get('/:id', getNinjaById);
router.put('/:id', updateNinja);
router.delete('/:id', deleteNinja);

export default router;
