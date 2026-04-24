"use client";
import Link from 'next/link';

import React, { useState } from 'react';
import { MapPin, ArrowLeft , CheckCircle2, Clock, Users, ArrowRight, X, Calendar, Briefcase, Info, Map as MapIcon } from 'lucide-react';

const MissionsTracker = () => {
  const [selectedMission, setSelectedMission] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const missions = [
    {
      id: 1,
      site: "Mine de Kamoto",
      zone: "Kolwezi",
      objective: "Vérification des infrastructures sociales",
      status: "En cours",
      team: 4,
      leader: "Ing. Jane J.",
      startDate: "20 Avril 2026",
      details: "Cette mission vise à auditer les écoles construites par la dotation dans la périphérie de Kolwezi. L équipe vérifie la conformité des matériaux et le raccordement électrique.",
      budget: "Financement DOT 2025",
      coords: { top: "45%", left: "35%" } // Position simulée sur la carte
    },
    {
      id: 2,
      site: "Communauté de Sakania",
      zone: "Haut-Katanga",
      objective: "Audit du nouveau centre de santé",
      status: "Terminé",
      team: 3,
      leader: "Mme Sarah S.",
      startDate: "10 Mars 2026",
      details: "Réception technique du centre de santé de référence. Tous les équipements ont été livrés et le personnel a été formé.",
      budget: "Fonds de Développement Local",
      coords: { top: "70%", left: "60%" }
    }
  ];

  return (
    <div className="relative">
      {/* SECTION PRINCIPALE */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition mb-6 font-medium w-fit">
                <ArrowLeft size={18} /> Retour à l accueil
            </Link>
            <h2 className="text-2xl font-bold text-slate-900">Missions de Terrain</h2>
            <p className="text-slate-500 text-sm">Suivi en temps réel de la coordination</p>
          </div>
          <button 
            onClick={() => setShowMap(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100 active:scale-95"
          >
            <MapIcon size={18} />
            Voir la carte
          </button>
        </div>

        <div className="space-y-4">
          {missions.map((mission) => (
            <div key={mission.id} className="group flex flex-col md:flex-row md:items-center justify-between p-5 border border-slate-50 rounded-2xl bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-blue-100 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${mission.status === 'Terminé' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600 animate-pulse'}`}>
                  {mission.status === 'Terminé' ? <CheckCircle2 size={24} /> : <Clock size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{mission.site}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {mission.zone}</span>
                    <span className="flex items-center gap-1"><Users size={14} /> {mission.team} experts</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-2 italic">{mission.objective}</p>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                 <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Départ</p>
                  <p className="text-sm font-semibold text-slate-700">{mission.startDate}</p>
                </div>
                <button 
                  onClick={() => setSelectedMission(mission)}
                  className="p-2 bg-white rounded-full border border-slate-200 text-slate-400 group-hover:text-blue-600 group-hover:border-blue-600 group-hover:bg-blue-50 transition-all shadow-sm"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE DÉTAILS (95vh) */}
      {selectedMission && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col animate-in fade-in zoom-in duration-300">
            <div className="relative p-6 bg-slate-900 text-white shrink-0">
              <button onClick={() => setSelectedMission(null)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <X size={20} />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${selectedMission.status === 'Terminé' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {selectedMission.status}
                </span>
              </div>
              <h2 className="text-2xl font-bold">{selectedMission.site}</h2>
              <p className="text-slate-400 flex items-center gap-1 mt-1 text-sm"><MapPin size={14} /> {selectedMission.zone}, RDC</p>
            </div>
            <div className="p-8 space-y-6 overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Chef de Mission</p>
                  <div className="flex items-center gap-2 text-slate-800 font-semibold"><Briefcase size={16} className="text-blue-600" />{selectedMission.leader}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Lancement</p>
                  <div className="flex items-center gap-2 text-slate-800 font-semibold"><Calendar size={16} className="text-blue-600" />{selectedMission.startDate}</div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-slate-900 font-bold mb-2"><Info size={18} className="text-blue-600" />Détails & Observations</div>
                <p className="text-slate-600 text-sm leading-relaxed bg-blue-50/30 p-5 rounded-2xl border border-blue-50">{selectedMission.details}</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Budget</p>
                  <p className="text-sm font-bold text-slate-800">{selectedMission.budget}</p>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition">Rapport complet</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY DE LA CARTE (VERSION RAPIDE) */}
      {showMap && (
        <div className="fixed inset-0 z-[80] bg-slate-100 flex flex-col animate-in slide-in-from-bottom duration-500">
          <div className="bg-white p-4 border-b border-slate-200 flex justify-between items-center px-8">
            <div>
              <h3 className="font-bold text-slate-900">Cartographie des Interventions</h3>
              <p className="text-xs text-slate-500">Visualisation géographique DOT KICC</p>
            </div>
            <button 
              onClick={() => setShowMap(false)}
              className="p-3 bg-slate-100 hover:bg-red-50 hover:text-red-600 rounded-full transition-all"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 relative bg-slate-200 overflow-hidden">
            {/* Simulation de Carte (Remplacer par une vraie carte plus tard) */}
            <div className="absolute inset-0 opacity-20 grayscale" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')"}}></div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-slate-400 text-center">
                    <MapIcon size={80} className="mx-auto mb-4 opacity-20" />
                    <p className="uppercase tracking-[0.3em] font-bold opacity-30 text-2xl text-slate-900">Grand Katanga & Lualaba</p>
                </div>
            </div>

            {/* Points de mission interactifs sur la carte */}
            {missions.map((m) => (
              <div 
                key={m.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ top: m.coords.top, left: m.coords.left }}
                onClick={() => {
                  setShowMap(false);
                  setSelectedMission(m);
                }}
              >
                <div className={`w-6 h-6 rounded-full border-4 border-white shadow-xl ${m.status === 'Terminé' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
                <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <p className="text-xs font-bold text-slate-900">{m.site}</p>
                    <p className="text-[10px] text-blue-600 font-medium">{m.zone}</p>
                </div>
              </div>
            ))}

            {/* Légende rapide */}
            <div className="absolute bottom-8 left-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest">Légende</p>
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                        <span className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" /> Mission en cours
                    </div>
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
                        <span className="w-3 h-3 bg-green-500 rounded-full" /> Mission terminée
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionsTracker;