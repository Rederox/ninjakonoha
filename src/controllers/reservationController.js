import Reservation from '../models/reservationModel.js';
import JutsuScroll from '../models/jutsuScrollModel.js';

export const reserverJutsuScroll = async (req, res) => {
    try {
        const { ninjaId, jutsuScrollId } = req.body;

        // Vérifier si le parchemin est indisponible
        const jutsuScroll = await JutsuScroll.findById(jutsuScrollId);
        if (!jutsuScroll) {
            throw new Error('Parchemin non trouvé');
        }
        if (jutsuScroll.quantite > 0) {
            throw new Error('Parchemin disponible, vous pouvez l\'emprunter directement');
        }

        // Créer la réservation
        const reservation = new Reservation({
            ninjaId,
            jutsuScrollId,
        });

        await reservation.save();

        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
