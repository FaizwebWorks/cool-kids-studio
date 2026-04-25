import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const InitialLoader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const counterWrapRef = useRef(null);
  const counterRef = useRef(null);
  const captionRef = useRef(null);
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
      .set(progressRef.current, { transformOrigin: 'left center', scaleX: 0 })
      .to(counter, {
        value: 100,
        duration: 2.1,
        ease: 'power2.out',
        onUpdate: () => {
          if (!counterRef.current) return;
          const value = Math.round(counter.value);
          counterRef.current.textContent = String(value).padStart(2, '0');
        },
      }, 0)
      .to(progressRef.current, {
        scaleX: 1,
        duration: 2.1,
        ease: 'power2.inOut',
      }, 0)
      .to(captionRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, 0.3)
      .to([counterWrapRef.current, captionRef.current], {
        autoAlpha: 0,
        y: -16,
        duration: 0.35,
        ease: 'power2.in',
      }, 2.15)
      .to(topPanelRef.current, {
        yPercent: -110,
        duration: 1.1,
        ease: 'power4.inOut',
      }, 2.3)
      .to(bottomPanelRef.current, {
        yPercent: 110,
        duration: 1.1,
        ease: 'power4.inOut',
      }, 2.3)
      .to(containerRef.current, {
        autoAlpha: 0,
        duration: 0.25,
      }, 3.05);

    return () => {
      timeline.kill();
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] pointer-events-none">
      <div className="absolute inset-0 bg-primary/85 backdrop-blur-[2px]" />

      <div ref={topPanelRef} className="absolute inset-x-0 top-0 h-1/2 bg-primary" />
      <div ref={bottomPanelRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-primary" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-bg">
        <p
          ref={captionRef}
          className="font-heading text-sm uppercase tracking-[0.35em] text-bg/70 opacity-0 translate-y-3 md:text-base"
        >
          The Cool Kids
        </p>

        <div ref={counterWrapRef} className="mt-6 flex items-start gap-2">
          <span
            ref={counterRef}
            className="text-[clamp(3.4rem,13vw,8rem)] leading-none tracking-[0.08em]"
          >
            00
          </span>
          <span className="mt-3 text-xs uppercase tracking-[0.35em] text-bg/70 md:text-sm">%</span>
        </div>

        <div className="mt-8 h-px w-[min(72vw,520px)] overflow-hidden bg-bg/20">
          <span ref={progressRef} className="block h-full w-full bg-accent" />
        </div>
      </div>
    </div>
  );
};

export default InitialLoader;
