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
import Gallery from './components/Gallery'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import PrivateGallery from './components/PrivateGallery'
import GiftCards from './components/GiftCards'

// Register ONCE at the root
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2, // Better for mobile response
    });

    // Mandatory: Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Synchronize GSAP with Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing for better sync
    gsap.ticker.lagSmoothing(0);

    // Final refresh after everything is loaded
    window.onload = () => {
      ScrollTrigger.refresh();
    };

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return (
    <main className="bg-bg relative min-h-screen">
      <Navbar />

      <div className="hidden md:block fixed top-0 left-0 w-full h-screen z-0">
        <Hero />
      </div>

      <div className="md:hidden relative z-10">
        <MobileHero />
      </div>

      <div className="hidden md:block relative z-10 pointer-events-none">
        <ScrollGallery />
      </div>
      
      <div className="relative z-20">
        <HorizontalServices />
        <Stats />
        <HowItWorks />
        <Gallery />
        <Pricing />
        <Testimonials />
        <PrivateGallery />
        <GiftCards />
      </div>
    </main>
  )
}

export default App
