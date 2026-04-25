import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTransition } from '../context/TransitionContext';

export const useLenis = () => {
  const lenisRef = useRef(null);
  const { isTransitioning } = useTransition();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      anchors: true,
    });

    lenisRef.current = lenis;

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP Ticker
    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);

    // Disable lag smoothing for GSAP
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      if (isTransitioning) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isTransitioning]);

  return lenisRef.current;
};

// Component version for root integration
export const LenisInitializer = () => {
  useLenis();
  return null;
};
