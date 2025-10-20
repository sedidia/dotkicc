import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-600">Page non trouvée</h2>
      <p className="mt-2 text-lg text-gray-500">La page que vous recherchez n'existe pas.</p>
      <Link href="/">
        <a className="mt-6 px-4 py-2 text-lg text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-300">
          Retour à l'accueil
        </a>
      </Link>
    </div>
  );
}