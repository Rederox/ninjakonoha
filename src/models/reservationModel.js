import mongoose from 'mongoose';

const { Schema } = mongoose;

const ReservationSchema = new Schema(
  {
    ninjaId: {
      type: Schema.Types.ObjectId,
      ref: 'Ninja',
      required: true,
    },
    jutsuScrollId: {
      type: Schema.Types.ObjectId,
      ref: 'JutsuScroll',
      required: true,
    },
    dateReservation: {
      type: Date,
      default: Date.now,
    },
    statut: {
      type: String,
      enum: ['En attente', 'Notifié', 'Annulé'],
      default: 'En attente',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Reservation', ReservationSchema);
