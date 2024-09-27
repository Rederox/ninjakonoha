// /src/models/ninja.model.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const UtilisateurSchema = new Schema(
    {
        nom_utilisateur: {
            type: String,
            required: [true, 'Le nom d\'utilisateur est requis'],
            unique: true,
            trim: true,
        },
        mot_de_passe: {
            type: String,
            required: [true, 'Le mot de passe est requis'],
        },
        
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);



export default mongoose.model('Utilisateur', UtilisateurSchema);
