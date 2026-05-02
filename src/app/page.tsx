import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Currently from '@/components/Currently';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import OpenSource from '@/components/OpenSource';
import Programs from '@/components/Programs';
import Skills from '@/components/Skills';
import Leadership from '@/components/Leadership';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollReveal from '@/components/ScrollReveal';
import MobileNav from '@/components/MobileNav';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero />
        <Currently />
        <About />
        <Experience />
        <Projects />
        <OpenSource />
        <Programs />
        <Skills />
        <Leadership />
        <Contact />
      </main>
      <MobileNav />
      <Footer />
    </>
  );
}
