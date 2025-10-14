import { createActivite } from '../../../lib/mongodb';

export async function POST(req) {
  try {
    const data = await req.json();
    const result = await createActivite(data);
    return new Response(JSON.stringify({ message: 'Activité créée avec succès', result }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'activité:', error);
    return new Response(JSON.stringify({ message: 'Erreur lors de la création de l\'activité' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}