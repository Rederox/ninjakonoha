import mongoose from "mongoose";

const JutsuScrollSchema = new mongoose.Schema({
    nom: {
      type: String,
      required: [true, 'Le nom est requis'],
      unique: true,
      trim: true,
      maxlength: [100, 'Le nom ne peut dépasser 100 caractères'],
    },
    créateur: {
      type: String,
      required: [true, 'Le créateur est requis'],
      trim: true,
    },
    rang: {
      type: String,
      enum: ['D', 'C', 'B', 'A', 'S'],
      required: [true, 'Le rang est requis'],
    },
    quantité: {
      type: Number,
      min: [1, 'Il doit y avoir au moins une copie'],
      required: [true, 'La quantité est requise'],
    },
    description: {
      type: String,
      maxlength: [500, 'La description ne peut dépasser 500 caractères'],
    },
    catégorie: {
      type: String,
      enum: ['Ninjutsu', 'Genjutsu', 'Taijutsu', 'Kinjutsu', 'Fūinjutsu'],
      required: [true, 'La catégorie est requise'],
    },
    techniquesAssociées: [
      {
        type: String,
        trim: true,
      },
    ],
  });
  
  module.exports = mongoose.model('JutsuScroll', JutsuScrollSchema);