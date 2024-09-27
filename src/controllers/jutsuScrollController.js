import JutsuScroll from "../models/jutsuScrollModel.js";

// Créer un nouveau parchemin
export const createJutsuScroll = async (req, res) => {
  try {
    const jutsuScroll = new JutsuScroll(req.body);
    await jutsuScroll.save();
    res.status(201).json(jutsuScroll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir tous les parchemins avec pagination, filtrage et tri
export const getJutsuScrolls = async (req, res) => {
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

    const jutsuScrolls = await JutsuScroll.find(filters)
      .sort(sortOptions)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    res.json(jutsuScrolls);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir un parchemin par ID
export const getJutsuScrollById = async (req, res) => {
  try {
    const jutsuScroll = await JutsuScroll.findById(req.params.id);
    if (!jutsuScroll) {
      return res.status(404).json({ error: "Parchemin non trouvé" });
    }
    res.json(jutsuScroll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un parchemin
export const updateJutsuScroll = async (req, res) => {
  try {
    const jutsuScroll = await JutsuScroll.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!jutsuScroll) {
      return res.status(404).json({ error: "Parchemin non trouvé" });
    }
    res.json(jutsuScroll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un parchemin
export const deleteJutsuScroll = async (req, res) => {
  try {
    const jutsuScroll = await JutsuScroll.findByIdAndDelete(req.params.id);
    if (!jutsuScroll) {
      return res.status(404).json({ error: "Parchemin non trouvé" });
    }
    res.json({ message: "Parchemin supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
