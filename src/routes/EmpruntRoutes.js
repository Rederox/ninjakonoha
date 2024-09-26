// routes/empruntRoutes.js
const express = require('express');
const router = express.Router();
const {
  createEmprunt,
  getAllEmprunts,
  getEmpruntById,
  updateEmprunt,
  deleteEmprunt,
} = require('../controllers/empruntController');

router.post('/', createEmprunt);
router.get('/', getAllEmprunts);
router.get('/:id', getEmpruntById);
router.put('/:id', updateEmprunt);
router.delete('/:id', deleteEmprunt);

module.exports = router;