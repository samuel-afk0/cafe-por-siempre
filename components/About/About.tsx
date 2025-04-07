import Image from 'next/image';

const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/about-coffee.jpg"
              alt="Nuestra historia"
              fill
              className="object-cover"
            />
          </div>
          
          <div>
            <h2 className="text-4xl font-bold mb-6 animate-slide-left">Nuestra Historia</h2>
            <p className="text-gray-600 mb-6 text-lg animate-slide-left" style={{animationDelay: '0.2s'}}>
              Desde 2010, nos hemos dedicado a servir el mejor café de especialidad en nuestra comunidad. 
              Trabajamos directamente con productores locales para garantizar la más alta calidad en cada taza.
            </p>
            <p className="text-gray-600 mb-8 text-lg animate-slide-left" style={{animationDelay: '0.4s'}}>
              Nuestro compromiso es brindar una experiencia única, combinando la tradición del café con 
              técnicas modernas de preparación y un ambiente acogedor donde cada cliente se sienta como en casa.
            </p>
            
            <div className="grid grid-cols-2 gap-6 animate-slide-left" style={{animationDelay: '0.6s'}}>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-brown-600 mb-2">10+</h3>
                <p className="text-gray-600">Años de experiencia</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-brown-600 mb-2">5</h3>
                <p className="text-gray-600">Variedades de café</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;