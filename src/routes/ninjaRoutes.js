// /src/routes/ninja.routes.js

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

router.post('/', createNinja);
router.get('/', getNinjas);
router.get('/:id', getNinjaById);
router.put('/:id', updateNinja);
router.delete('/:id', deleteNinja);
router.get('/:id/recommandations', recommanderJutsus);

export default router;
