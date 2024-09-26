// routes/jutsuScrollRoutes.js
const express = require('express');
const router = express.Router();
const {
  createJutsuScroll,
  getAllJutsuScrolls,
  getJutsuScrollById,
  updateJutsuScroll,
  deleteJutsuScroll,
} = require('../controllers/jutsuScrollController');

router.post('/', createJutsuScroll);
router.get('/', getAllJutsuScrolls);
router.get('/:id', getJutsuScrollById);
router.put('/:id', updateJutsuScroll);
router.delete('/:id', deleteJutsuScroll);

module.exports = router;