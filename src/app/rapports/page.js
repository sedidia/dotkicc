"use client";

import React, { useState } from 'react';
import { FileText, Download, Search, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mise à jour avec les noms de fichiers réels dans /public/rapports/
  const allReports = [
    {
      id: 1,
      title: "Session decembre 2025",
      description: "Suivi des projets communautaires dans le secteur de Balamba et Kasumbalesa.",
      year: "2025",
      size: "509 Ko",
      category: "Impact Social",
      fileName: "/session_decembre_2025.pdf" // Nom exact du fichier dans public/rapports/
    },
  ];

  const filteredReports = allReports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.year.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-6">
        
        {/* En-tête */}
        <div className="max-w-4xl mx-auto mb-12">
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition mb-6 font-medium w-fit">
            <ArrowLeft size={18} /> Retour à l accueil
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Bibliothèque de Rapports</h1>
          <p className="text-slate-600 leading-relaxed">
            Consultez et téléchargez les documents officiels de la <strong>DOT KICC</strong>. 
            Tous nos rapports sont disponibles en accès libre pour garantir une transparence totale.
          </p>
        </div>

        {/* Recherche */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Rechercher par année ou mot-clé..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Liste des rapports */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div 
                key={report.id} 
                className="group bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <FileText size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded tracking-wider">
                        {report.year}
                      </span>
                      <span className="text-xs text-blue-600 font-semibold italic">
                        {report.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {report.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                      {report.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-right hidden md:block">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Taille</p>
                    <p className="text-sm font-medium text-slate-700">{report.size}</p>
                  </div>
                  
                  {/* Le bouton est maintenant un lien de téléchargement réel */}
                  <a 
                    href={`/rapports/${report.fileName}`}
                    download={report.fileName}
                    className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all shadow-sm active:scale-95 w-full md:w-auto"
                  >
                    <Download size={18} />
                    <span className="font-medium">Télécharger</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
              <Search size={40} className="text-slate-200 mx-auto mb-4" />
              <h3 className="text-slate-900 font-bold">Aucun document trouvé</h3>
              <p className="text-slate-500 text-sm">Ajustez votre recherche pour trouver le rapport souhaité.</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="max-w-4xl mx-auto mt-16 text-center border-t border-slate-200 pt-8">
          <div className="inline-flex items-center gap-2 text-slate-400 text-xs uppercase tracking-[0.2em] mb-4">
            <Calendar size={14} /> Mis à jour le {new Date().toLocaleDateString('fr-FR')}
          </div>
          <p className="text-slate-400 text-[10px] uppercase tracking-widest">
            Documents officiels • République Démocratique du Congo
          </p>
        </div>

      </div>
    </div>
  );
};

export default ReportsPage;