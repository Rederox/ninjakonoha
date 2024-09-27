import jwt from "jsonwebtoken";

// Middleware pour vérifier le token JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Utiliser la clé secrète utilisée pour signer le token
        req.ninja = decoded; // On peut attacher l'utilisateur à la requête
        next(); // Continuer avec la prochaine fonction middleware
    } catch (err) {
        return res.status(403).json({ message: 'Token invalide.' });
    }
};

export default authenticateJWT;