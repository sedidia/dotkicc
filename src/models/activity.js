import mongoose from 'mongoose';

const activiteSchema = new mongoose.Schema({
  titre: String,
  ladate: String,
  laphoto: String,
  description: String,
});

const activite = mongoose.models.activite || mongoose.model('Activite', activiteSchema);
export default activite;