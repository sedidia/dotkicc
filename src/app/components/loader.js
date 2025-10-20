// components/Loader.jsx

const Loader = () => {
  return (
    // Conteneur centré sur toute la page ou dans une section
    <div className="flex justify-center items-center h-screen w-full">
      {/* Un cercle simple qui tourne.
        - animate-spin : Utilise l'utilitaire d'animation de Tailwind.
        - border-4 : Épaisseur de la bordure.
        - border-blue-500 : Couleur visible de la bordure.
        - border-t-transparent : Rend le haut de la bordure transparent pour l'effet de rotation.
      */}
      <div 
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"
        role="status"
        aria-label="Chargement en cours"
      >
        {/* Un élément span pour les lecteurs d'écran, caché visuellement */}
        <span className="sr-only">Chargement...</span>
      </div>
    </div>
  );
};

export default Loader;