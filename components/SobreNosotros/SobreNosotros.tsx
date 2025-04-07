'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const SobreNosotros = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <div className={`transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col md:flex-row items-start gap-16 relative">
            <div className="w-full md:w-1/2 h-screen md:sticky top-0 rounded-lg overflow-hidden shadow-2xl">
              <div className="relative h-full w-full">
                <Image
                  src="/cafe_sobre.png"
                  alt="Sobre nuestro café"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 text-left space-y-6 py-8">
              <h2 className="text-5xl font-bold text-white">Café por Siempre</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Donde la pasión por el café se encuentra con la excelencia. 
                Cada taza que servimos es el resultado de años de dedicación, 
                conocimiento y amor por el arte del café.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="p-6 bg-black rounded-lg border border-gray-800">
                  <h3 className="text-2xl font-semibold text-white mb-4">Tradición</h3>
                  <p className="text-gray-300">Años de experiencia en la selección y preparación del mejor café.</p>
                </div>
                <div className="p-6 bg-black rounded-lg border border-gray-800">
                  <h3 className="text-2xl font-semibold text-white mb-4">Calidad</h3>
                  <p className="text-gray-300">Granos seleccionados de las mejores regiones cafeteras del mundo.</p>
                </div>
                <div className="p-6 bg-black rounded-lg border border-gray-800">
                  <h3 className="text-2xl font-semibold text-white mb-4">Innovación</h3>
                  <p className="text-gray-300">Métodos modernos de preparación que resaltan cada nota de sabor.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreNosotros;
