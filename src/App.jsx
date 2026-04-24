import React, { Suspense, lazy, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ONCE at the root
gsap.registerPlugin(ScrollTrigger);

// Components
import Navbar from './components/common/Navbar';
import { HeroSkeleton, SectionSkeleton } from './components/common/Skeleton';

const Hero = lazy(() => import('./components/sections/Hero'));
const MobileHero = lazy(() => import('./components/sections/MobileHero'));
const ScrollGallery = lazy(() => import('./components/sections/ScrollGallery'));
const HorizontalServices = lazy(() => import('./components/sections/HorizontalServices'));
const Stats = lazy(() => import('./components/sections/Stats'));
const HowItWorks = lazy(() => import('./components/sections/HowItWorks'));
const Gallery = lazy(() => import('./components/sections/Gallery'));
const Pricing = lazy(() => import('./components/sections/Pricing'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const PrivateGallery = lazy(() => import('./components/sections/PrivateGallery'));
const GiftCards = lazy(() => import('./components/sections/GiftCards'));
const ReferralProgram = lazy(() => import('./components/sections/ReferralProgram'));
const MilestoneReminder = lazy(() => import('./components/sections/MilestoneReminder'));
const CTABanner = lazy(() => import('./components/common/CTABanner'));
const Contact = lazy(() => import('./components/sections/Contact'));
const Footer = lazy(() => import('./components/common/Footer'));

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Increased from 1.2 for a more relaxed feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential out
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      anchors: true, // Handle anchor links smoothly
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const requestID = requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(requestID);
      window.removeEventListener('load', handleLoad);
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <main className="bg-bg relative min-h-screen">
      <div id="home" className="absolute top-0 left-0 w-px h-px opacity-0" aria-hidden="true" />

      <Navbar />

      <div className="hidden md:block fixed top-0 left-0 w-full h-screen z-0">
        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>
      </div>

      <div className="md:hidden relative z-10">
        <Suspense fallback={<HeroSkeleton />}>
          <MobileHero />
        </Suspense>
      </div>

      <div className="hidden md:block relative z-10 pointer-events-none">
        <Suspense fallback={null}>
          <ScrollGallery />
        </Suspense>
      </div>

      <div className="relative z-20">
        <Suspense fallback={<SectionSkeleton />}>
          <HorizontalServices />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <Stats />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <HowItWorks />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Gallery />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Pricing />
          <Testimonials />
          <PrivateGallery />
          <GiftCards />
          <ReferralProgram />
          <MilestoneReminder />
          <CTABanner />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </main>
  );
};

export default App;
