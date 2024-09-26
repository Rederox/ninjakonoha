// /src/controllers/ninja.controller.js

import Ninja from "../models/ninjaModel.js";
import Emprunt from '../models/empruntModel.js';
import JutsuScroll from '../models/jutsuScrollModel.js';

// Créer un nouveau ninja
export const createNinja = async (req, res) => {
  try {
    const ninja = new Ninja(req.body);
    await ninja.save();
    res.status(201).json(ninja);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir tous les ninjas avec pagination, filtrage et tri
export const getNinjas = async (req, res) => {
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

    const ninjas = await Ninja.find(filters)
      .sort(sortOptions)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json(ninjas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir un ninja par ID
export const getNinjaById = async (req, res) => {
  try {
    const ninja = await Ninja.findById(req.params.id).populate(
      "historiqueEmprunts",
    );
    if (!ninja) {
      return res.status(404).json({ error: "Ninja non trouvé" });
    }
    res.json(ninja);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un ninja
export const updateNinja = async (req, res) => {
  try {
    const ninja = await Ninja.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!ninja) {
      return res.status(404).json({ error: "Ninja non trouvé" });
    }
    res.json(ninja);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un ninja
export const deleteNinja = async (req, res) => {
  try {
    const ninja = await Ninja.findByIdAndDelete(req.params.id);
    if (!ninja) {
      return res.status(404).json({ error: "Ninja non trouvé" });
    }
    res.json({ message: "Ninja supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const recommanderJutsus = async (req, res) => {
  try {
    const { id } = req.params;

    // Récupérer le ninja et son historique d'emprunts
    const ninja = await Ninja.findById(id).populate('historiqueEmprunts');
    if (!ninja) {
      return res.status(404).json({ error: 'Ninja non trouvé' });
    }

    // Obtenir les catégories des jutsus empruntés
    const categoriesEmpruntees = await Emprunt.find({ ninjaId: id })
      .populate({
        path: 'jutsuScrollId',
        select: 'categorie',
      })
      .then((emprunts) => emprunts.map((e) => e.jutsuScrollId.categorie));

    // Trouver des jutsus dans les mêmes catégories que le ninja n'a pas encore empruntés
    const jutsusRecommandes = await JutsuScroll.find({
      categorie: { $in: categoriesEmpruntees },
      _id: { $nin: ninja.historiqueEmprunts.map((e) => e.jutsuScrollId) },
    }).limit(5);

    res.json(jutsusRecommandes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};