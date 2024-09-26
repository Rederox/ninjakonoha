// routes/ninjaRoutes.js
const express = require('express');
const router = express.Router();
const {
  createNinja,
  getAllNinjas,
  getNinjaById,
  updateNinja,
  deleteNinja,
} = require('../controllers/ninjaController');

router.post('/', createNinja);
router.get('/', getAllNinjas);
router.get('/:id', getNinjaById);
router.put('/:id', updateNinja);
router.delete('/:id', deleteNinja);

module.exports = router;