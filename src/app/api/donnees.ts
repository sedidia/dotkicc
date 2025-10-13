import client from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const db = client.db();
    const collection = db.collection('donnees');

    switch (req.method) {
      case 'GET':
        const donnees = await collection.find().toArray();
        res.status(200).json(donnees);
        break;
      case 'POST':
        const nouvelleDonnee = await collection.insertOne(req.body);
        res.status(201).json(nouvelleDonnee);
        break;
      default:
        res.status(405).json({ message: 'Méthode non autorisée' });
    }
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}