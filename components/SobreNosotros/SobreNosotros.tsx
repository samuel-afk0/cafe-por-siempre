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
            <div className="w-full md:w-1/2 h-[420px] md:sticky top-0 rounded-lg overflow-hidden shadow-2xl">
              <div className="relative h-full w-full">
                <Image
                  src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
                  alt="Taza de café realista"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 text-left space-y-6 py-8">
              <h2 className="text-5xl font-bold text-white flex items-center gap-4">
                <Image src="/cafemejorado.jpg" alt="Logo Café por Siempre" width={90} height={90} className="rounded-full shadow-lg" />
                Café por Siempre
              </h2>
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
              {/* Mapa y visita */}
              <div className="mt-16 flex flex-col items-center justify-center gap-6">
                <h3 className="text-3xl font-bold text-white mb-2 text-center">¡Visítanos en Comasagua, La Libertad, El Salvador!</h3>
                <div className="w-full flex justify-center">
                  <iframe
                    title="Ubicación Comasagua"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.964282019994!2d-89.4122226857356!3d13.60000099044339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f633f7e2e2e2e2f%3A0x7e2e2e2e2e2e2e2e!2sComasagua%2C%20La%20Libertad%2C%20El%20Salvador!5e0!3m2!1ses-419!2ssv!4v1680000000000!5m2!1ses-419!2ssv"
                    width="100%"
                    height="320"
                    style={{ border: 0, borderRadius: '1rem', boxShadow: '0 4px 32px #0008' }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
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
