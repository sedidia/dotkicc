// app/page.js

'use client'; // 👈 CORRECTION CLÉ : Indique à Next.js qu'il s'agit d'un Client Component


import Link from 'next/link';
import Image from 'next/image'; // 👈 OPTIMISATION : Importation du composant Image de Next.js
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