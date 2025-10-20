import React, { useState } from 'react';
import { 
  Menu, X, ArrowRight, TrendingUp, Users, Target, Briefcase, 
  Camera, Zap, ChevronRight // Ajouté pour la section Galerie
} from 'lucide-react';

    

// =========================================================
// --- MOCK DATA (Données de simulation) ---
// =========================================================

// const kiccActivities = [
//   { 
//     id: 1, 
//     titre: "Sommet de l'Innovation Tech", 
//     date: "12 Octobre 2024", 
//     description: "Conférence majeure sur les dernières avancées en IA et développement durable.",
//     icone: Briefcase
//   },
//   { 
//     id: 2, 
//     titre: "Formation 'Lead with Impact'", 
//     date: "15 Novembre 2024", 
//     description: "Atelier intensif de deux jours sur le leadership transformationnel et la gestion d'équipe.",
//     icone: Target
//   },
//   { 
//     id: 3, 
//     titre: "Soirée de Gala Annuelle", 
//     date: "20 Décembre 2024", 
//     description: "Célébration des succès de l'année et réseautage avec nos partenaires clés.",
//     icone: Users
//   },
// ];

const mockStats = [
  { value: "5.2M", label: "Chiffre d'Affaires (€)", icon: TrendingUp, color: "text-indigo-600" },
  { value: "450+", label: "Membres Actifs", icon: Users, color: "text-green-600" },
  { value: "120", label: "Projets Réalisés", icon: Briefcase, color: "text-yellow-600" },
];

const mockCEO = {
  nom: "CEO Idris sedidia",
  titre: "Directeur Général",
  citation: "Notre vision est de transformer l'ambition en impact réel, en plaçant l'humain au cœur de chaque innovation.",
  imagePlaceholder: "https://placehold.co/150x150/5B21B6/ffffff?text=E.V."
};

// --- GALERIE DE PHOTOS (Utilisation des données fournies) ---
const mockPhotos = [
  { 
    id: 1, 
    category: 'Missions', 
    title: 'Lancement du Projet Alpha', 
    type: 'Déploiement',
    url: 'https://placehold.co/600x400/312E81/ffffff?text=MISSION+ALPHA', 
  },
  { 
    id: 2, 
    category: 'Événements', 
    title: 'Gala Annuel 2024', 
    type: 'Célébration',
    url: 'https://placehold.co/600x400/991B1F/ffffff?text=GALA+ANNUEL', 
  },
  { 
    id: 3, 
    category: 'Missions', 
    title: 'Atelier de Cadrage', 
    type: 'Brainstorming',
    url: 'https://placehold.co/600x400/1D4ED8/ffffff?text=ATELIER+CADRAGE', 
  },
  { 
    id: 4, 
    category: 'Autres', 
    title: 'Nouveaux Bureaux', 
    type: 'Environnement',
    url: 'https://placehold.co/600x400/059669/ffffff?text=NOUVEAUX+BUREAUX', 
  },
  { 
    id: 5, 
    category: 'Événements', 
    title: 'Hackathon 48h', 
    type: 'Innovation',
    url: 'https://placehold.co/600x400/5B21B6/ffffff?text=HACKATHON', 
  },
  { 
    id: 6, 
    category: 'Missions', 
    title: 'Phase de Test Bêta', 
    type: 'Validation',
    url: 'https://placehold.co/600x400/D97706/ffffff?text=TEST+B%C3%89TA', 
  },
];

const categories = [
  { id: 'Tous', label: 'Toutes les Catégories', icon: Camera, colorClass: 'bg-indigo-600' },
  { id: 'Missions', label: 'Missions Client', icon: Briefcase, colorClass: 'bg-green-600' },
  { id: 'Événements', label: 'Événements et Réseautage', icon: Zap, colorClass: 'bg-red-600' },
  { id: 'Autres', label: 'Vie d\'Entreprise', icon: ChevronRight, colorClass: 'bg-yellow-600' },
];
// --- FIN DES DONNÉES DE LA GALERIE ---


// =========================================================
// Composants Individuels
// =========================================================

// --- Carte de Photo Statique ---
const StaticPhotoCard = ({ photo }) => {
  // Détermination statique de la couleur de la bordure pour l'esthétique
  let borderColorClass = 'border-gray-500';
  if (photo.category === 'Missions') borderColorClass = 'border-indigo-600';
  if (photo.category === 'Événements') borderColorClass = 'border-red-600';
  if (photo.category === 'Autres') borderColorClass = 'border-green-600';

  return (
    <div className={`overflow-hidden rounded-xl shadow-lg bg-white border-t-8 ${borderColorClass} transition duration-300 hover:shadow-2xl`}>
      {/* Image */}
      <img
        src={photo.url}
        alt={photo.title}
        className="w-full h-64 object-cover"
        // Gestion d'erreur pour les images
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/4F46E5/ffffff?text=Photo+Manquante" }}
      />
      
      {/* Détails affichés statiquement */}
      <div className="p-4">
        <span className="text-xs font-semibold uppercase text-gray-600 tracking-wider mb-1 block">
          {photo.category}
        </span>
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {photo.title}
        </h3>
        <p className="text-sm text-gray-500">
          Type : {photo.type}
        </p>
      </div>
    </div>
  );
};








// =========================================================
// MAIN COMPONENT: App
// =========================================================
export default async function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mise à jour de la navigation pour inclure la galerie
  const navItems = [
    { name: "Accueil", href: "#home" },
    { name: "Activités", href: "/collections" },
    { name: "Galerie", href: "#gallery" }, // Nouvelle entrée
    { name: "Mission", href: "#mission" },
    { name: "Direction", href: "#ceo" },
  ];

  
  const kiccActivities = await getActivites();


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* 1. Navbar */}
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
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-gray-600 hover:text-indigo-600 font-medium transition duration-150"
                >
                  {item.name}
                </a>
              ))}
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none transition duration-150"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Responsive) */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition duration-150"
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-0">
        
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
              Façonner l'Avenir, Ensemble.
            </h2>
            <p className="text-xl text-indigo-100 mb-8 drop-shadow-md">
              Votre partenaire de confiance pour l'innovation et la croissance durable.
            </p>
            <a 
              href="#activities" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-indigo-700 bg-white hover:bg-indigo-50 transition duration-300 transform hover:scale-105"
            >
              Découvrez nos Activités
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </section>


        {/* 3. Chiffre d'affaires & Membres (Statistiques) */}
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

        {/* 4. 3 Dernières Activités */}
        <section id="activities" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Nos Dernières Activités
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {kiccActivities.map((activity) => (
                <div key={activite.id} className="bg-white p-6 rounded-xl shadow-lg border-t-8 border-yellow-500 flex flex-col hover:shadow-2xl transition duration-300">
                  <div className="flex items-center mb-4">
                    <activite.icone className="w-6 h-6 text-yellow-500 mr-3" />
                    <h3 className="text-xl font-semibold text-gray-800">{activite.titre}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-3 italic">{activite.date}</p>
                  <p className="text-gray-600 flex-grow">{activite.description}</p>
                  <button className="mt-4 text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition duration-150">
                    Voir les détails <ArrowRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. GALERIE DE PHOTOS (STATIQUE) - NOUVELLE SECTION */}
        <section id="gallery" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
              Galerie : Moments Forts en Images
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Revivez nos projets, événements et la vie d'équipe.
            </p>

            {/* Boutons de Catégorie (Statiques/Décoratifs) */}
            <div className="flex flex-wrap justify-center space-x-2 space-y-2 md:space-y-0 mb-12">
              {categories.map((cat, index) => {
                const Icon = cat.icon;
                // Le premier bouton est stylisé comme "actif" pour l'apparence statique
                const isActive = index === 0; 

                return (
                  <a
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
                  </a>
                );
              })}
            </div>

            {/* Grille des Photos Statiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Utilisation de mockPhotos pour le rendu statique */}
              {mockPhotos.map((photo) => (
                <StaticPhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
            
          </div>
        </section>
        {/* FIN DE LA GALERIE */}

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
              <a 
                href="#" 
                className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-300"
              >
                Lire notre charte complète →
              </a>
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
                <img 
                  src={mockCEO.imagePlaceholder} 
                  alt={`Photo de ${mockCEO.nom}`}
                  className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 mx-auto md:mx-0"
                />
              </div>
              <div>
                <blockquote className="text-2xl italic font-light mb-4">
                  “{mockCEO.citation}”
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

        

        {/* Footer (Simple) */}
        <footer className="bg-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
            &copy; {new Date().getFullYear()} DOT KICC. Tous droits réservés.
          </div>
        </footer>

      </main>
    </div>
  );
};


async function getActivites () {
  try {
    const response = await fetch('/api/collections');
    const datas = await response.json();        
    console.log(datas); // Accédez à la propriété collections
    // setActivites(datas.collections.find(collection => collection.name === 'activites').data); // Accédez à la propriété collections
  } catch (error) {
    console.error('Erreur lors de la récupération des collections:', error);
  } finally {
    // setIsLoading(false)
    console.log("good");
    
  }
};

