// /src/routes/emprunt.routes.js

import express from 'express';
import {
  createEmprunt,
  getEmprunt,
  getEmpruntById,
  updateEmprunt,
  deleteEmprunt,
} from '../controllers/emprunt.controller.js';

const router = express.Router();

router.post('/', createEmprunt);
router.get('/', getEmprunt);
router.get('/:id', getEmpruntById);
router.put('/:id', updateEmprunt);
router.delete('/:id', deleteEmprunt);

export default router;
