import mongoose from 'mongoose';

const activiteSchema = new mongoose.Schema({
  titre: String,
  description: String,
  // image: String,
});

const activite = mongoose.models.activite || mongoose.model('Activite', activiteSchema);
export default activite;