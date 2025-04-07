import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts';
import SobreNosotros from '../components/SobreNosotros/SobreNosotros';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <SobreNosotros />
      <FeaturedProducts />
      <Footer />
    </main>
  );
}
