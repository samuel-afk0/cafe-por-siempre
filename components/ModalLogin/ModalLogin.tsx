'use client';
import { useState, useEffect } from 'react';
import ModalRegister from '../ModalRegister/ModalRegister';

declare global {
  interface Window {
    openLoginModal?: () => void;
  }
}

type ModalLoginProps = {
  isOpen: boolean;
  onClose: () => void;
  setUserName?: (name: string) => void;
};

const ModalLogin = ({ isOpen, onClose, setUserName }: ModalLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>('exited');
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [modalUserName, setModalUserName] = useState<string | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setAnimationState('entering');
      setTimeout(() => setAnimationState('entered'), 300);
    } else if (animationState !== 'exited') {
      setAnimationState('exiting');
      setTimeout(() => setAnimationState('exited'), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    window.openLoginModal = () => {
      // Cierra todos los demás modales
      window.dispatchEvent(new Event('closeAllModals'));
      if (!isOpen) onClose();
      setTimeout(() => {
        if (!isOpen) onClose();
      }, 10);
    };
    return () => {
      if (window.openLoginModal) delete window.openLoginModal;
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Clear previous user data
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setLoginMessage('¡Inicio de sesión exitoso!');
        setLoginSuccess(true);
        setModalUserName(data.user.username);
        if (setUserName) setUserName(data.user.username);
        setUserNameLocal(data.user.username, data.user.id);
        setTimeout(() => {
          setLoginMessage(null);
          handleClose();
        }, 1500);
      } else {
        setLoginMessage(data.message || 'Credenciales inválidas');
        setLoginSuccess(false);
      }
    } catch {
      setLoginMessage('Error en el servidor');
      setLoginSuccess(false);
    }
  };

  // Guarda el nombre de usuario y el id en localStorage
  const setUserNameLocal = (name: string, id: string) => {
    localStorage.setItem('userName', name);
    localStorage.setItem('userId', id);
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
 

  if (animationState === 'exited') return null;

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center z-[14000] transition-all duration-500 ${animationState === 'entering' || animationState === 'entered' ? 'bg-black/50 backdrop-blur-sm opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'}`} 
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
          {loginMessage && (
            <div className={`text-center p-2 rounded-md mb-2 ${loginSuccess ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{loginMessage}</div>
          )}
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
            disabled={loginSuccess}
            style={{ display: loginSuccess ? 'none' : 'block' }}
          >
            Iniciar Sesión
          </button>
          {loginSuccess && modalUserName && (
            <div className="w-full text-center py-2 px-4 rounded-md bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold text-lg mt-2 shadow-md">
              Bienvenido, {modalUserName}
            </div>
          )}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-700"></div>
            <span className="px-3 text-sm text-gray-500">o</span>
            <div className="flex-grow h-px bg-gray-700"></div>
          </div>
          <button
            type="button"
            onClick={() => setIsRegisterModalOpen(true)}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
          >
            Registrarse
          </button>
        </form>
        {isRegisterModalOpen && (
          <ModalRegister isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default ModalLogin;
