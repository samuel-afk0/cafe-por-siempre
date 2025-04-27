'use client';
import Link from 'next/link';
import Image from 'next/image';
import ModalLogin from '../ModalLogin/ModalLogin';

import { useState } from 'react';

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <header className="fixed top-0 w-full bg-transparent backdrop-blur-sm z-50 transition-all duration-300 hover:bg-black/40 animate-fade-in">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2 transform hover:scale-105 transition-transform">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/coffee-logo.svg" alt="Logo Café" width={40} height={40} className="animate-splash" />
              <span className="text-2xl font-bold text-white">Café por Siempre</span>
            </Link>
          </div>

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

            <button 
              className="button"
              onClick={() => setIsLoginModalOpen(true)}
            >
              <div className="label">Inicio de sesión</div>
              <div className="gradient-container">
                <div className="gradient"></div>
              </div>
            </button>
            <ModalLogin 
              isOpen={isLoginModalOpen} 
              onClose={() => setIsLoginModalOpen(false)}
            />
          </div>

          {/* Botón hamburguesa (mobile) */}
          <button className="md:hidden text-white/80 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>

      {/* Estilos extra */}
      <style jsx>{`
        @keyframes rotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        .button {
          border: none;
          outline: none;
          background-color: #000000; /* Cambié el color de fondo a negro */
          width: 140px;
          height: 50px;
          font-size: 18px;
          color: #fff;
          font-weight: 600;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          position: relative;
          transition: all 0.3s;
        }

        .button::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          width: 106%;
          height: 120%;
          z-index: -1;
          border-radius: inherit;
          transition: all 0.3s;
        }

        .gradient-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 106%;
          height: 115%;
          overflow: hidden;
          border-radius: inherit;
          z-index: -2;
          filter: blur(10px);
          transition: all 0.3s;
        }

        .gradient {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 110%;
          aspect-ratio: 1;
          border-radius: 100%;
          transition: all 0.3s;
          background-image: linear-gradient(
            90deg,
            hsl(220, 100%, 50%),
            hsl(250, 100%, 50%),
            hsl(280, 100%, 50%),
            hsl(320, 100%, 50%),
            hsl(360, 100%, 50%),
            hsl(40, 100%, 50%),
            hsl(80, 100%, 50%),
            hsl(120, 100%, 50%)
          ); /* Colores más vivos */
          animation: rotate 2s linear infinite;
          filter: blur(10px);
        }

        .label {
          width: 156px;
          height: 45px;
          text-align: center;
          line-height: 45px;
          border-radius: 22px;
          background-color: black;
          
        }

        .button:hover .gradient-container {
          transform: translate(-50%, -50%) scale(0.98);
          filter: blur(5px);
        }

        .button:hover .gradient {
          filter: blur(5px);
        }
      `}</style>
    </header>
  );
};

export default Header;
