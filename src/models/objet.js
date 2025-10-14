// models/Objet.js
import mongoose, { Schema } from 'mongoose';

const objetSchema = new Schema({
  nom: String,
  description: String
});

export default mongoose.models.Objet || mongoose.model('Objet', objetSchema);