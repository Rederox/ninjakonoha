import mongoose from "mongoose";

const NinjaSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
  },
  rang: {
    type: String,
    enum: ['Genin', 'Chunin', 'Jonin', 'Kage'],
    required: [true, 'Le rang est requis'],
  },
  jutsus_maîtrisés: [
    {
      type: String,
      trim: true,
    },
  ],
  clan: {
    type: String,
    trim: true,
  },
  spécialité: {
    type: String,
    enum: ['Ninjutsu', 'Genjutsu', 'Taijutsu', 'Bukijutsu'],
  },
  historiqueEmprunts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Emprunt',
    },
  ],
});

module.exports = mongoose.model('Ninja', NinjaSchema);