import { FaFacebookF, FaTiktok, FaXTwitter } from "react-icons/fa6";

const SocialShowcase = () => {
  return (
    <div className="relative py-20 bg-black flex flex-col items-center overflow-hidden">
      {/* Partículas animadas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Facebook particles */}
        <div className="absolute left-1/4 top-1/3 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl animate-pulse-slow shadow-blue-500/40" />
        {/* TikTok particles */}
        <div className="absolute right-1/4 top-1/2 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse-slow shadow-pink-500/40" />
        <div className="absolute right-1/3 bottom-1/4 w-20 h-20 bg-cyan-400/20 rounded-full blur-2xl animate-pulse shadow-cyan-400/40" />
        {/* X particles */}
        <div className="absolute left-1/3 bottom-1/4 w-28 h-28 bg-gray-400/20 rounded-full blur-2xl animate-pulse shadow-gray-400/40" />
      </div>
      <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-10 z-10 drop-shadow-lg text-center">
        Síguenos en nuestras redes sociales
      </h3>
      <div className="flex gap-12 z-10">
        {/* Facebook */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center"
        >
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-blue-400 text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity">Facebook</span>
          <div className="relative flex items-center justify-center">
            <span className="rainbow-fb absolute inset-0 rounded-2xl z-0" />
            <div className="bg-black p-8 rounded-2xl shadow-2xl border-2 border-blue-700 relative z-10 flex items-center justify-center">
              <FaFacebookF className="text-white text-5xl drop-shadow-glow-blue animate-glow" />
            </div>
          </div>
        </a>
        {/* TikTok */}
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center"
        >
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-pink-400 text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity">TikTok</span>
          <div className="relative flex items-center justify-center">
            <span className="rainbow-tt absolute inset-0 rounded-2xl z-0" />
            <div className="bg-black p-8 rounded-2xl shadow-2xl border-2 border-pink-500 relative z-10 flex items-center justify-center">
              <FaTiktok className="text-white text-5xl drop-shadow-glow-tiktok animate-glow" />
            </div>
          </div>
        </a>
        {/* X */}
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex flex-col items-center"
        >
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-gray-300 text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity">X</span>
          <div className="relative flex items-center justify-center">
            <span className="rainbow-x absolute inset-0 rounded-2xl z-0" />
            <div className="bg-black p-8 rounded-2xl shadow-2xl border-2 border-gray-400 relative z-10 flex items-center justify-center">
              <FaXTwitter className="text-white text-5xl drop-shadow-glow-x animate-glow" />
            </div>
          </div>
        </a>
      </div>
      {/* Animaciones personalizadas */}
      <style jsx>{`
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }
        @keyframes glow {
          from { filter: drop-shadow(0 0 10px #fff); }
          to { filter: drop-shadow(0 0 30px #fff); }
        }
        .drop-shadow-glow-blue {
          filter: drop-shadow(0 0 16px #3b82f6);
        }
        .drop-shadow-glow-tiktok {
          filter: drop-shadow(0 0 16px #ec4899) drop-shadow(0 0 8px #06b6d4);
        }
        .drop-shadow-glow-x {
          filter: drop-shadow(0 0 16px #d1d5db);
        }
        .rainbow-fb {
          background: conic-gradient(
            from 0deg,
            #2563eb 0%, #3b82f6 30%, #60a5fa 60%, #2563eb 100%
          );
          filter: blur(6px) brightness(1.2);
          animation: rainbow-spin 3s linear infinite;
        }
        .rainbow-tt {
          background: conic-gradient(
            from 0deg,
            #ec4899 0%, #06b6d4 40%, #000 70%, #ec4899 100%
          );
          filter: blur(6px) brightness(1.2);
          animation: rainbow-spin 3s linear infinite;
        }
        .rainbow-x {
          background: conic-gradient(
            from 0deg,
            #d1d5db 0%, #6b7280 50%, #000 100%
          );
          filter: blur(6px) brightness(1.2);
          animation: rainbow-spin 3s linear infinite;
        }
        @keyframes rainbow-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SocialShowcase; 