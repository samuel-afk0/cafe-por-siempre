"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import stock from "../../stock.json";

interface FeaturedProduct {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
  imagenes: string[];
  categoria: string;
  subcategoria: string;
}

interface CartProduct extends FeaturedProduct {
  cantidad: number;
}

interface CartObj {
  userId: string;
  products: CartProduct[];
}

const FeaturedProducts = () => {
  const [cantidad, setCantidad] = useState<number>(1);
  const [visibleProducts, setVisibleProducts] = useState(new Set<number>());
  const [sectionVisible, setSectionVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FeaturedProduct | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Flatten products: one per subcategory
  const featured: FeaturedProduct[] = [];
  stock.categorias.forEach((cat) => {
    cat.subcategorias.forEach((sub) => {
      if (sub.productos && sub.productos.length > 0) {
        const p = sub.productos[0];
        featured.push({
          id: p.id || '',
          nombre: p.nombre || "Producto sin nombre",
          precio: p.precio || 0,
          stock: p.stock || 0,
          imagenes: Array.isArray(p.imagenes) && p.imagenes.length > 0 ? p.imagenes : ["/coffee-logo.svg"],
          categoria: cat.categoria || "Sin categoría",
          subcategoria: sub.nombre || "Sin subcategoría",
        });
      }
    });
  });

  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

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
          setVisibleProducts((prev) => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(index);
            }
            return newSet;
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
      );
      if (ref) {
        observer.observe(ref);
      }
      return observer;
    });

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
      observers.forEach((observer, index) => {
        if (productRefs.current[index]) {
          observer.unobserve(productRefs.current[index]);
        }
      });
    };
  }, []);

  useEffect(() => {
    // Store all product IDs, names, and subcategories in localStorage when cards are loaded
    const productIds = featured.map(product => ({ id: product.id, nombre: product.nombre, subcategoria: product.subcategoria }));
    localStorage.setItem('featuredProductIds', JSON.stringify(productIds));
  }, [featured]);

  const handleProductClick = (product: FeaturedProduct) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white relative overflow-hidden"
      >
        <div
          className={`container mx-auto px-4 transform transition-all duration-1000 ease-out ${
            sectionVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <h2 className="text-5xl font-extrabold text-center lg:text-left mb-14 tracking-tight drop-shadow-lg text-red-600">
            Café por Siempre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {featured.map((product, index) => (
              <div
                ref={el => productRefs.current[index] = el}
                key={product.nombre + product.subcategoria}
                className={`bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-3xl shadow-2xl overflow-hidden hover:scale-105 hover:shadow-red-700/30 transition-all duration-700 border-2 border-gray-800 cursor-pointer ${
                  visibleProducts.has(index) ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                }`}
                style={{
                  position: visibleProducts.has(index) ? "sticky" : "relative",
                  top: visibleProducts.has(index) ? `${index * 2}rem` : "auto",
                  zIndex: visibleProducts.has(index) ? featured.length - index : 1,
                }}
                onClick={() => handleProductClick(product)}
              >
                <div className="relative h-56 group">
                  <Image
                    src={product.imagenes[0]}
                    alt={product.nombre}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 px-3 py-1 rounded-full text-xs text-red-400 font-bold shadow-lg backdrop-blur-sm">
                    {product.categoria} / {product.subcategoria}
                  </div>
                </div>
                <div className="p-7 flex flex-col gap-2">
                  <h3 className="text-2xl font-bold mb-1 text-yellow-300 drop-shadow">{product.nombre}</h3>
                  <p className="text-gray-300 mb-2">
                    Stock: <span className="font-semibold text-white">{product.stock}</span>
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-3xl font-extrabold text-yellow-400 drop-shadow">${product.precio}</span>
                    <button
                      className="bg-yellow-500/90 text-black px-6 py-2 rounded-full font-bold shadow hover:bg-yellow-400 transition-colors text-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                    >
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 p-10 rounded-3xl shadow-2xl max-w-3xl w-full mx-auto relative border-4 border-red-600 animate-pop-in flex flex-col md:flex-row gap-8 items-center md:items-stretch">
            <div className="flex-shrink-0 flex items-center justify-center w-full md:w-[340px] h-[340px] bg-gray-800 rounded-2xl overflow-hidden shadow-lg border-2 border-red-600 relative">
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-600 hover:text-white text-red-400 rounded-full w-10 h-10 flex items-center justify-center z-10"
                onClick={e => { e.stopPropagation(); setCurrentImage((prev) => (prev - 1 + selectedProduct.imagenes.length) % selectedProduct.imagenes.length); }}
                aria-label="Previous image"
              >
                &#8592;
              </button>
              <Image src={selectedProduct.imagenes[currentImage]} alt={selectedProduct.nombre} width={320} height={320} className="object-cover w-full h-full rounded-2xl transition-all duration-500" />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-red-600 hover:text-white text-red-400 rounded-full w-10 h-10 flex items-center justify-center z-10"
                onClick={e => { e.stopPropagation(); setCurrentImage((prev) => (prev + 1) % selectedProduct.imagenes.length); }}
                aria-label="Next image"
              >
                &#8594;
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <span className="text-xs text-yellow-400 uppercase font-bold tracking-widest mb-2 block">
                {selectedProduct.categoria} / {selectedProduct.subcategoria}
              </span>
              <h3 className="text-3xl font-extrabold mb-5 text-yellow-300 drop-shadow">
                {selectedProduct.nombre}
              </h3>
              <div className="flex gap-3 mb-6">
                {selectedProduct.imagenes.slice(1).map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt={selectedProduct.nombre}
                    width={70}
                    height={70}
                    className="rounded-xl shadow-lg border-2 border-yellow-400 bg-white object-cover"
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-yellow-400 mb-2 block">${selectedProduct.precio}</span>
              <p className="text-gray-200 mb-4">
                Stock: <span className="font-semibold text-white">{selectedProduct.stock}</span>
              </p>
              <div className="flex items-center gap-3 mb-6">
                <label htmlFor="cantidad" className="text-gray-200 font-semibold">
                  Cantidad:
                </label>
                <input
                  id="cantidad"
                  type="number"
                  min={1}
                  max={selectedProduct.stock}
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  className="w-20 px-3 py-2 border-2 border-yellow-400 rounded-lg bg-[#232946] text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <button
                className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-300 transition-colors text-xl w-full mb-3 animate-bounce-once"
                onClick={() => {
                  const userId = localStorage.getItem("userId") || "guest";
                  const cartKey = `cart_${userId}`;
                  const cartObj = JSON.parse(
                    localStorage.getItem(cartKey) || `{"userId":"${userId}","products":[]}`
                  ) as CartObj;

                  if (!cartObj.userId) cartObj.userId = userId;
                  if (!Array.isArray(cartObj.products)) cartObj.products = [];

                  const existingIndex = cartObj.products.findIndex(
                    (item) => item.nombre === selectedProduct.nombre
                  );

                  if (existingIndex !== -1) {
                    cartObj.products[existingIndex].cantidad += cantidad;
                  } else {
                    cartObj.products.push({ ...selectedProduct, cantidad });
                  }

                  localStorage.setItem(cartKey, JSON.stringify(cartObj));
                  window.dispatchEvent(new Event("cartUpdated"));
                  setSelectedProduct(null);
                  setCantidad(1);
                }}
              >
                Agregar al carrito
              </button>
            </div>
            <button
              className="absolute top-4 right-4 text-red-400 hover:text-red-200 text-3xl font-extrabold bg-black/30 rounded-full w-12 h-12 flex items-center justify-center transition-colors"
              onClick={() => setSelectedProduct(null)}
              aria-label="Cerrar modal"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedProducts;
