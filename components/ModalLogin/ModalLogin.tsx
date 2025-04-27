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

  // Lógica para manejar el inicio de sesión con Facebook
  const handleFacebookLogin = () => {
    const appId = "683751031267238";  // Reemplaza con tu ID de aplicación de Facebook
    const redirectUri = "https://cafe-por-siempre.vercel.app/"; // El URI al que Facebook redirigirá después de la autenticación.
    const facebookAuthUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&scope=email,public_profile&response_type=code`;

    // Abre la URL de autorización de Facebook en una nueva ventana o navegador
    window.location.href = facebookAuthUrl;
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
            onClick={handleFacebookLogin}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-2 px-4 rounded-md hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10zM12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm.7 11h-1.4v-3.3h1.4V15zm0-4.6h-1.4V7.6h1.4v3.8z" />
            </svg>
            <span>Iniciar Sesión con Facebook</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;
