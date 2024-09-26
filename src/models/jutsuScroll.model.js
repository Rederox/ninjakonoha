// /src/models/jutsuScroll.model.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const JutsuScrollSchema = new Schema(
  {
    nom: {
      type: String,
      required: [true, "Le nom est requis"],
      unique: true,
      trim: true,
    },
    createur: {
      type: String,
      required: [true, "Le créateur est requis"],
      trim: true,
    },
    rang: {
      type: String,
      required: [true, "Le rang est requis"],
      enum: ["D", "C", "B", "A", "S"],
    },
    quantite: {
      type: Number,
      required: true,
      min: [0, "La quantité ne peut pas être négative"],
      default: 1,
    },
    description: {
      type: String,
      maxlength: [500, "La description ne peut pas dépasser 500 caractères"],
    },
    categorie: {
      type: String,
      required: true,
      enum: ["Ninjutsu", "Taijutsu", "Genjutsu", "Kinjutsu", "Fuinjutsu"],
    },
    techniquesAssociees: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

// Champ virtuel pour les emprunts associés
JutsuScrollSchema.virtual("emprunts", {
  ref: "Emprunt",
  localField: "_id",
  foreignField: "jutsuScrollId",
});

export default mongoose.model("JutsuScroll", JutsuScrollSchema);
