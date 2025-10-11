// app/page.js

'use client'; // 👈 CORRECTION CLÉ : Indique à Next.js qu'il s'agit d'un Client Component


// import Link from 'next/link';
// import Image from 'next/image'; // 👈 OPTIMISATION : Importation du composant Image de Next.js
import { Carousel, CarouselItem, CarouselCaption } from 'react-bootstrap'; // 👈 Amélioration de l'importation

export default function HomePage() {
  return (
    <div>
      {/* Menu (Composants clients par nature, mais inclus dans un composant parent client) */}
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">DOT KICC</a>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>

      {/* Carrousel (Composant client de react-bootstrap) */}
      <Carousel>
        <CarouselItem>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                
                <div className="card bg-info text-white text-center">
                  
                  <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    
                    <h5 className="card-title">NOTRE ENTREPRISE</h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
                    </p>
                    <a href="#" className="btn btn-primary">Action</a>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                
                <div className="card bg-info text-white text-center">
                  
                  <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    
                    <h5 className="card-title">NOTRE EQUIPE</h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
                    </p>
                    <a href="#" className="btn btn-primary">Action</a>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                
                <div className="card bg-info text-white text-center">
                  
                  <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    
                    <h5 className="card-title">NOTRE MISSION</h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
                    </p>
                    <a href="#" className="btn btn-primary">Action</a>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
      </Carousel>

      {/* Corps de page */}
      <div className="container mt-5">
        <h1>Bienvenue sur DOT KICC</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
        </p>
      </div>

      <div className="container mt-5">
        <h2 className="mb-4 text-center">Statistiques Clés</h2>
        
        <div className="row g-4">
            
            <div className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-primary">
                    <div className="card-body">
                        <h5 className="card-title text-primary">Dernière Activité</h5>
                        <p className="card-text text-muted">
                            <i className="bi bi-calendar-check me-2"></i> envoi de membres en mission.
                        </p>
                        <p className="card-text"><small className="text-success">Terminée le 10/10/2025</small></p>
                    </div>
                </div>
            </div>
            
            <div className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm border-warning">
                    <div className="card-body">
                        <h5 className="card-title text-warning">Prochaine Réunion</h5>
                        <p className="card-text text-muted">
                            <i className="bi bi-clock me-2"></i> Stratégie Marketing Q4.
                        </p>
                        <p className="card-text"><small className="text-danger">Prévue pour le 25/10/2025</small></p>
                    </div>
                </div>
            </div>
            
            <div className="col-12 col-md-12 col-lg-4">
                <div className="card h-100 shadow-sm border-success">
                    <div className="card-body text-center d-flex flex-column justify-content-center">
                        <h5 className="card-title text-success">Chiffre d&apos;'Affaires (Octobre)</h5>
                        <p className="card-text fs-1 fw-bold text-dark">
                            $ 150 000
                        </p>
                        <p className="card-text"><small className="text-muted">Objectif atteint à 95%</small></p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>

      {/* Pied de page */}
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          <span className="text-muted">
            &copy; 2025 DOT KICC. Tous droits réservés.
          </span>
        </div>
      </footer>
    </div>
  );
}