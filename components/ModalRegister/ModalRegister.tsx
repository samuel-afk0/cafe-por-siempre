'use client';
import { useState, useEffect } from 'react';

type ModalRegisterProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalRegister = ({ isOpen, onClose }: ModalRegisterProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerMessage, setRegisterMessage] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterMessage(null);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (data.success) {
        setRegisterMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setRegisterSuccess(true);
        setTimeout(() => {
          setRegisterMessage(null);
          handleClose();
        }, 1500);
      } else {
        setRegisterMessage(data.message || 'Error al registrar');
        setRegisterSuccess(false);
      }
    } catch {
      setRegisterMessage('Error en el servidor');
      setRegisterSuccess(false);
    }
  };

  const handleClose = () => {
    setAnimationState('exiting');
    setTimeout(() => {
      onClose();
      setUsername('');
      setEmail('');
      setPassword('');
    }, 300);
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
          <h2 className="text-2xl font-bold text-white">Registrarse</h2>
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
          {registerMessage && (
            <div className={`text-center p-2 rounded-md mb-2 ${registerSuccess ? 'bg-[#6F4E37] text-white' : 'bg-[#6F4E37] text-white'}`}>{registerMessage}</div>
          )}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Nombre de usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
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
            disabled={registerSuccess}
            style={{ display: registerSuccess ? 'none' : 'block' }}
          >
            Registrarse
          </button>
          {registerSuccess && (
            <div className="w-full text-center py-2 px-4 rounded-md bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold text-lg mt-2 shadow-md">
              ¡Registro exitoso!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ModalRegister;