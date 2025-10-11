import dbConnect from '../../lib/db';
import Activite from '../../models/Activite';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      const activites = await Activite.find();
      res.status(200).json(activites);
      break;
    case 'POST':
      const newActivite = new Activite(req.body);
      await newActivite.save();
      res.status(201).json(newActivite);
      break;
    default:
      res.status(405).json({ message: 'Méthode non autorisée' });
  }
}