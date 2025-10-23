// Ce composant est compatible avec les Server Components (RSC) car il n'utilise
// aucun hook React (useState, useEffect) pour la gestion de l'état du menu.
// L'interaction est gérée par le "Checkbox Hack" en CSS.

// Simuler les liens de navigation (remplacez par vos propres données)
const navItems = [
    { name: 'Tableau de Bord', href: '#dashboard' },
    { name: 'Activités', href: '#activities' },
    { name: 'Utilisateurs', href: '#users' },
    { name: 'Paramètres', href: '#settings' },
];

// Icônes Lucide-React (supposées disponibles ou à remplacer par des SVGs inline)
const MenuIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

const XIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

// Composant Link simulé pour Next.js (remplacez par l'importation réelle si nécessaire)
const Link = ({ href, className, children }) => <a href={href} className={className}>{children}</a>;


export default function ResponsiveNavbar() {
    // L'input invisible sert d'état (Checkbox Hack)
    return (
        <nav className="sticky top-0 z-[100] bg-white shadow-lg font-['Inter']">
            
            {/* 1. L'état CSS (Checkbox) : Caché et devient le "pair" des labels */}
            <input 
                type="checkbox" 
                id="mobile-menu-toggle" 
                className="peer hidden" 
                aria-hidden="true"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Nom de l'application / Logo */}
                    <Link key="+" href="/" className="text-gray-600 hover:text-indigo-700 font-semibold transition duration-200 py-2 px-3 no-underline">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-indigo-600">
                          DOT KICC
                        </span>
                      </div>
                    </Link>

                    {/* 2. Menu Desktop (Visible sur PC, caché sur mobile) */}
                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link 
                                key={item.name} 
                                href={item.href} 
                                className="text-gray-600 hover:text-indigo-700 font-semibold transition duration-200 py-2 rounded-md px-3"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* 3. Bouton Hamburger Mobile (Visible seulement sur mobile) */}
                    <div className="md:hidden">
                        {/* Le Label ouvre le menu en cochant la checkbox */}
                        <label 
                            htmlFor="mobile-menu-toggle" 
                            className="inline-flex items-center justify-center p-2 rounded-full text-indigo-600 hover:bg-indigo-50 focus:outline-none transition duration-150 cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            <MenuIcon className="h-6 w-6" />
                        </label>
                    </div>

                </div>
            </div>
            
            {/* 4. Le Menu Coulissant (Mobile Drawer) */}
            
            {/* Overlay sombre : Clic ferme le menu */}
            <label 
                htmlFor="mobile-menu-toggle" 
                className="fixed inset-0 bg-black/50 z-[90] 
                           md:hidden transition-opacity duration-300 pointer-events-none opacity-0
                           peer-checked:opacity-100 peer-checked:pointer-events-auto"
                aria-label="Fermer le menu"
            />

            {/* Le tiroir lui-même : Utilise peer-checked pour l'animation de translation */}
            <div 
                className="fixed inset-y-0 left-0 h-full w-64 bg-white shadow-2xl overflow-y-auto z-[95] 
                           transform transition-transform duration-300 ease-in-out 
                           -translate-x-full 
                           peer-checked:translate-x-0 md:hidden p-4"
                role="dialog"
                aria-modal="true"
            >
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <span className="text-xl font-bold text-indigo-700">LA DOT KICC</span>
                    
                    {/* Bouton de fermeture (X) */}
                    <label 
                        htmlFor="mobile-menu-toggle" 
                        className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition duration-150 cursor-pointer"
                        aria-label="Fermer"
                    >
                        <XIcon className="h-6 w-6" />
                    </label>
                </div>
                
                {/* Liens du Menu Mobile */}
                <div className="flex flex-col space-y-2">
                    {navItems.map((item) => (
                        <Link 
                            key={item.name} 
                            href={item.href}
                            // Le label permet de fermer le tiroir après le clic
                            className="w-full text-left px-4 py-2 text-base font-medium text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition duration-150"
                        >
                                {item.name}
                            {/* <label htmlFor="mobile-menu-toggle" className="block w-full cursor-pointer">
                            </label> */}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}