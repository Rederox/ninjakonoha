// controllers/jutsuScrollController.js
const JutsuScroll = require('../models/JutsuScroll');

// Créer un nouveau parchemin
exports.createJutsuScroll = async (req, res) => {
  try {
    const jutsuScroll = await JutsuScroll.create(req.body);
    res.status(201).json(jutsuScroll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir tous les parchemins
exports.getAllJutsuScrolls = async (req, res) => {
  try {
    const jutsuScrolls = await JutsuScroll.find();
    res.status(200).json(jutsuScrolls);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir un parchemin par ID
exports.getJutsuScrollById = async (req, res) => {
  try {
    const jutsuScroll = await JutsuScroll.findById(req.params.id);
    if (!jutsuScroll) {
      return res.status(404).json({ error: 'Parchemin non trouvé' });
    }
    res.status(200).json(jutsuScroll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un parchemin
exports.updateJutsuScroll = async (req, res) => {
  try {
    const jutsuScroll = await JutsuScroll.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!jutsuScroll) {
      return res.status(404).json({ error: 'Parchemin non trouvé' });
    }
    res.status(200).json(jutsuScroll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un parchemin
exports.deleteJutsuScroll = async (req, res) => {
  try {
    const jutsuScroll = await JutsuScroll.findByIdAndDelete(req.params.id);
    if (!jutsuScroll) {
      return res.status(404).json({ error: 'Parchemin non trouvé' });
    }
    res.status(200).json({ message: 'Parchemin supprimé avec succès' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
