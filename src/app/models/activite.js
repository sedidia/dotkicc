import mongoose from 'mongoose';

const activiteSchema = new mongoose.Schema({
  titre: String,
  description: String,
  image: String,
});

export default mongoose.models.Activite || mongoose.model('Activite', activiteSchema);