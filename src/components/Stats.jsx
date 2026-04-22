import { useEffect, useRef } from "react";
import gsap from "gsap";
import stats from "../data/stats";

export default function Stats() {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animation for stats items
      gsap.from(sectionRef.current.querySelectorAll('.stat-item'), {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        }
      });

      stats.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;
        
        const targetValue = parseFloat(stat.number.replace(/,/g, ""));
        const suffix = stat.number.replace(/[\d.,]/g, "");
        const isDecimal = stat.number.includes(".");

        const obj = { value: 0 };
        gsap.to(obj, {
          value: targetValue,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          onUpdate: () => {
            el.innerText = isDecimal 
              ? obj.value.toFixed(1) + suffix 
              : Math.floor(obj.value).toLocaleString() + suffix;
          },
        });
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
              className="text-center group stat-item"
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