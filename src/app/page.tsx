"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, HardHat, HeartHandshake, ShieldCheck, ArrowRight, 
  Mail, Phone, MapPin, Facebook, Linkedin, Loader2, Shield 
} from 'lucide-react';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showCookies, setShowCookies] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // 1. Fin du chargement initial (1.5s)
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      
      // 2. Une fois le chargement fini, on attend 4 secondes pour afficher les cookies
      const cookieTimer = setTimeout(() => {
        const hasAccepted = localStorage.getItem('dot-kicc-cookies');
        if (!hasAccepted) {
          setIsAnimating(true); // Déclenche l'animation
          setShowCookies(true);
        }
      }, 4000); // Délai de 4 secondes

      return () => clearTimeout(cookieTimer);
    }, 1500);

    return () => clearTimeout(loadTimer);
  }, []);

  const acceptCookies = () => {
    setIsAnimating(false); // Lance l'animation de sortie
    setTimeout(() => {
      localStorage.setItem('dot-kicc-cookies', 'true');
      setShowCookies(false);
    }, 500); // Attend la fin de l'animation pour supprimer du DOM
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex flex-col items-center justify-center z-50">
        <Loader2 className="text-blue-500 animate-spin mb-4" size={48} />
        <h2 className="text-white font-bold text-xl tracking-widest animate-pulse">DOT KICC</h2>
        <p className="text-slate-400 text-sm mt-2 font-light italic">Chargement des ressources...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 relative overflow-x-hidden">
      
      {/* --- Bannière de Cookies avec animation fluide --- */}
      {showCookies && (
        <div 
          className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white border-t border-slate-200 shadow-[0_-10px_25px_rgba(0,0,0,0.1)] transition-transform duration-700 ease-in-out ${
            isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-slate-600 text-sm md:text-base">
              <div className="bg-blue-50 p-2 rounded-full">
                <Shield className="text-blue-600 shrink-0" size={24} />
              </div>
              <p className="max-w-2xl">
                Nous utilisons des cookies pour optimiser votre expérience sur le portail de la <strong>DOT KICC</strong>. 
                Ces outils nous permettent d'assurer la sécurité et la performance de nos services.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button 
                onClick={acceptCookies}
                className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md active:scale-95"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative bg-slate-900 py-24 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold tracking-tight mb-6">DOT KICC</h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Organe de coordination stratégique et spécialisée unissant l expertise du 
              <span className="text-blue-400 font-semibold mx-1">Ministère des Mines</span> et du 
              <span className="text-emerald-400 font-semibold mx-1">Ministère des Affaires Sociales</span>.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-medium transition flex items-center gap-2">
                Nos Missions <ArrowRight size={18} />
              </button>
              <button className="border border-slate-700 hover:bg-slate-800 px-8 py-3 rounded-lg font-medium transition">
                Rapports Annuels
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Partenariat Inter-Ministériel */}
      <section className="py-20 border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Une Synergie Institutionnelle</h2>
              <p className="text-slate-600 mb-6 italic">
                La DOT KICC assure le suivi des engagements sociaux découlant de l exploitation minière pour un développement durable et inclusif.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-md shrink-0">
                    <HardHat size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold font-semibold uppercase tracking-tight text-sm">Expertise Mines</h4>
                    <p className="text-sm text-slate-500">Régulation technique et suivi de l exploitation des ressources.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-md shrink-0">
                    <HeartHandshake size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold font-semibold uppercase tracking-tight text-sm">Affaires Sociales</h4>
                    <p className="text-sm text-slate-500">Protection des communautés et redistribution des bénéfices sociaux.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-8 rounded-2xl text-center border border-slate-100">
                <span className="block text-4xl font-bold text-blue-600">02</span>
                <span className="text-slate-500 text-xs uppercase tracking-widest font-bold">Ministères</span>
              </div>
              <div className="bg-slate-50 p-8 rounded-2xl text-center border border-slate-100">
                <span className="block text-4xl font-bold text-blue-600">100%</span>
                <span className="text-slate-500 text-xs uppercase tracking-widest font-bold">Engagement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Axes d'Intervention */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Axes d Intervention</h2>
          <div className="h-1.5 w-16 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
            {[
              { title: "Suivi Environnemental", desc: "Contrôle de l impact des activités extractives sur les écosystèmes locaux.", icon: <ShieldCheck size={32} className="text-blue-600" /> },
              { title: "Développement Communautaire", desc: "Gestion des dotations pour les infrastructures de base (écoles, santé).", icon: <Users size={32} className="text-blue-600" /> },
              { title: "Médiation Sociale", desc: "Arbitrage des différends entre opérateurs miniers et populations riveraines.", icon: <HeartHandshake size={32} className="text-blue-600" /> }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border-b-4 border-transparent hover:border-blue-600">
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Section Contact & Adresses */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-6">Nous Contacter</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-blue-600 shrink-0" size={24} />
                <div>
                  <p className="font-bold text-sm uppercase tracking-wider text-slate-400 mb-1">Siège Social</p>
                  <p className="text-slate-800 font-medium">Kinsenda Kitotwe, Territoire de SAKANIA</p>
                  <p className="text-slate-600 text-sm italic">Secteur de BALAMBA, KASUMBALESA</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-blue-600 shrink-0" size={20} />
                <p className="text-slate-800 font-medium">+243 97 339 3640</p>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-blue-600 shrink-0" size={20} />
                <p className="text-slate-800 font-medium">dotkicc03@gmail.com</p>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1 text-center lg:text-left">
            <h3 className="text-2xl font-bold mb-6">Suivez-nous</h3>
            <p className="text-slate-600 mb-6 text-sm">Rejoignez notre communauté pour suivre l impact de nos actions sociales.</p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <a href="https://web.facebook.com/profile.php?id=100090353215433" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-full transition-all duration-300 shadow-sm">
                <Facebook size={20} />
              </a>
              <a href="https://www.linkedin.com/in/sedidia/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 hover:bg-blue-700 hover:text-white rounded-full transition-all duration-300 shadow-sm">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-900 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-700"></div>
              <h4 className="text-xl font-bold mb-4 text-center border-b border-slate-700 pb-2">Heures d ouverture</h4>
              <div className="space-y-3 text-slate-300 text-sm mt-4 relative z-10">
                <p className="flex justify-between"><span>Lundi - Vendredi</span> <span className="text-blue-400">08h00 - 16h30</span></p>
                <p className="flex justify-between"><span>Samedi</span> <span className="text-blue-400">09h00 - 12h00</span></p>
                <p className="flex justify-between border-t border-slate-700 pt-3 mt-2 font-semibold"><span>Dimanche</span> <span className="text-red-400">Fermé</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white font-bold text-xl mb-1 tracking-tight">DOT KICC</p>
          <p className="text-xs uppercase tracking-[0.3em] mb-8 text-blue-500/80">Ministère des Mines & Affaires Sociales</p>
          <div className="text-[10px] border-t border-slate-900 pt-8 uppercase tracking-widest opacity-50">
            &copy; {new Date().getFullYear()} DOT KICC RD CONGO. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;