import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import stats from "../../data/stats";

const StatItem = memo(({ stat, index, numberRefs }) => (
  <div className="stat-item group relative">
    <div className="h-full p-8 md:p-12 bg-card/40 backdrop-blur-md border border-border/50 rounded-[2.5rem] flex flex-col items-center justify-center text-center hover:bg-card/60 transition-all duration-500 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5">
      
      {/* Decoration */}
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-accent/20 rounded-tr-2xl group-hover:border-accent/60 transition-colors duration-500" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-accent/20 rounded-bl-2xl group-hover:border-accent/60 transition-colors duration-500" />

      <div 
        ref={(el) => (numberRefs.current[index] = el)}
        className="text-5xl md:text-7xl lg:text-8xl font-heading text-primary/95 group-hover:scale-110 transition-transform duration-500"
      >
        0
      </div>

      <div className="mt-6 text-sm md:text-base lg:text-lg text-text-secondary tracking-tight uppercase">
        {stat.label}
      </div>

      <div className="mt-4 w-8 h-0.5 bg-accent/30 rounded-full group-hover:w-16 group-hover:bg-accent transition-all duration-500" />
    </div>
  </div>
));

StatItem.displayName = 'StatItem';

export default function Stats() {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entry animation for stats items
      gsap.from(".stat-item", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
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
          ease: "expo.out",
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
    <section ref={sectionRef} className="py-5 md:py-40 bg-bg relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-10 md:mb-32">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading text-primary/95 leading-tight uppercase">
            Trust the <span className="italic tracking-tighter text-accent">Numbers</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {stats.map((stat, index) => (
            <StatItem 
              key={index} 
              stat={stat} 
              index={index} 
              numberRefs={numberRefs} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
