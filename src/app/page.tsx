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
import AnimatedSection from '@/components/AnimatedSection';

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Currently />
        <AnimatedSection><About /></AnimatedSection>
        <AnimatedSection><Experience /></AnimatedSection>
        <Projects />
        <AnimatedSection><OpenSource /></AnimatedSection>
        <AnimatedSection><Programs /></AnimatedSection>
        <AnimatedSection><Skills /></AnimatedSection>
        <AnimatedSection><Leadership /></AnimatedSection>
        <AnimatedSection><Contact /></AnimatedSection>
      </main>
      <Footer />
    </>
  );
}
