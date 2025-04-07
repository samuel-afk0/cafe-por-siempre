import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-transparent backdrop-blur-sm z-50 transition-all duration-300 hover:bg-black/40 animate-fade-in">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 transform hover:scale-105 transition-transform">
            <Image src="/coffee-logo.svg" alt="Logo Café" width={40} height={40} className="animate-splash" />
            <span className="text-2xl font-bold text-white">Café por Siempre</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white/80 hover:text-white transition-colors">
              Inicio
            </Link>
            <Link href="/menu" className="text-white/80 hover:text-white transition-colors">
              Menú
            </Link>
            <Link href="/nosotros" className="text-white/80 hover:text-white transition-colors">
              Nosotros
            </Link>
            <Link href="/contacto" className="text-white/80 hover:text-white transition-colors">
              Contacto
            </Link>
          </div>
          
          <button className="md:hidden text-white/80 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;