import express from 'express';
import { obtenirJutsuDuMois } from '../controllers/statistiquesController.js';

const router = express.Router();

router.get('/jutsu-du-mois', obtenirJutsuDuMois);

export default router;
