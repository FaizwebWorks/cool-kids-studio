import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import stats from "../data/stats";

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      numberRefs.current.forEach((el, i) => {
        if (!el) return;
        
        const target = parseFloat(stats[i].number);
        const isDecimal = target % 1 !== 0;
        const suffix = stats[i].number.replace(/[\d.,]/g, "");

        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            snap: { innerText: isDecimal ? 0.1 : 1 },
            onUpdate: function () {
              const current = parseFloat(this.targets()[0].innerText);
              el.innerText = isDecimal 
                ? current.toFixed(1) + suffix 
                : Math.round(current) + suffix;
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary font-medium">
            Numbers That Speak for Themselves
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div 
                ref={(el) => (numberRefs.current[index] = el)}
                className="text-5xl md:text-6xl lg:text-7xl font-heading text-primary/95 font-semibold group-hover:text-accent transition-colors duration-300"
              >
                0
              </div>

              <div className="mt-3 text-sm md:text-base text-text-secondary font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}