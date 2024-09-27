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

// Obtenir toutes les réservations
export const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('ninjaId', 'nom') // Remplacez 'nom' par le champ approprié dans votre modèle Ninja
            .populate('jutsuScrollId', 'titre'); // Remplacez 'titre' par le champ approprié dans votre modèle JutsuScroll

        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtenir une réservation par ID
export const getReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findById(id)
            .populate('ninjaId', 'nom')
            .populate('jutsuScrollId', 'titre');

        if (!reservation) {
            return res.status(404).json({ error: 'Réservation non trouvée' });
        }

        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};