import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Newborn",
    subtitle: "Tiny Humans, Big Cuteness",
    desc: "They won’t stay this small forever. We capture every yawn, stretch, and tiny toe before they start running your house.",
    img: "/images/about.webp",
  },
  {
    title: "Maternity",
    subtitle: "Glow Like You Mean It",
    desc: "You’re creating life. That deserves more than just phone photos. Elegant, powerful, and zero awkward posing.",
    img: "/images/img2.webp",
  },
  {
    title: "Birthday",
    subtitle: "Chaos = Memories",
    desc: "Cake smash, kids screaming, balloons flying — we turn chaos into moments you’ll actually want to frame.",
    img: "/images/img3.webp",
  },
  {
    title: "Wedding",
    subtitle: "Real Moments Only",
    desc: "Not just poses. We capture laughs, tears, and those blink-and-miss moments that matter the most.",
    img: "/images/img4.webp",
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

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const totalSlides = services.length;

      const tl = gsap.to(containerRef.current, {
        xPercent: -100 * (totalSlides - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalSlides * 1000}`,
          scrub: 1,
          pin: true,

          // 🔥 SNAP MAGIC (THIS IS THE KEY)
          snap: {
            snapTo: 1 / (totalSlides - 1),
            duration: 0.4,
            ease: "power1.inOut",
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* 🔥 SECTION TITLE */}
      <div className="hidden md:block text-center py-24 bg-bg">
        <h2 className="text-6xl font-heading text-primary">
          Our Services
        </h2>
        <p className="text-text-secondary mt-4 max-w-xl mx-auto">
          From first giggles to big life moments — we capture everything worth remembering.
        </p>
      </div>

      {/* 🔥 HORIZONTAL SCROLL SECTION */}
      <section ref={sectionRef} className="hidden md:block relative bg-bg">
        <div
          ref={containerRef}
          className="flex w-[500%] h-screen"
        >
          {services.map((service, i) => (
            <div
              key={i}
              className="w-screen h-screen flex items-center justify-between px-20"
            >
              {/* LEFT TEXT */}
              <div className="w-1/2 space-y-6">
                <h2 className="text-7xl font-heading text-primary">
                  {service.title}
                </h2>

                <h3 className="text-2xl text-text-secondary">
                  {service.subtitle}
                </h3>

                <p className="text-lg text-text-secondary max-w-md leading-relaxed">
                  {service.desc}
                </p>

                <div className="pt-4">
                  <Button text="Book This Shoot" primary />
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="w-1/2 flex justify-end">
                <div className="w-[85%] h-[75vh] overflow-hidden rounded-[40px] shadow-xl">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
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
            <h3 className="text-2xl font-heading text-primary">{s.title}</h3>
            <p className="text-sm text-text-secondary">{s.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}