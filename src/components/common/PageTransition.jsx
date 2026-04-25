import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';
import { useTransition } from '../../context/TransitionContext';

const PageTransition = () => {
  const overlayRef = useRef(null);
  const { isTransitioning, setIsTransitioning } = useTransition();
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // This handles the "In" animation when route changes
    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
      }
    });

    tl.to(overlayRef.current, {
      y: '100%',
      duration: 1.2,
      ease: 'power4.inOut',
    }).set(overlayRef.current, { y: '-100%' });

    return () => tl.kill();
  }, [location.pathname, setIsTransitioning]);

  useEffect(() => {
    if (isTransitioning) {
      // This handles the "Out" animation triggered by Link
      gsap.to(overlayRef.current, {
        y: '0%',
        duration: 1.0,
        ease: 'power4.inOut',
      });
    }
  }, [isTransitioning]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 w-full h-[100vh] z-[9999] pointer-events-none"
      style={{
        background: '#1a1a1a', // Use your project's background color
        transform: 'translateY(-100%)',
        willChange: 'transform',
      }}
    />
  );
};

export default PageTransition;
