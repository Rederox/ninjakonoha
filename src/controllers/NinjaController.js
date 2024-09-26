// controllers/ninjaController.js
const Ninja = require('../models/Ninja');

// Créer un nouveau ninja
exports.createNinja = async (req, res) => {
  try {
    const ninja = await Ninja.create(req.body);
    res.status(201).json(ninja);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir tous les ninjas
exports.getAllNinjas = async (req, res) => {
  try {
    const ninjas = await Ninja.find();
    res.status(200).json(ninjas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir un ninja par ID
exports.getNinjaById = async (req, res) => {
  try {
    const ninja = await Ninja.findById(req.params.id).populate('emprunts');
    if (!ninja) {
      return res.status(404).json({ error: 'Ninja non trouvé' });
    }
    res.status(200).json(ninja);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un ninja
exports.updateNinja = async (req, res) => {
  try {
    const ninja = await Ninja.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!ninja) {
      return res.status(404).json({ error: 'Ninja non trouvé' });
    }
    res.status(200).json(ninja);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un ninja
exports.deleteNinja = async (req, res) => {
  try {
    const ninja = await Ninja.findByIdAndDelete(req.params.id);
    if (!ninja) {
      return res.status(404).json({ error: 'Ninja non trouvé' });
    }
    res.status(200).json({ message: 'Ninja supprimé avec succès' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
