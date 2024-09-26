// controllers/empruntController.js
const Emprunt = require('../models/Emprunt');
const Ninja = require('../models/Ninja');
const JutsuScroll = require('../models/JutsuScroll');

// Créer un nouvel emprunt
exports.createEmprunt = async (req, res) => {
  try {
    const { ninjaId, jutsuScrollId } = req.body;

    // Vérifier si le ninja et le parchemin existent
    const ninja = await Ninja.findById(ninjaId);
    const jutsuScroll = await JutsuScroll.findById(jutsuScrollId);

    if (!ninja || !jutsuScroll) {
      return res.status(404).json({ error: 'Ninja ou Parchemin non trouvé' });
    }

    // Créer l'emprunt
    const emprunt = await Emprunt.create(req.body);
    res.status(201).json(emprunt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir tous les emprunts
exports.getAllEmprunts = async (req, res) => {
  try {
    const emprunts = await Emprunt.find()
      .populate('ninjaId')
      .populate('jutsuScrollId');
    res.status(200).json(emprunts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir un emprunt par ID
exports.getEmpruntById = async (req, res) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id)
      .populate('ninjaId')
      .populate('jutsuScrollId');
    if (!emprunt) {
      return res.status(404).json({ error: 'Emprunt non trouvé' });
    }
    res.status(200).json(emprunt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un emprunt
exports.updateEmprunt = async (req, res) => {
  try {
    const emprunt = await Emprunt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!emprunt) {
      return res.status(404).json({ error: 'Emprunt non trouvé' });
    }
    res.status(200).json(emprunt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un emprunt
exports.deleteEmprunt = async (req, res) => {
  try {
    const emprunt = await Emprunt.findByIdAndDelete(req.params.id);
    if (!emprunt) {
      return res.status(404).json({ error: 'Emprunt non trouvé' });
    }
    res.status(200).json({ message: 'Emprunt supprimé avec succès' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
