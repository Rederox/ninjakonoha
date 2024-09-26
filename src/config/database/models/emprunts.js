import mongoose from "mongoose";

const EmpruntSchema = new mongoose.Schema({
  ninjaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ninja',
    required: true,
  },
  jutsuScrollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JutsuScroll',
    required: true,
  },
  dateEmprunt: {
    type: Date,
    default: Date.now,
  },
  dateRetourPrévue: {
    type: Date,
    required: true,
  },
  statut: {
    type: String,
    enum: ['En cours', 'Terminé', 'En retard'],
    default: 'En cours',
  },
  notes: {
    type: String,
    maxlength: [200, 'Les notes ne peuvent dépasser 200 caractères'],
  },
});

module.exports = mongoose.model('Emprunt', EmpruntSchema);