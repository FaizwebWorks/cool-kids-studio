import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CIRCLE_RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

const InitialLoader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const progressCircleRef = useRef(null);
  const counterRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
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

    gsap.set(progressCircleRef.current, {
      strokeDasharray: CIRCUMFERENCE,
      strokeDashoffset: CIRCUMFERENCE,
      transformOrigin: '50% 50%',
      rotate: -90,
      svgOrigin: '60 60',
    });

    if (prefersReducedMotion) {
      if (counterRef.current) counterRef.current.textContent = '100';
      gsap.set(progressCircleRef.current, { strokeDashoffset: 0 });
      gsap.to(containerRef.current, {
        autoAlpha: 0,
        duration: 0.22,
        delay: 0.12,
        onComplete: finishLoader,
      });

      return () => {
        document.documentElement.style.overflow = previousOverflow;
      };
    }

    const counter = { value: 0 };
    const timeline = gsap.timeline({ onComplete: finishLoader });

    timeline
      .set([leftPanelRef.current, rightPanelRef.current], { xPercent: 0 })
      .set(frameRef.current, { scale: 0.82, autoAlpha: 0 })
      .set([labelRef.current, titleRef.current], { y: 14, autoAlpha: 0 })
      .to(frameRef.current, {
        scale: 1,
        autoAlpha: 1,
        duration: 0.7,
        ease: 'power3.out',
      }, 0)
      .to(titleRef.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, 0.12)
      .to(labelRef.current, {
        y: 0,
        autoAlpha: 1,
        duration: 0.46,
        ease: 'power2.out',
      }, 0.2)
      .to(counter, {
        value: 100,
        duration: 2.25,
        ease: 'power2.out',
        onUpdate: () => {
          if (!counterRef.current) return;
          counterRef.current.textContent = String(Math.round(counter.value)).padStart(2, '0');
        },
      }, 0.04)
      .to(progressCircleRef.current, {
        strokeDashoffset: 0,
        duration: 2.25,
        ease: 'power2.inOut',
      }, 0.04)
      .to(frameRef.current, {
        rotate: 15,
        duration: 0.35,
        ease: 'power2.inOut',
      }, 2.2)
      .to(frameRef.current, {
        rotate: 0,
        duration: 0.35,
        ease: 'power2.inOut',
      }, 2.55)
      .to([frameRef.current, labelRef.current, titleRef.current], {
        autoAlpha: 0,
        y: -10,
        duration: 0.3,
        ease: 'power2.in',
      }, 2.95)
      .to(leftPanelRef.current, {
        xPercent: -102,
        duration: 1,
        ease: 'expo.inOut',
      }, 3.06)
      .to(rightPanelRef.current, {
        xPercent: 102,
        duration: 1,
        ease: 'expo.inOut',
      }, 3.06)
      .to(containerRef.current, {
        autoAlpha: 0,
        duration: 0.22,
      }, 3.86);

    return () => {
      timeline.kill();
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[10000] pointer-events-none">
      <div className="absolute inset-0 bg-bg" />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(26, 26, 26, 0.16) 1px, transparent 0)',
          backgroundSize: '16px 16px',
        }}
      />

      <div ref={leftPanelRef} className="absolute inset-y-0 left-0 w-1/2 bg-primary" />
      <div ref={rightPanelRef} className="absolute inset-y-0 right-0 w-1/2 bg-primary" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-bg">
        <div className="overflow-hidden">
          <p ref={labelRef} className="text-[10px] uppercase tracking-[0.32em] text-bg/60 md:text-xs">
            Loading Visual Story
          </p>
        </div>

        <div className="overflow-hidden">
          <h2
            ref={titleRef}
            className="mt-4 font-heading text-[clamp(1.7rem,4vw,2.8rem)] uppercase tracking-[0.2em] text-accent"
          >
            The Cool Kids
          </h2>
        </div>

        <div ref={frameRef} className="relative mt-8 flex h-[120px] w-[120px] items-center justify-center">
          <svg width="120" height="120" viewBox="0 0 120 120" className="absolute inset-0">
            <circle
              cx="60"
              cy="60"
              r={CIRCLE_RADIUS}
              stroke="rgba(245,245,245,0.2)"
              strokeWidth="1.5"
              fill="none"
            />
            <circle
              ref={progressCircleRef}
              cx="60"
              cy="60"
              r={CIRCLE_RADIUS}
              stroke="rgba(199,217,139,1)"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <span ref={counterRef} className="font-heading text-[2.1rem] leading-none tracking-[0.12em]">
            00
          </span>
        </div>
      </div>
    </div>
  );
};

export default InitialLoader;
