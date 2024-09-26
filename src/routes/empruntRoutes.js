// /src/routes/emprunt.routes.js

import express from 'express';
import {
  createEmprunt,
  getEmprunt,
  getEmpruntById,
  updateEmprunt,
  deleteEmprunt,
  emprunterJutsuScroll
} from '../controllers/empruntController.js';

const router = express.Router();

router.post('/', createEmprunt);
router.get('/', getEmprunt);
router.get('/:id', getEmpruntById);
router.put('/:id', updateEmprunt);
router.delete('/:id', deleteEmprunt);
router.post('/emprunter', emprunterJutsuScroll);

export default router;
