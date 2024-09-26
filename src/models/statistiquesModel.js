import mongoose from 'mongoose';

const { Schema } = mongoose;

const StatistiquesSchema = new Schema({
  mois: {
    type: String,
    required: true,
  },
  jutsuDuMois: {
    type: Schema.Types.ObjectId,
    ref: 'JutsuScroll',
    required: true,
  },
  nombreEmprunts: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Statistiques', StatistiquesSchema);
