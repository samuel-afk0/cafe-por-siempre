'use client';
import { useState, useEffect } from 'react';

type ModalLoginProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalLogin = ({ isOpen, onClose }: ModalLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>('exited');
  
  useEffect(() => {
    if (isOpen) {
      setAnimationState('entering');
      setTimeout(() => setAnimationState('entered'), 300);
    } else if (animationState !== 'exited') {
      setAnimationState('exiting');
      setTimeout(() => setAnimationState('exited'), 300);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de inicio de sesión aquí
    console.log({ email, password });
    handleClose();
  };
  
  const handleClose = () => {
    setAnimationState('exiting');
    setTimeout(() => {
      onClose();
      setEmail('');
      setPassword('');
    }, 300);
  };

  // Lógica para manejar el inicio de sesión con Instagram
  const handleInstagramLogin = () => {
    const clientId = "1709742513239481"; // Asegúrate de reemplazarlo con tu ID de cliente real.
    const redirectUri = "https://cafe-por-siempre.vercel.app/"; // El URI al que Instagram redirigirá después de la autenticación.
    const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;

    // Abre la URL de autorización de Instagram en una nueva ventana o navegador
    window.location.href = instagramAuthUrl;
  };

  if (animationState === 'exited') return null;

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-500 ${animationState === 'entering' || animationState === 'entered' ? 'bg-black/50 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}`} 
      style={{ height: '100vh' }}
      onClick={handleClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-md p-8 rounded-xl border border-gray-700 max-w-md w-full mx-4 transition-all duration-500 ${animationState === 'entering' || animationState === 'entered' ? 'opacity-100 scale-100 shadow-[0_0_25px_rgba(139,92,246,0.3)]' : 'opacity-0 scale-90'}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Iniciar Sesión</h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
          >
            Iniciar Sesión
          </button>
          
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-700"></div>
            <span className="px-3 text-sm text-gray-500">o</span>
            <div className="flex-grow h-px bg-gray-700"></div>
          </div>
          
          <button
            type="button"
            onClick={handleInstagramLogin}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-2 px-4 rounded-md hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span>Iniciar Sesión con Instagram</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;
