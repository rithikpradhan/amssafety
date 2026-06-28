import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ProductGridSection from '@/components/ProductGridSection';
import SectionAbout from '@/components/SectionAbout';
import SectionWhyChooseUs from '@/components/SectionWhyChooseUs';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ProductGridSection />
      <SectionAbout />
      <SectionWhyChooseUs />
    </main>
  );
}
