import cron from 'node-cron';
import Emprunt from '../models/empruntModel.js';
import Statistiques from '../models/statistiquesModel.js';

const calculerJutsuDuMois = async () => {
    try {
        const debutMois = new Date();
        debutMois.setDate(1);
        debutMois.setHours(0, 0, 0, 0);

        const finMois = new Date(debutMois);
        finMois.setMonth(finMois.getMonth() + 1);

        // Agrégation pour compter les emprunts par jutsu
        const resultats = await Emprunt.aggregate([
            {
                $match: {
                    dateEmprunt: { $gte: debutMois, $lt: finMois },
                },
            },
            {
                $group: {
                    _id: '$jutsuScrollId',
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { count: -1 },
            },
            {
                $limit: 1,
            },
        ]);

        if (resultats.length > 0) {
            const jutsuDuMois = resultats[0]._id;
            const nombreEmprunts = resultats[0].count;

            // Enregistrer les statistiques
            await Statistiques.findOneAndUpdate(
                { mois: debutMois.toISOString().substr(0, 7) },
                { jutsuDuMois, nombreEmprunts },
                { upsert: true }
            );

            console.log(`Jutsu du mois mis à jour: ${jutsuDuMois}`);
        } else {
            console.log('Aucun emprunt ce mois-ci');
        }
    } catch (error) {
        console.error('Erreur lors du calcul du jutsu du mois:', error);
    }
};

// Planifier la tâche le 1er de chaque mois à 00h05
cron.schedule('5 0 1 * *', () => {
    console.log('Calcul du jutsu du mois');
    calculerJutsuDuMois();
});

export default cron;
