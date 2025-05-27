'use client';
import Link from 'next/link';
import Image from 'next/image';
import ModalLogin from '../ModalLogin/ModalLogin';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { useState, useEffect, useRef } from 'react';

// Toast flotante centrado
const CenterToast = ({ show, onClose, onLogin }: { show: boolean, onClose: () => void, onLogin: () => void }) => {
  if (!show) return null;
  return (
    <div className="fixed left-1/2 top-20 z-[13000] -translate-x-1/2 flex items-start justify-center w-full pointer-events-none">
      <div className="bg-gray-900 border border-[#6F4E37] rounded-2xl shadow-2xl px-8 py-7 flex flex-col items-center gap-4 animate-pop-in pointer-events-auto">
        <span className="text-lg text-white font-semibold text-center">Debes iniciar sesión para finalizar la compra</span>
        <button
          className="bg-[#6F4E37] hover:bg-[#5a3c28] text-white font-bold py-2 px-6 rounded-xl shadow-md transition"
          onClick={onLogin}
        >
          Iniciar sesión
        </button>
        <button
          className="mt-2 text-gray-400 hover:text-white text-xs underline"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

// Modal de pago
const PaymentModal = ({ show, onClose, cart, onPay }: { show: boolean, onClose: () => void, cart: any[], onPay: () => void }) => {
  if (!show) return null;
  const total = cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  const [metodo, setMetodo] = useState('Tarjeta');
  return (
    <div className="fixed left-1/2 top-20 z-[13500] -translate-x-1/2 flex items-start justify-center w-full pointer-events-none">
      <div className="bg-[#18181b] rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center relative animate-pop-in pointer-events-auto border-2 border-[#6F4E37]">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-2xl font-bold"
          onClick={onClose}
          aria-label="Cerrar modal"
        >×</button>
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold text-[#6F4E37] mb-2 drop-shadow">Pago de tu compra</h2>
          <p className="text-gray-200 text-center">Revisa el resumen y confirma tu pago</p>
        </div>
        <div className="w-full mb-6">
          <ul className="divide-y divide-gray-700 mb-4">
            {cart.map((item, idx) => (
              <li key={idx} className="flex justify-between py-2 text-gray-100">
                <span>{item.nombre} <span className="text-xs text-gray-400">x{item.cantidad}</span></span>
                <span>${(item.precio * item.cantidad).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-lg border-t border-[#6F4E37] pt-3">
            <span className="text-gray-200">Total</span>
            <span className="text-[#6F4E37] drop-shadow-lg">${total.toFixed(2)}</span>
          </div>
        </div>
        {/* Métodos de pago */}
        <div className="w-full mb-6">
          <label className="block text-gray-200 font-semibold mb-2">Método de pago</label>
          <div className="flex gap-3 justify-center mb-4">
            <button
              className={`px-4 py-2 rounded-lg border font-bold transition-colors ${metodo === 'Tarjeta' ? 'bg-[#6F4E37] text-white border-[#6F4E37]' : 'bg-gray-800 text-gray-200 border-gray-600'}`}
              onClick={() => setMetodo('Tarjeta')}
              type="button"
            >
              Tarjeta
            </button>
            <button
              className={`px-4 py-2 rounded-lg border font-bold transition-colors ${metodo === 'PayPal' ? 'bg-blue-600 text-white border-blue-700' : 'bg-gray-800 text-gray-200 border-gray-600'}`}
              onClick={() => setMetodo('PayPal')}
              type="button"
            >
              PayPal
            </button>
            <button
              className={`px-4 py-2 rounded-lg border font-bold transition-colors ${metodo === 'Transferencia' ? 'bg-yellow-500 text-black border-yellow-600' : 'bg-gray-800 text-gray-200 border-gray-600'}`}
              onClick={() => setMetodo('Transferencia')}
              type="button"
            >
              Transferencia
            </button>
          </div>
          {/* Campos dinámicos según método de pago */}
          {metodo === 'Tarjeta' && (
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Número de tarjeta" className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-[#6F4E37] focus:outline-none focus:ring-2 focus:ring-[#6F4E37]" />
              <div className="flex gap-3">
                <input type="text" placeholder="MM/AA" className="w-1/2 px-4 py-2 rounded-lg bg-gray-800 text-white border border-[#6F4E37] focus:outline-none focus:ring-2 focus:ring-[#6F4E37]" />
                <input type="text" placeholder="CVV" className="w-1/2 px-4 py-2 rounded-lg bg-gray-800 text-white border border-[#6F4E37] focus:outline-none focus:ring-2 focus:ring-[#6F4E37]" />
              </div>
              <input type="text" placeholder="Nombre en la tarjeta" className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-[#6F4E37] focus:outline-none focus:ring-2 focus:ring-[#6F4E37]" />
            </div>
          )}
          {metodo === 'PayPal' && (
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Correo de PayPal" className="w-full px-4 py-2 rounded-lg bg-blue-100 text-blue-900 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600" />
            </div>
          )}
          {metodo === 'Transferencia' && (
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Referencia de transferencia" className="w-full px-4 py-2 rounded-lg bg-yellow-100 text-yellow-900 border border-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            </div>
          )}
        </div>
        <button
          className="w-full bg-[#6F4E37] hover:bg-[#5a3c28] text-white font-bold py-3 px-6 rounded-xl shadow-md transition text-lg"
          onClick={onPay}
        >
          Pagar ahora
        </button>
      </div>
    </div>
  );
};

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logoutModalRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);
  const [showLoginToast, setShowLoginToast] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    setUserName(null);
    setShowLogoutModal(false);
  };

  // Cerrar modal cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        logoutModalRef.current && 
        userButtonRef.current &&
        !logoutModalRef.current.contains(event.target as Node) &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setShowLogoutModal(false);
      }
    };

    if (showLogoutModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLogoutModal]);

  useEffect(() => {
    // Verifica si hay un nombre de usuario guardado en localStorage
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      setUserName(storedUser);
    }
    // Escucha cambios en localStorage desde otras pestañas
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'userName') {
        setUserName(event.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  interface CartProduct {
     nombre: string;
     precio: number;
     categoria: string;
     subcategoria: string;
     imagenes: string[];
     cantidad: number;
   }
   const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    const updateCartCount = () => {
      const userId = localStorage.getItem('userId') || 'guest';
      const cartKey = `cart_${userId}`;
      const cartObj = JSON.parse(localStorage.getItem(cartKey) || '{"userId":"' + userId + '","products":[]}');
      const products = Array.isArray(cartObj.products) ? cartObj.products : [];
      const totalCount = products.reduce((sum: number, item: CartProduct) => sum + (item.cantidad || 1), 0);
      setCartCount(totalCount);
    };
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  useEffect(() => {
    const updateCart = () => {
      const userId = localStorage.getItem('userId') || 'guest';
      const cartKey = `cart_${userId}`;
      const cartObj = JSON.parse(localStorage.getItem(cartKey) || '{"userId":"' + userId + '","products":[]}');
      const products = Array.isArray(cartObj.products) ? cartObj.products : [];
      setCart(products);
    };
    updateCart();
    window.addEventListener('storage', updateCart);
    return () => {
      window.removeEventListener('storage', updateCart);
    };
  }, [showCart]);

  useEffect(() => {
    // Cerrar el toast de login si se abre el modal de login
    const closeAll = () => setShowLoginToast(false);
    window.addEventListener('closeAllModals', closeAll);
    return () => {
      window.removeEventListener('closeAllModals', closeAll);
    };
  }, []);

  const handlePagoExitoso = () => {
    Swal.fire({
      icon: 'success',
      title: '¡Pago realizado con éxito!',
      text: 'Gracias por tu compra.',
      showConfirmButton: false,
      timer: 2000,
      background: '#18181b',
      color: '#fff',
      customClass: {
        popup: 'rounded-3xl shadow-2xl',
        title: 'text-[#6F4E37]',
        icon: 'text-[#6F4E37]',
      },
      didOpen: (popup) => {
        popup.classList.add('animate-pop-in');
      }
    });
    // Limpiar carrito
    const userId = localStorage.getItem('userId') || 'guest';
    const cartKey = `cart_${userId}`;
    let cartObj = JSON.parse(localStorage.getItem(cartKey) || `{"userId":"${userId}","products":[]}`);
    cartObj.products = [];
    localStorage.setItem(cartKey, JSON.stringify(cartObj));
    window.dispatchEvent(new Event('cartUpdated'));
    setCart([]);
    setShowPaymentModal(false);
  };

  return (
    <header className="fixed top-0 w-full bg-transparent backdrop-blur-sm z-50 transition-all duration-300 hover:bg-black/40 animate-fade-in">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2 transform hover:scale-105 transition-transform">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/cafemejorado.jpg" alt="Logo Café" width={60} height={60} className="rounded-full shadow-lg transition-transform duration-300 hover:scale-110" />
              <span className="text-2xl font-bold text-white">Café por Siempre</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">

          <button className="relative flex items-center bg-yellow-600 rounded-full shadow-lg p-3 cursor-pointer hover:bg-yellow-700 transition-colors" onClick={() => setShowCart(true)}>
        <ShoppingCartIcon className="w-6 h-6 text-white" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-yellow-600 rounded-full px-2 text-xs font-bold border border-yellow-600">
            {cartCount}
          </span>
        )}
      </button>



            {/* Sidebar cart */}
            {showCart && (
              <div className="fixed left-0 right-0 z-[12000] flex justify-center" style={{top: '72px'}}>
                <div className="fixed inset-0 bg-black bg-opacity-70 z-[11999]" onClick={() => setShowCart(false)}></div>
                <div
                  className="relative w-full max-w-4xl mx-auto bg-gray-950 max-h-[95vh] shadow-2xl rounded-2xl p-10 flex flex-col items-center justify-center animate-fade-in border-4 border-gray-800 z-[12001]"
                  style={{
                    position: "relative",
                    minHeight: "70vh"
                  }}
                >
                  <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-200 text-2xl font-bold" onClick={() => setShowCart(false)} aria-label="Cerrar carrito">×</button>
                  <h2 className="text-4xl font-extrabold mb-8 text-gray-100 text-center sticky top-0 bg-gray-950 z-10 w-full py-2">Carrito de Compras</h2>
                  <div className="flex-1 w-full pb-8 overflow-y-auto" style={{maxHeight: '60vh'}}>
                    {cart.length === 0 ? (
                      <p className="text-gray-400 text-center text-lg">El carrito está vacío.</p>
                    ) : (
                      <>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 mt-8">
                        {cart.map((item, idx) => (
                          <li key={idx} className="flex flex-col md:flex-row items-center bg-gray-900 rounded-xl shadow p-6 gap-6 relative text-white border border-gray-800">
                            <img src={item.imagenes?.[0] || '/file.svg'} alt={item.nombre} className="w-32 h-32 object-cover rounded-xl border-2 border-gray-700" />
                            <div className="flex-1 flex flex-col items-center md:items-start">
                              <div className="font-bold text-xl mb-2 text-gray-100">{item.nombre}</div>
                              <div className="text-gray-300 font-bold text-lg mb-1">${item.precio}</div>
                              <div className="text-xs text-gray-400 mb-1">{item.categoria} / {item.subcategoria}</div>
                              <div className="text-sm text-gray-300 mb-1">Cantidad: <span className="font-semibold">{item.cantidad}</span></div>
                              <button
                                className="mt-4 flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors"
                                onClick={() => {
                                  const userId = localStorage.getItem('userId') || 'guest';
                                  const cartKey = `cart_${userId}`;
                                  let cartObj = JSON.parse(localStorage.getItem(cartKey) || '{"userId":"' + userId + '","products":[]}');
                                  cartObj.products = cartObj.products.filter((_, i) => i !== idx);
                                  localStorage.setItem(cartKey, JSON.stringify(cartObj));
                                  window.dispatchEvent(new Event('cartUpdated'));
                                  setCart(cartObj.products);
                                }}
                                aria-label="Eliminar producto"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                <span>Eliminar</span>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                      </>
                    )}
                  </div>
                  {cart.length > 0 && (
                    <footer className="sticky bottom-0 left-0 right-0 w-full bg-gray-950 border-t border-gray-800 rounded-b-2xl shadow-lg z-[12002] flex flex-col md:flex-row md:justify-end gap-4 p-6">
                      <div className="flex-1 flex items-center justify-between md:justify-end mb-4 md:mb-0">
                        <span className="text-lg font-bold text-gray-200 mr-4">Total:</span>
                        <span className="text-2xl font-extrabold text-green-400 drop-shadow-lg">${cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0).toFixed(2)}</span>
                      </div>
                      <button
                        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors"
                        onClick={() => {
                          const userId = localStorage.getItem('userId') || 'guest';
                          if (!userId || userId === 'guest') {
                            setShowLoginToast(true);
                            return;
                          }
                          setShowPaymentModal(true);
                        }}
                      >
                        Finalizar compra
                      </button>
                    </footer>
                  )}
                </div>
              </div>
            )}

            <Link href="/" className="text-white/80 hover:text-white transition-colors">
              Inicio
            </Link>
            <Link href="/productos" className="text-white/80 hover:text-white transition-colors">
              Productos
            </Link>
            <Link href="/nosotros" className="text-white/80 hover:text-white transition-colors">
              Nosotros
            </Link>
            <Link href="/contacto" className="text-white/80 hover:text-white transition-colors">
              Contacto
            </Link>

            {userName ? (
              <div className="relative">
                <button
                  ref={userButtonRef}
                  className="rainbow-border-user px-4 py-2 rounded-lg font-semibold shadow-lg animate-fade-in bg-black/80 border-2 border-transparent hover:opacity-90 transition-all flex items-center space-x-2"
                  onClick={() => setShowLogoutModal(!showLogoutModal)}
                >
                  <span className="rainbow-text">{userName}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${showLogoutModal ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showLogoutModal && (
                  <div 
                    ref={logoutModalRef}
                    className="absolute right-0 mt-2 w-40 bg-black/90 border border-white/20 rounded-lg shadow-lg z-50 animate-fade-in backdrop-blur-sm"
                  >
                    <button
                      className="w-full px-4 py-2 text-left text-white hover:bg-white/10 rounded-lg transition-colors flex items-center space-x-2"
                      onClick={handleLogout}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Cerrar sesión</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                className="button"
                onClick={() => setIsLoginModalOpen(true)}
              >
                <div className="label">Inicio de sesión</div>
                <div className="gradient-container">
                  <div className="gradient"></div>
                </div>
              </button>
            )}
            <ModalLogin 
              isOpen={isLoginModalOpen} 
              onClose={() => setIsLoginModalOpen(false)}
              setUserName={setUserName}
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

      <CenterToast
        show={showLoginToast}
        onClose={() => setShowLoginToast(false)}
        onLogin={() => {
          setShowLoginToast(false);
          setIsLoginModalOpen(true);
        }}
      />
      <PaymentModal
        show={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        cart={cart}
        onPay={handlePagoExitoso}
      />

      {/* Estilos extra */}
      <style jsx>{`
        @keyframes rainbow-slide {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        @keyframes rotate {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        /* Estilo para el botón del usuario logueado */
        .rainbow-border-user {
          position: relative;
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          background-clip: padding-box;
          overflow: visible;
        }

        .rainbow-text {
          background: linear-gradient(
            90deg,
            hsl(220,100%,50%), 
            hsl(250,100%,50%), 
            hsl(280,100%,50%), 
            hsl(320,100%,50%), 
            hsl(360,100%,50%), 
            hsl(40,100%,50%), 
            hsl(80,100%,50%), 
            hsl(120,100%,50%),
            hsl(220,100%,50%), 
            hsl(250,100%,50%)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          font-weight: bold;
          background-size: 200% 100%;
          animation: rainbow-slide 3s linear infinite;
        }

        /* Estilos para el botón de login */
        .button {
          border: none;
          outline: none;
          background-color: #000000;
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
          background: conic-gradient(
            from 0deg,
            hsl(220, 100%, 50%),
            hsl(250, 100%, 50%),
            hsl(280, 100%, 50%),
            hsl(320, 100%, 50%),
            hsl(360, 100%, 50%),
            hsl(40, 100%, 50%),
            hsl(80, 100%, 50%),
            hsl(120, 100%, 50%),
            hsl(220, 100%, 50%)
          );
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
          position: relative;
          z-index: 1;
        }

        .button:hover .gradient-container {
          transform: translate(-50%, -50%) scale(0.98);
          filter: blur(5px);
        }

        .button:hover .gradient {
          filter: blur(5px);
        }

        /* Animación de fade-in mejorada */
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;

