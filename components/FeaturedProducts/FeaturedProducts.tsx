'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Espresso Clásico',
    description: 'Nuestro espresso signature, intenso y aromático',
    price: '3.50',
    image: '/cafe.jfif'
  },
  {
    id: 2,
    name: 'Café de Origen',
    description: 'Granos selectos de las mejores regiones cafeteras',
    price: '4.50',
    image: '/cafe capuchino.jfif'
  },
  {
    id: 3,
    name: 'Cappuccino Artesanal',
    description: 'Espresso con espuma de leche cremosa',
    price: '4.00',
    image: '/capuchino.jfif'
  },
  {
    id: 4,
    name: 'Dalgona Coffee',
    description: 'Café cremoso con espuma de leche y caramelo',
    price: '4.75',
    image: '/Dalgona.jfif'
  }
];

const FeaturedProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(new Set());
  const [sectionVisible, setSectionVisible] = useState(false);
  const productRefs = useRef(products.map(() => ({ current: null })));
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    const observers = productRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleProducts(prev => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(index);
            }
            return newSet;
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
      observers.forEach((observer, index) => {
        if (productRefs.current[index].current) {
          observer.unobserve(productRefs.current[index].current);
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-20 bg-black text-white relative overflow-hidden"
    >
      <div 
        className={`container mx-auto px-4 transform transition-all duration-1000 ease-out ${sectionVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <h2 className="text-4xl font-bold text-center lg:text-left mb-12">Café por Siempre</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div 
            ref={productRefs.current[index]}
            key={product.id} 
            className={`bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-1000 border border-gray-800 ${visibleProducts.has(index) ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
            style={{
              position: visibleProducts.has(index) ? 'sticky' : 'relative',
              top: visibleProducts.has(index) ? `${index * 2}rem` : 'auto',
              zIndex: visibleProducts.has(index) ? products.length - index : 1
            }}
          >
            <div className="relative h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-400 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-brown-600">${product.price}</span>
                <button className="bg-brown-600 text-white px-4 py-2 rounded-full hover:bg-brown-700 transition-colors">
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;