import React, { useEffect } from 'react'
import Hero from './components/Hero'
import ScrollGallery from './components/ScrollGallery'
import Navbar from './components/Navbar'
import Lenis from 'lenis'

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-bg relative min-h-screen">
      <Navbar />
      
      {/* Hero stays fixed in the background */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Hero />
      </div>

      {/* Scrollable area for images - transparent so hero is visible */}
      <div className="relative z-10 pointer-events-none">
        <ScrollGallery />
      </div>
    </main>
  )
}

export default App
