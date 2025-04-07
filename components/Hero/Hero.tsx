

"use client";

import { useEffect, useState, useRef } from 'react';

const Hero = () => {
  const [isClient, setIsClient] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const titleOpacity = Math.max(0, 1 - scrollY / 300);
  const titleTransform = `translateY(${Math.min(scrollY * 0.2, 50)}px)`;

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 animate-fade-in">
        {isClient ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/coffee-splash.svg"
            className="absolute right-0 h-full w-full object-cover opacity-70"
          >
            <source src="/cafe.mp4" type="video/mp4" />
            <source src="/cafe.mp4" type="video/quicktime" />
            Tu navegador no soporta el elemento de video.
          </video>
        ) : (
          <div 
            className="absolute right-0 h-full w-full bg-cover bg-center opacity-40"
            style={{ backgroundImage: 'url(/coffee-splash.svg)' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex items-center justify-end">
        <div 
          className="max-w-2xl text-white flex flex-col items-end fixed right-4 md:right-[15%]"
          style={{
            opacity: titleOpacity,
            transform: titleTransform,
            transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
          }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white animate-slide-right">
            Café por Siempre
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/80 animate-slide-left text-right">
            Donde cada taza cuenta una historia de tradición y excelencia
          </p>
          <button className="bg-white text-black hover:bg-black hover:text-white border-2 border-white px-8 py-3 rounded-full text-lg font-semibold transition-all transform hover:scale-105 animate-bounce-soft">
            Descubre Nuestro Café
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;