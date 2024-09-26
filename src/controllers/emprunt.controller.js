// /src/controllers/emprunt.controller.js

import Emprunt from "../models/emprunt.model.js";

// Créer un nouvel emprunt
export const createEmprunt = async (req, res) => {
  try {
    const emprunt = new Emprunt(req.body);
    await emprunt.save();
    res.status(201).json(emprunt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir tous les emprunts avec pagination, filtrage et tri
export const getEmprunt = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy,
      order = "asc",
      ...filters
    } = req.query;

    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === "asc" ? 1 : -1;
    }

    const emprunts = await Emprunt.find(filters)
      .populate("ninjaId", "nom rang")
      .populate("jutsuScrollId", "nom categorie")
      .sort(sortOptions)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json(emprunts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir un emprunt par ID
export const getEmpruntById = async (req, res) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id)
      .populate("ninjaId", "nom rang")
      .populate("jutsuScrollId", "nom categorie");
    if (!emprunt) {
      return res.status(404).json({ error: "Emprunt non trouvé" });
    }
    res.json(emprunt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un emprunt
export const updateEmprunt = async (req, res) => {
  try {
    const emprunt = await Emprunt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!emprunt) {
      return res.status(404).json({ error: "Emprunt non trouvé" });
    }
    res.json(emprunt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un emprunt
export const deleteEmprunt = async (req, res) => {
  try {
    const emprunt = await Emprunt.findById(req.params.id);
    if (!emprunt) {
      return res.status(404).json({ error: "Emprunt non trouvé" });
    }

    // Utiliser la méthode remove pour déclencher les middlewares
    await emprunt.remove();
    res.json({ message: "Emprunt supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
