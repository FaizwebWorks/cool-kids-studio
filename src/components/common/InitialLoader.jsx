import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const InitialLoader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const backdropRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const counterWrapRef = useRef(null);
  const counterRef = useRef(null);
  const captionRef = useRef(null);
  const progressWrapRef = useRef(null);
  const progressRef = useRef(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    const finishLoader = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      document.documentElement.style.overflow = previousOverflow;
      onComplete();
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (counterRef.current) counterRef.current.textContent = '100';
      gsap.set(progressRef.current, { scaleX: 1, transformOrigin: 'left center' });
      gsap.set(progressWrapRef.current, { autoAlpha: 0 });
      gsap.to(containerRef.current, {
        autoAlpha: 0,
        duration: 0.25,
        delay: 0.15,
        onComplete: finishLoader,
      });

      return () => {
        document.documentElement.style.overflow = previousOverflow;
      };
    }

    const counter = { value: 0 };
    const timeline = gsap.timeline({ onComplete: finishLoader });

    timeline
      .set(backdropRef.current, {
        backdropFilter: 'blur(24px)',
        backgroundColor: 'rgba(26, 26, 26, 0.82)',
      })
      .set(progressRef.current, { transformOrigin: 'left center', scaleX: 0 })
      .to(counter, {
        value: 100,
        duration: 2.3,
        ease: 'power3.out',
        onUpdate: () => {
          if (!counterRef.current) return;
          const value = Math.round(counter.value);
          counterRef.current.textContent = String(value).padStart(2, '0');
        },
      }, 0)
      .to(progressRef.current, {
        scaleX: 1,
        duration: 2.3,
        ease: 'power3.inOut',
      }, 0)
      .to(backdropRef.current, {
        backdropFilter: 'blur(18px)',
        backgroundColor: 'rgba(26, 26, 26, 0.72)',
        duration: 2.2,
        ease: 'power2.out',
      }, 0)
      .to(captionRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, 0.3)
      .to(progressWrapRef.current, {
        autoAlpha: 0,
        scaleX: 0.72,
        y: -2,
        duration: 0.32,
        ease: 'power3.in',
      }, 2.28)
      .to([counterWrapRef.current, captionRef.current], {
        autoAlpha: 0,
        y: -18,
        duration: 0.42,
        ease: 'power3.in',
      }, 2.42)
      .to(topPanelRef.current, {
        yPercent: -110,
        duration: 1.65,
        ease: 'expo.inOut',
      }, 2.7)
      .to(bottomPanelRef.current, {
        yPercent: 110,
        duration: 1.65,
        ease: 'expo.inOut',
      }, 2.7)
      .to(backdropRef.current, {
        backdropFilter: 'blur(0px)',
        backgroundColor: 'rgba(26, 26, 26, 0)',
        duration: 1.8,
        ease: 'sine.inOut',
      }, 2.82)
      .to(containerRef.current, {
        autoAlpha: 0,
        duration: 0.2,
      }, 4.45);

    return () => {
      timeline.kill();
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] overflow-hidden pointer-events-none">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-primary/80 backdrop-blur-2xl will-change-[backdrop-filter,background-color]"
      />

      <div ref={topPanelRef} className="absolute inset-x-0 top-0 h-[calc(50%+2px)] bg-primary will-change-transform" />
      <div ref={bottomPanelRef} className="absolute inset-x-0 bottom-0 h-[calc(50%+2px)] bg-primary will-change-transform" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-bg">
        <p
          ref={captionRef}
          className="font-heading text-sm uppercase tracking-tight text-bg/75 opacity-0 translate-y-3 transition-all ease-linear duration-200 md:text-2xl"
        >
          The Cool Kids
        </p>

        <div ref={counterWrapRef} className="mt-6 flex items-start gap-2">
          <span
            ref={counterRef}
            className="text-[clamp(3.4rem,13vw,8rem)] leading-none tracking-tight font-bold"
          >
            00
          </span>
          <span className="mt-3 text-base uppercase tracking-tight text-bg/75 md:text-base">%</span>
        </div>

        <div
          ref={progressWrapRef}
          className="mt-8 h-px w-[min(72vw,520px)] origin-center overflow-hidden bg-bg/20"
        >
          <span ref={progressRef} className="block h-full w-full bg-accent" />
        </div>
      </div>
    </div>
  );
};

export default InitialLoader;
