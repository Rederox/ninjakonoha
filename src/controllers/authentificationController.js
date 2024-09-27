// /src/controllers/ninja.controller.js

import Ninja from "../models/ninjaModel.js";
import { generateJWT } from "../utils/gestionJWT.js";

// se connecter avec un ID
export const login = async (req, res) => {
  try {
    const ninja = await Ninja.findById(req.params.id);
    if (!ninja) {
        return res.status(404).json({ error: "Ninja non trouvé" });
    }
    const ninjaData = ninja.toObject();
    const token = generateJWT(ninjaData, res);
    res.json(token);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
