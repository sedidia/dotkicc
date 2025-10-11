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
      <Carousel style={{ height: '80vh' }}>
        <CarouselItem>
          {/* Remplacé <img> par <Image> et ajouté des props requises (width, height, priority) */}
          <Image
            className="d-block w-100"
            src="/mission.jpg"
            alt="Slide 1"
            width={100}
            height={100}
            priority // Pour le premier carrousel, afin d'assurer un chargement rapide
          />
          <CarouselCaption> 
            <h3>Slide 1</h3>
            <p>Ceci est le premier slide.</p>
          </CarouselCaption>
        </CarouselItem>
        <CarouselItem>
          <Image
            className="d-block w-100"
            src="/mission.jpg"
            alt="Slide 2"
            width={100}
            height={100}
          />
          <CarouselCaption>
            <h3>Slide 2</h3>
            <p>Ceci est le deuxième slide.</p>
          </CarouselCaption>
        </CarouselItem>
        <CarouselItem>
          <Image
            className="d-block w-100"
            src="/mission.jpg"
            alt="Slide 3"
            width={100}
            height={100}
          />
          <CarouselCaption>
            <h3>Slide 3</h3>
            <p>Ceci est le troisième slide.</p>
          </CarouselCaption>
        </CarouselItem>
      </Carousel>

      {/* Corps de page */}
      <div className="container mt-5">
        <h1>Bienvenue sur mon site</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
        </p>
      </div>

      {/* Pied de page */}
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          <span className="text-muted">
            &copy; 2023 Mon site. Tous droits réservés.
          </span>
        </div>
      </footer>
    </div>
  );
}