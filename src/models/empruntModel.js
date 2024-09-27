// /src/models/emprunt.model.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const EmpruntSchema = new Schema(
    {
        ninjaId: {
            type: Schema.Types.ObjectId,
            ref: "Ninja",
            required: true,
        },
        jutsuScrollId: {
            type: Schema.Types.ObjectId,
            ref: "JutsuScroll",
            required: true,
        },
        dateEmprunt: {
            type: Date,
            default: Date.now,
        },
        dateRetourPrevue: {
            type: Date,
            required: true,
        },
        statut: {
            type: String,
            enum: ["En cours", "Terminé", "En retard"],
            default: "En cours",
        },
        notes: {
            type: String,
            maxlength: [300, "Les notes ne peuvent pas dépasser 300 caractères"],
        },
    },
    {
        timestamps: true,
    },
);

// Middleware pré-enregistrement pour vérifier la disponibilité du parchemin
EmpruntSchema.pre("save", async function (next) {
    try {
        const jutsuScroll = await mongoose
            .model("JutsuScroll")
            .findById(this.jutsuScrollId);

        if (!jutsuScroll) {
            throw new Error("Le parchemin spécifié n'existe pas");
        }

        if (jutsuScroll.quantite > 0) {
            jutsuScroll.quantite -= 1;
            await jutsuScroll.save();
            next();
        } else {
            throw new Error("Le parchemin n'est plus disponible");
        }
    } catch (err) {
        next(err);
    }
});

// Middleware post-enregistrement pour mettre à jour l'historique du ninja
EmpruntSchema.post("save", async function (doc, next) {
    try {
        await mongoose.model("Ninja").findByIdAndUpdate(doc.ninjaId, {
            $addToSet: { historiqueEmprunts: doc._id },
        });
        next();
    } catch (err) {
        next(err);
    }
});

// Middleware pré-suppression pour remettre à jour la quantité du parchemin
EmpruntSchema.pre("remove", async function (next) {
    try {
        const jutsuScroll = await mongoose
            .model("JutsuScroll")
            .findById(this.jutsuScrollId);

        if (jutsuScroll) {
            jutsuScroll.quantite += 1;
            await jutsuScroll.save();
        }

        // Retirer l'emprunt de l'historique du ninja
        await mongoose.model("Ninja").findByIdAndUpdate(this.ninjaId, {
            $pull: { historiqueEmprunts: this._id },
        });

        next();
    } catch (err) {
        next(err);
    }
});

// Méthode statique pour trouver les emprunts en retard
EmpruntSchema.statics.findEmpruntsEnRetard = function () {
    return this.find({
        dateRetourPrevue: { $lt: new Date() },
        statut: "En cours",
    });
};

// Middleware post mise à jour du statut
EmpruntSchema.post('findOneAndUpdate', async function (doc, next) {
    if (doc.statut === 'Terminé') {
        // Remettre à jour la quantité du parchemin
        const jutsuScroll = await mongoose.model('JutsuScroll').findById(doc.jutsuScrollId);
        if (jutsuScroll) {
            jutsuScroll.quantite += 1;
            await jutsuScroll.save();

            // Vérifier s'il y a des réservations en attente
            const reservation = await mongoose
                .model('Reservation')
                .findOne({ jutsuScrollId: jutsuScroll._id, statut: 'En attente' })
                .sort('dateReservation');

            if (reservation) {
                // Notifier le ninja (ici, on met à jour le statut, mais on pourrait envoyer un email)
                reservation.statut = 'Notifié';
                await reservation.save();
                // Logique supplémentaire pour notifier le ninja
            }
        }
    }
    next();
});


export default mongoose.model("Emprunt", EmpruntSchema);
