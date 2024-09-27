
import Utilisateur from "../models/utilisateurModel.js";
import { generateJWT } from "../utils/gestionJWT.js";

// se connecter avec un ID
export const login = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findOne({ nom_utilisateur: req.body.nom_utilisateur });
    console.log(utilisateur);
    if (!utilisateur) {
        return res.status(404).json({ error: "utilisateur non trouvé" });
    }
    
    const motDePasseValide = await bcrypt.compare(req.body.mot_de_passe, utilisateur.mot_de_passe);
    if (!motDePasseValide)
    {
      return res.status(404).json({ error: "Mot de passe incorrect" });
    }

    const utilisateurData = utilisateur.toObject();
    const token = generateJWT(utilisateurData, res);
    res.json(token);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  const { nom_utilisateur, mot_de_passe } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const utilisateurExiste = await Utilisateur.findOne({ nom_utilisateur });
    if (utilisateurExiste) {
      return res.status(400).json({ error: "Nom d'utilisateur déjà pris" });
    }

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const motDePasseHache = await bcrypt.hash(mot_de_passe, salt);

    // Créer le nouvel utilisateur avec le mot de passe haché
    const nouvelUtilisateur = new Utilisateur({
      nom_utilisateur,
      mot_de_passe: motDePasseHache,
    });

    // Sauvegarder l'utilisateur dans la base de données
    const utilisateurEnregistre = await nouvelUtilisateur.save();

    // Générer un token JWT
    const utilisateurData = utilisateurEnregistre.toObject();
    const token = generateJWT(utilisateurData, res);

    // Retourner le token et les infos de l'utilisateur
    res.status(201).json({
      message: "Utilisateur enregistré avec succès",
      token,
      utilisateur: {
        id: utilisateurEnregistre._id,
        nom_utilisateur: utilisateurEnregistre.nom_utilisateur,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur lors de l'enregistrement de l'utilisateur" });
  }
};