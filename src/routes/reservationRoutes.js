import express from 'express';
import { reserverJutsuScroll } from '../controllers/reservationController.js';

const router = express.Router();

router.post('/', reserverJutsuScroll);

export default router;
