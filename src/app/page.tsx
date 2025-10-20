import Link from 'next/link';
import { Metadata } from 'next';
import Footer from './components/footer';

import { 
  X, ArrowRight, TrendingUp, Users, Briefcase, 
  Camera, Zap, ChevronRight // Ajouté pour la section Galerie
} from 'lucide-react';
import Image from 'next/image';



// objects
const mockStats = [
  { value: "5.2M", label: "Chiffre d Affaires (€)", icon: TrendingUp, color: "text-indigo-600" },
  { value: "450+", label: "Membres Actifs", icon: Users, color: "text-green-600" },
  { value: "120", label: "Projets Réalisés", icon: Briefcase, color: "text-yellow-600" },
];
// objects



// **********************************************
// 1. Définition des Métadonnées pour le SEO
// **********************************************
export const metadata: Metadata = {
  title: "Accueil - DOT KICC",
  description: "Découvrez toutes les activités et les dernières nouvelles de notre entreprise. Explorez les formations, les ateliers et les événements à venir.",
  keywords: ['activités', 'entreprise', 'formation', 'événements', 'blog', 'actualités'],
  openGraph: {
    title: "DOT KICC - Accueil",
    description: "La page d accueil incontournable pour les activités de notre entreprise.",
    url: '/',
    siteName: 'DOT KICC',
    // Ajoutez ici une image si vous en avez une dans /public
    // images: [{ url: '/opengraph-image.png' }],
  },
};

// **********************************************
// 2. Fonctions de Récupération des Données (Serveur)
// **********************************************

// 1. Définir le type des données contenues dans le tableau 'data'
interface Activite {
    _id: string; // MongoDB IDs sont souvent des strings
    titre: string;
    ladate: string;
    description: string;
    laphoto: string;
    // ... Ajoutez tous les autres champs ici
}

// 2. Définir la structure d un élément de la collection
interface CollectionItem {
    name: string;
    data: Activite[]; // Le tableau de données utilise l interface Activite
    // Si d autres collections existent, vous pouvez utiliser 'any[]' pour leur 'data'
    // mais le mieux est d utiliser un 'Union Type' ou un 'Generic' si possible.
    // Pour simplifier, nous utilisons ici un type qui couvre au moins 'activites'.
}

// 3. Définir la structure complète des données reçues
interface CollectionResponse {
    collections: CollectionItem[];
}

/**
 * Récupère le tableau des activités à partir du Route Handler /api/collections.
 * Cette fonction est exécutée côté Serveur.
 */
async function getActivites(): Promise<Activite[]> {
  // En environnement de production, remplacez 'http://localhost:3000' par votre domaine réel.
  const baseUrl = process.env.NODE_ENV === 'production' 
        ? process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://dotkicc.vercel.app/' 
        : 'http://localhost:3000/';
                  
  const url = `${baseUrl}/api/collections`;

  try {
    const response = await fetch(url, { cache: 'no-store' }); 
    
    if (!response.ok) {
        console.error(`Erreur HTTP lors du fetch des collections: ${response.status}`);
        return [];
    }

    // const datas = await response.json();
    const datas: CollectionResponse = await response.json();

    // Logique de récupération sécurisée et robuste (avec chaînage optionnel)
    const activites = datas?.collections
        .find((collection) => collection.name === 'activites')
        ?.data || [];
        
    return activites as Activite[];

  } catch (error) {
    console.error('Erreur lors de la récupération des activités (Serveur):', error);
    return []; // Retourne un tableau vide en cas d échec
  }
}

// **********************************************
// 3. Composant de la Page d Accueil (Serveur)
// **********************************************

export default async function Home() {
    
    // Chargement synchrone des données pendant le rendu du Serveur
    const activites = await getActivites();

    const navItems = [
      { name: "Accueil", href: "#home" },
      { name: "Activités", href: "/collections" },
      { name: "Galerie", href: "#gallery" }, // Nouvelle entrée
      { name: "Mission", href: "#mission" },
      { name: "Direction", href: "#ceo" },
    ];

    const mockCEO = {
      nom: "CEO Idris sedidia",
      titre: "Directeur Général",
      citation: "Notre vision est de transformer l ambition en impact réel, en plaçant l humain au cœur de chaque innovation.",
      imagePlaceholder: "https://placehold.co/150x150/5B21B6/ffffff?text=E.V."
    };
    
    // --- GALERIE DE PHOTOS (Utilisation des données fournies) ---
    
    const categories = [
      { id: 'Tous', label: 'Toutes les Catégories', icon: Camera, colorClass: 'bg-indigo-600' },
      { id: 'Missions', label: 'Missions Client', icon: Briefcase, colorClass: 'bg-green-600' },
      { id: 'Événements', label: 'Événements et Réseautage', icon: Zap, colorClass: 'bg-red-600' },
      { id: 'Autres', label: 'Vie d Entreprise', icon: ChevronRight, colorClass: 'bg-yellow-600' },
    ];
    

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-inter">
            <header className="bg-indigo-600 text-white py-1 shadow-xl">
            </header>
            <nav className="sticky top-0 z-50 bg-white shadow-md">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-indigo-600">
                          DOT KICC
                        </span>
                      </div>
                      {/* Desktop Menu */}
                      <div className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                          <Link 
                            key={item.name} 
                            href={item.href} 
                            className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                      {/* Mobile Menu Button */}
                      <div className="md:hidden">
                        <button
                          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition duration-150"
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                
                  {/* Mobile Menu (Responsive) */}
                  <div className="md:hidden bg-white border-t border-gray-100">
                    {navItems.map((item) => (
                      <Link 
                        key={item.name} 
                        href={item.href}
                        className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
            </nav>

            {/* =========================================== */}
            <main className="flex-grow">
              {/* 2. Carousel Home (Hero Section) */}
              <section id="home" className="relative h-[60vh] bg-indigo-700 flex items-center justify-center overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-20 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url('https://placehold.co/1200x600/3730A3/FFFFFF/png?text=Bienvenue+%C3%A0+DOT KICC')`, 
                  }}
                ></div>
                
                <div className="relative z-10 text-center p-8 max-w-3xl">
                  <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
                    Façonner l Avenir, Ensemble.
                  </h2>
                  <p className="text-xl text-indigo-100 mb-8 drop-shadow-md">
                    Votre partenaire de confiance pour l innovation et la croissance durable.
                  </p>
                  <Link 
                    href="/collections" 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-indigo-700 bg-white hover:bg-indigo-50 transition duration-300 transform hover:scale-105"
                  >
                    Découvrez nos Activités
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </section>
              {/* 2. Carousel Home (Hero Section) */}

              {/* 3. Chiffre d affaires & Membres (Statistiques) */}
              <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    Notre Impact en Chiffres
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {mockStats.map((stat) => (
                      <div key={stat.label} className="bg-white p-8 rounded-xl shadow-lg text-center border-b-4 border-indigo-500 transform transition duration-500 hover:scale-[1.02]">
                        <stat.icon className={`w-10 h-10 mx-auto mb-4 ${stat.color}`} />
                        <p className="text-5xl font-extrabold text-gray-900">
                          {stat.value}
                        </p>
                        <p className="mt-2 text-lg font-medium text-gray-500">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              {/* 3. Chiffre d affaires & Membres (Statistiques) */}

              {/* activités recentes */}
              <section id="activities" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                    Nos Dernières Activités
                  </h2>

                  {activites.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {activites.map((activite) => (
                        <div key={activite._id} className="bg-white p-6 rounded-xl shadow-lg border-t-8 border-yellow-500 flex flex-col hover:shadow-2xl transition duration-300">
                          <div className="w-full h-48 bg-gray-200 overflow-hidden">
                            {/* Si l image existe, on l affiche */}
                            {activite.laphoto ? (
                              <Image // <-- Utilisation du composant Next.js Image
                                src={activite.laphoto} 
                                alt={activite.titre} 
                                width={100}
                                height={70}
                                // unoptimized
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="w-full h-full object-cover transition duration-300 hover:scale-105"
                              />

                              ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                [Image de la collection]
                              </div>
                            )}


                          </div>

                          <div className="p-6">
                            <p className="text-sm font-medium text-indigo-500 mb-1">
                                {new Date(activite.ladate).toLocaleDateString('fr-FR')}
                            </p>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                {activite.titre}
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                                          {activite.description}
                            </p>

                            <Link 
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-500 hover:bg-yellow-600 transition duration-150" 
                                href={`/collections/${activite._id}`}
                            >
                                Voir les détails →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-lg text-gray-600">
                        {/* Message affiché si la collection est vide ou en cas d erreur */}
                        Aucune activité n'a été trouvée ou une erreur est survenue lors du chargement.
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                                    Veuillez vérifier la connexion à la base de données ou le Route Handler `/api/collections`.
                      </p>
                    </div>
                  )}
                        
                </div>
              </section>
              {/* activités recentes */}


              {/* 5. GALERIE DE PHOTOS (STATIQUE) - NOUVELLE SECTION */}
              <section id="gallery" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
                    Galerie : Moments Forts en Images
                  </h2>
                  <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                    Revivez nos projets, événements et la vie d équipe.
                  </p>

                  {/* Boutons de Catégorie (Statiques/Décoratifs) */}
                  <div className="flex flex-wrap justify-center space-x-2 space-y-2 md:space-y-0 mb-12">
                    {categories.map((cat, index) => {
                      const Icon = cat.icon;
                      // Le premier bouton est stylisé comme "actif" pour l apparence statique
                      const isActive = index === 0; 

                      return (
                        <Link
                          key={cat.id}
                          href="#"
                          className={`
                            flex items-center px-5 py-2 rounded-full font-medium shadow-md transition duration-300
                            ${isActive 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }
                          `}
                          aria-disabled={true} 
                        >
                          <Icon className="w-5 h-5 mr-2" />
                          {cat.label}
                        </Link>
                      );
                    })}
                  </div>


                  {/* 6. Ce que nous faisons (Mission) */}
        <section id="mission" className="py-20 bg-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-extrabold text-indigo-700 mb-6">
              Notre Mission
            </h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-700 leading-relaxed">
              Nous nous engageons à fournir des solutions innovantes et éthiques qui propulsent la croissance de nos clients. Notre objectif est de bâtir un écosystème où la technologie et la responsabilité sociale se rencontrent pour un impact positif et durable sur la société.
            </p>
            <div className="mt-10">
              <Link 
                href="#" 
                className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-300"
              >
                Lire notre charte complète →
              </Link>
            </div>
          </div>
        </section>

        {/* 7. Le Directeur Général */}
        <section id="ceo" className="py-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-10">
              Mot de la Direction
            </h2>
            <div className="flex flex-col md:flex-row items-center md:text-left">
              <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                <Image 
                  src={mockCEO.imagePlaceholder} 
                  alt={`Photo de ${mockCEO.nom}`}
                  width={100}
                  height={70}
                  unoptimized
                  className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 mx-auto md:mx-0"
                />
              </div>
              <div>
                <blockquote className="text-2xl italic font-light mb-4">
                  {mockCEO.citation}
                </blockquote>
                <p className="text-xl font-semibold text-indigo-400">
                  {mockCEO.nom}
                </p>
                <p className="text-lg text-gray-400">
                  {mockCEO.titre}
                </p>
              </div>
            </div>
          </div>
        </section>
                  
                </div>
              </section>
              {/* FIN DE LA GALERIE */}
            </main>
            <Footer />
        </div>
    );
}
