// /src/models/ninja.model.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const NinjaSchema = new Schema(
    {
        nom: {
            type: String,
            required: [true, 'Le nom est requis'],
            unique: true,
            trim: true,
        },
        rang: {
            type: String,
            required: true,
            enum: ['Genin', 'Chunin', 'Jonin', 'Anbu', 'Kage'],
        },
        jutsus_maitrises: [
            {
                type: String,
                trim: true,
            },
        ],
        clan: {
            type: String,
            trim: true,
        },
        specialite: {
            type: String,
        },
        historiqueEmprunts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Emprunt',
            },
        ],
        limiteEmprunts: {
            type: Number,
            default: 3,
        },
        
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

// Champ virtuel pour les emprunts (population inversée)
NinjaSchema.virtual('emprunts', {
    ref: 'Emprunt',
    localField: '_id',
    foreignField: 'ninjaId',
});

// Méthode d'instance pour obtenir le nombre total d'emprunts
NinjaSchema.methods.nombreTotalEmprunts = function () {
    return this.historiqueEmprunts.length;
};

export default mongoose.model('Ninja', NinjaSchema);
