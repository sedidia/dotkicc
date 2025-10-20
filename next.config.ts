import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
// };

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... vos autres configurations
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co', // 👈 Ajoutez le domaine ici (ex: via.placeholder.com)
        // hostname: '/**', // 👈 Ajoutez le domaine ici (ex: via.placeholder.com)
        port: '',
        pathname: '/**', // Autorise n'importe quel chemin sur ce domaine
      },
    ],
  },
};

module.exports = nextConfig;