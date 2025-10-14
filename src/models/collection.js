// models/Collection.js
import mongoose, { Schema } from 'mongoose';

const collectionSchema = new Schema({
  nom: String,
  objets: [{ type: Schema.Types.ObjectId, ref: 'Objet' }]
});

export default mongoose.models.Collection || mongoose.model('Collection', collectionSchema);