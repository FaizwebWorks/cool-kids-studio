import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import Button from "../common/Button";
import { services } from "../../data/services";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { requestScrollTriggerRefresh } from "../../utils/scrollTriggerRefresh";

const ServiceCard = memo(({ service, index }) => (
  <div className="w-screen h-screen flex items-center justify-center px-12 md:px-20 lg:px-32 shrink-0">
    <div className="w-1/2 flex justify-center">
      <div className="relative">
        <div className="relative w-[400px] md:w-[500px] lg:w-[550px] h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden rounded-[40px]">
          <img
            src={service.img}
            alt={service.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="absolute -bottom-4 -right-4 bg-white px-6 py-3 rounded-full shadow-lg">
          <span className="text-sm font-medium text-primary/95">Starting ₹5,999</span>
        </div>
      </div>
    </div>

    <div className="w-1/2 pl-8 lg:pl-16 flex flex-col justify-center">
      <span className="text-9xl md:text-[12rem] font-heading text-border font-medium leading-none select-none">
        {index + 1}
      </span>

      <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading text-primary/95 mt-2 relative inline-block">
        {service.title}
        <span className="absolute -bottom-2 left-0 w-24 h-0.5 bg-accent" />
      </h2>

      <h3 className="text-lg md:text-xl text-text-secondary mt-4 font-medium">
        {service.subtitle}
      </h3>

      <p className="text-base md:text-lg text-text-secondary mt-4 leading-relaxed max-w-md">
        {service.desc}
      </p>

      <div className="flex gap-2 mt-8">
        {services.map((_, dotI) => (
          <div
            key={dotI}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${dotI === index ? 'bg-accent' : 'bg-border'}`}
          />
        ))}
      </div>

      <div className="mt-10">
        <Button text="Book This Shoot" primary />
      </div>
    </div>
  </div>
));

ServiceCard.displayName = 'ServiceCard';

const MobileCard = memo(({ service, index }) => (
  <div className="py-10">
    <img
      src={service.img}
      alt={service.title}
      className="w-full h-[260px] object-cover rounded-3xl mb-6 shadow-md"
      loading="lazy"
    />

    <span className="text-5xl text-border font-heading">{index + 1}</span>

    <h3 className="text-2xl font-heading mt-1 text-primary/95">
      {service.title}
    </h3>

    <p className="text-sm text-text-secondary mt-3">
      {service.desc}
    </p>

    <div className="mt-6">
      <Button text="Book Shoot" primary />
    </div>
  </div>
));

MobileCard.displayName = 'MobileCard';

export default function HorizontalServices() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!isDesktop) return undefined;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      // Title Animation
      if (titleRef.current) {
        gsap.from(titleRef.current.querySelectorAll("h2, p"), {
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          },
        });
      }

      // Horizontal Scroll (Desktop Only)
      mm.add("(min-width: 768px)", () => {
        if (containerRef.current) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${containerRef.current.scrollWidth - window.innerWidth}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });
          
          tl.to(containerRef.current, {
            x: () => -(containerRef.current.scrollWidth - window.innerWidth),
            ease: "none",
          });
        }
      });
    }, sectionRef);

    const cleanupRefresh = requestScrollTriggerRefresh(260);

    return () => {
      mm.revert();
      ctx.revert();
      cleanupRefresh();
    };
  }, [isDesktop]);

  if (!isDesktop) {
    return <MobileCarousel />;
  }

  return (
    <>
      <div ref={titleRef} id="services" className="md:py-16 text-center bg-bg">
        <h2 className="text-6xl font-heading text-primary/95 uppercase">
          Our Services
        </h2>
        <p className="text-text-secondary mt-4 max-w-xl mx-auto text-lg">
          From first giggles to big life moments, we capture everything worth remembering.
        </p>
      </div>

      <section ref={sectionRef} className="relative bg-bg overflow-hidden">
        <div ref={containerRef} className="flex h-screen will-change-transform">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}

function MobileCarousel() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || window.innerWidth >= 768) return;

    let tl;
    let didInteract = false;

    const cancelPeek = () => {
      didInteract = true;
      if (!tl) return;
      tl.kill();
      el.style.scrollSnapType = "";
      el.style.scrollBehavior = "";
    };

    el.addEventListener("touchstart", cancelPeek, { passive: true, once: true });
    el.addEventListener("pointerdown", cancelPeek, { passive: true, once: true });
    el.addEventListener("wheel", cancelPeek, { passive: true, once: true });

    const timer = window.setTimeout(() => {
      if (didInteract) return;

      const card = el.querySelector("[data-card]");
      const cardWidth = card?.offsetWidth || 300;
      const peekDistance = Math.min(cardWidth * 0.38, 132);

      el.style.scrollSnapType = "none";
      el.style.scrollBehavior = "auto";

      tl = gsap.timeline({
        onComplete: () => {
          el.style.scrollSnapType = "";
          el.style.scrollBehavior = "";
        },
      });

      tl
        .to(el, { scrollLeft: peekDistance, duration: 0.95, ease: "sine.inOut" })
        .to(el, { scrollLeft: 0, duration: 0.95, ease: "sine.inOut" })
        .to(el, { scrollLeft: peekDistance * 0.72, duration: 0.8, ease: "sine.inOut" }, "+=0.18")
        .to(el, { scrollLeft: 0, duration: 0.9, ease: "sine.inOut" });
    }, 1200);

    return () => {
      window.clearTimeout(timer);
      if (tl) tl.kill();
      el.removeEventListener("touchstart", cancelPeek);
      el.removeEventListener("pointerdown", cancelPeek);
      el.removeEventListener("wheel", cancelPeek);
      el.style.scrollSnapType = "";
      el.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div id="services" className="bg-bg pb-16">
      <div className="px-6 pt-10 pb-3">
        <h2 className="text-4xl font-heading text-primary/95 uppercase">
          Our Services
        </h2>
      </div>

      <div className="flex items-center gap-2 px-6 pb-4 text-xs text-text-secondary" aria-hidden="true">
        <span>Swipe</span>
        <div className="w-10 h-[2px] bg-border relative overflow-hidden">
          <div className="absolute inset-0 bg-accent animate-swipe-line" />
        </div>
        <span>→</span>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-6"
        role="region"
        aria-label="Services carousel"
      >
        {services.map((s, i) => (
          <div
            key={i}
            data-card
            className="snap-center shrink-0 w-[85%] mr-4"
          >
            <MobileCard service={s} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
