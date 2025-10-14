import { getCollections } from '../../../lib/mongodb';

export async function GET(req) {
  try {
    const collections = await getCollections();
    console.log('Collections dans la base de données:', collections);
    return new Response(JSON.stringify({ collections }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des collections:', error);
    return new Response(JSON.stringify({ message: 'Erreur interne' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}