import React, { useEffect } from 'react'
import Hero from './components/Hero'
import MobileHero from './components/MobileHero'
import ScrollGallery from './components/ScrollGallery'
import Navbar from './components/Navbar'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HorizontalServices from './components/HorizontalServices'
import Stats from './components/Stats'
import HowItWorks from './components/HowItWorks'

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Reduced duration for better responsiveness with GSAP
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP ticker
    const update = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);

    // Disable lag smoothing for better sync
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <main className="bg-bg relative min-h-screen">
      <Navbar />

      {/* DESKTOP HERO: stays fixed in the background */}
      <div className="hidden md:block fixed top-0 left-0 w-full h-screen z-0">
        <Hero />
      </div>

      {/* MOBILE HERO: stays in document flow */}
      <div className="md:hidden relative z-10">
        <MobileHero />
      </div>

      {/* Scrollable area for images - transparent so hero is visible */}
      <div className="hidden md:block relative z-10 pointer-events-none">
        <ScrollGallery />
      </div>
      
      <div className="relative z-20">
        <HorizontalServices />
        <Stats />
        <HowItWorks />
      </div>
    </main>
  )
}

export default App
