import Statistiques from '../models/statistiquesModel.js';
import JutsuScroll from '../models/jutsuScrollModel.js';

export const obtenirJutsuDuMois = async (req, res) => {
    try {
        const mois = req.query.mois || new Date().toISOString().substr(0, 7);

        const stats = await Statistiques.findOne({ mois }).populate('jutsuDuMois');
        if (!stats) {
            return res.status(404).json({ error: 'Pas de statistiques pour ce mois' });
        }

        res.json({
            mois: stats.mois,
            jutsuDuMois: stats.jutsuDuMois,
            nombreEmprunts: stats.nombreEmprunts,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
