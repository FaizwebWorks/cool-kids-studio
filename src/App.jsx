import React, { Suspense, lazy, useCallback, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ONCE at the root
gsap.registerPlugin(ScrollTrigger);

// Components
import Navbar from './components/common/Navbar';
import { HeroSkeleton, SectionSkeleton } from './components/common/Skeleton';
import ScrollToTop from './utils/ScrollToTop';
import InitialLoader from './components/common/InitialLoader';
import { useMediaQuery } from './hooks/useMediaQuery';

// Transition Components
import PageTransition from './components/common/PageTransition';
import ScrollTriggerManager from './components/common/ScrollTriggerManager';
import { LenisInitializer } from './hooks/useLenis';
import TransitionLayout from './components/layout/TransitionLayout';

// Lazy Sections
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

// Pages
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'));
const BookSession = lazy(() => import('./pages/BookSession'));

const LandingPage = ({ isDesktop }) => (
  <>
    {isDesktop ? (
      <>
        <div className="fixed top-0 left-0 w-full h-screen z-0">
          <Suspense fallback={<HeroSkeleton />}>
            <Hero />
          </Suspense>
        </div>

        <div className="relative z-10 pointer-events-none">
          <Suspense fallback={null}>
            <ScrollGallery />
          </Suspense>
        </div>
      </>
    ) : (
      <div className="relative z-10">
        <Suspense fallback={<HeroSkeleton />}>
          <MobileHero />
        </Suspense>
      </div>
    )}

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
  </>
);

const App = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleLoaderComplete = useCallback(() => {
    setIsInitialLoading(false);
  }, []);

  return (
    <main className="bg-bg relative min-h-screen overflow-x-hidden">
      {isInitialLoading && <InitialLoader onComplete={handleLoaderComplete} />}

      <LenisInitializer />
      <ScrollTriggerManager />
      <PageTransition />
      <ScrollToTop />
      
      <div id="home" className="absolute top-0 left-0 w-px h-px opacity-0" aria-hidden="true" />

      <Navbar />

      <TransitionLayout>
        <Routes>
          <Route path="/" element={<LandingPage isDesktop={isDesktop} />} />
          <Route path="/book-session" element={<BookSession />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Routes>
      </TransitionLayout>
    </main>
  );
};

export default App;
