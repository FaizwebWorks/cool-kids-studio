import { useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "./Button";

const services = [
  {
    title: "Newborn",
    subtitle: "Tiny Humans, Big Cuteness",
    desc: "They won’t stay this small forever. We capture every yawn, stretch, and tiny toe before they start running your house.",
    img: "/images/img2.webp",
  },
  {
    title: "Maternity",
    subtitle: "Glow Like You Mean It",
    desc: "You’re creating life. That deserves more than just phone photos. Elegant, powerful, and zero awkward posing.",
    img: "/images/about.webp",
  },
  {
    title: "Birthday",
    subtitle: "Chaos = Memories",
    desc: "Cake smash, kids screaming, balloons flying — we turn chaos into moments you’ll actually want to frame.",
    img: "/images/img4.webp",
  },
  {
    title: "Wedding",
    subtitle: "Real Moments Only",
    desc: "Not just poses. We capture laughs, tears, and those blink-and-miss moments that matter the most.",
    img: "/images/img3.webp",
  },
  {
    title: "Portrait",
    subtitle: "Just Be You",
    desc: "No fake smiles. No stiffness. Just real expressions, real vibe, real you.",
    img: "/images/studio.webp",
  },
];

export default function HorizontalServices() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
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
      if (window.innerWidth >= 768) {
        const getScrollAmount = () => {
          return containerRef.current.scrollWidth - window.innerWidth;
        };

        gsap.to(containerRef.current, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* 🔥 SECTION TITLE */}
      <div ref={titleRef} className="hidden md:block text-center py-24 bg-bg">
        <h2 className="text-6xl font-heading text-primary/95">
          Our Services
        </h2>
        <p className="text-text-secondary mt-4 max-w-xl mx-auto">
          From first giggles to big life moments, we capture everything worth remembering.
        </p>
      </div>

      {/* 🔥 HORIZONTAL SCROLL SECTION */}
      <section ref={sectionRef} className="hidden md:block relative bg-bg overflow-hidden">
        <div
          ref={containerRef}
          className="flex h-screen"
        >
          {services.map((service, i) => (
            <div
              key={i}
              className="w-screen h-screen flex items-center justify-center px-12 md:px-20 lg:px-32 shrink-0"
            >
              <div className="w-1/2 flex justify-center">
                <div className="relative">
                  <div className="relative w-[400px] md:w-[500px] lg:w-[550px] h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden rounded-[40px] ">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  <div className="absolute -bottom-4 -right-4 bg-white px-6 py-3 rounded-full">
                    <span className="text-sm font-medium text-primary/95">Starting ₹5,999</span>
                  </div>
                </div>
              </div>

              <div className="w-1/2 pl-8 lg:pl-16 flex flex-col justify-center">
                <span className="text-9xl md:text-[12rem] font-heading text-border font-medium leading-none">
                  {i + 1}
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
                  {[...Array(5)].map((_, dotI) => (
                    <div
                      key={dotI}
                      className={`w-2 h-2 rounded-full ${dotI === i ? 'bg-accent' : 'bg-border'}`}
                    />
                  ))}
                </div>

                <div className="mt-10">
                  <Button text="Book This Shoot" primary />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📱 MOBILE FALLBACK */}
      <div className="md:hidden px-6 py-20 space-y-16 bg-bg">
        {services.map((s, i) => (
          <div key={i}>
            <img
              src={s.img}
              className="w-full h-[250px] object-cover rounded-2xl mb-4"
            />
            <h3 className="text-2xl font-heading text-primary/95">{s.title}</h3>
            <p className="text-sm text-text-secondary">{s.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}
