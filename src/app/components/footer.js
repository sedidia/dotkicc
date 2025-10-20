// components/Footer.jsx

const Footer = () => {
  return (
    // Conteneur centré sur toute la page ou dans une section
    <footer className="bg-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
        &copy; {new Date().getFullYear()} DOT KICC. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;