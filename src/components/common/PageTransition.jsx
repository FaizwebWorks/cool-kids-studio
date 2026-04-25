import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';
import { useTransition } from '../../context/TransitionContext';

const PageTransition = () => {
  const containerRef = useRef(null);
  const columnRefs = useRef([]);
  const accentRef = useRef(null);
  const glowRef = useRef(null);
  const { isTransitioning, setIsTransitioning } = useTransition();
  const location = useLocation();
  const isFirstRender = useRef(true);
  const inTimelineRef = useRef(null);
  const outTimelineRef = useRef(null);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    gsap.set(containerRef.current, { autoAlpha: 0 });

    if (prefersReducedMotionRef.current) {
      gsap.set(columnRefs.current, { yPercent: -100 });
      gsap.set([accentRef.current, glowRef.current], { autoAlpha: 0 });
      return;
    }

    gsap.set(columnRefs.current, { yPercent: -105 });
    gsap.set(accentRef.current, { xPercent: -120, autoAlpha: 0 });
    gsap.set(glowRef.current, { xPercent: -105, autoAlpha: 0 });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (prefersReducedMotionRef.current) {
      gsap.set(containerRef.current, { autoAlpha: 0 });
      setIsTransitioning(false);
      return undefined;
    }

    inTimelineRef.current?.kill();
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(containerRef.current, { autoAlpha: 0 });
        setIsTransitioning(false);
      },
    });
    inTimelineRef.current = tl;

    tl.to(accentRef.current, {
      autoAlpha: 0,
      duration: 0.18,
      ease: 'power2.in',
    }, 0)
      .to(glowRef.current, {
        autoAlpha: 0,
        duration: 0.18,
        ease: 'power2.in',
      }, 0)
      .to(columnRefs.current, {
        yPercent: 106,
        duration: 0.88,
        stagger: {
          each: 0.08,
          from: 'end',
        },
        ease: 'expo.inOut',
      }, 0.05);

    return () => tl.kill();
  }, [location.pathname, setIsTransitioning]);

  useEffect(() => {
    if (!isTransitioning) return;

    if (prefersReducedMotionRef.current) {
      setIsTransitioning(false);
      return undefined;
    }

    outTimelineRef.current?.kill();
    gsap.set(containerRef.current, { autoAlpha: 1 });

    const tl = gsap.timeline();
    outTimelineRef.current = tl;

    tl.to(columnRefs.current, {
      yPercent: 0,
      duration: 0.76,
      stagger: {
        each: 0.07,
        from: 'start',
      },
      ease: 'expo.inOut',
    }, 0)
      .fromTo(accentRef.current, {
        xPercent: -120,
        autoAlpha: 0.2,
      }, {
        xPercent: 120,
        autoAlpha: 0.95,
        duration: 0.9,
        ease: 'power2.inOut',
      }, 0.08)
      .fromTo(glowRef.current, {
        xPercent: -105,
        autoAlpha: 0.12,
      }, {
        xPercent: 105,
        autoAlpha: 0.42,
        duration: 1.04,
        ease: 'power2.inOut',
      }, 0.06);

    return () => tl.kill();
  }, [isTransitioning, setIsTransitioning]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none opacity-0"
      aria-hidden="true"
    >
      <div className="absolute inset-0 grid grid-cols-3">
        {['#151515', '#1a1a1a', '#111111'].map((bg, index) => (
          <div
            key={bg}
            ref={(node) => {
              columnRefs.current[index] = node;
            }}
            className="h-full will-change-transform"
            style={{ background: bg }}
          />
        ))}
      </div>
    </div>
  );
};

export default PageTransition;
