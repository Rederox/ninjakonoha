import cron from 'node-cron';
import Emprunt from '../models/empruntModel.js';
import Ninja from '../models/ninjaModel.js';

const sendReminders = async () => {
    try {
        const empruntsEnRetard = await Emprunt.find({
            dateRetourPrevue: { $lt: new Date() },
            statut: 'En cours',
        }).populate('ninjaId');

        for (const emprunt of empruntsEnRetard) {
            // Mettre à jour le statut
            emprunt.statut = 'En retard';
            await emprunt.save();

            // Logique pour envoyer une notification au ninja
            const ninja = emprunt.ninjaId;
            console.log(`Rappel envoyé à ${ninja.nom} pour l'emprunt ${emprunt._id}`);
            // Ici, vous pouvez intégrer un service d'email ou de messagerie
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi des rappels:', error);
    }
};

// Planifier la tâche tous les jours à minuit
cron.schedule('* * * * *', () => {
    console.log('Exécution du rappel automatique');
    sendReminders();
});

export default cron;
