import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Target, 
  CalendarCheck, 
  CreditCard, 
  Camera, 
  Image as ImageIcon 
} from "phosphor-react";
import Button from "./Button";

export default function HowItWorks() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  const steps = useMemo(() => [
    {
      icon: Target,
      title: "Select Your Session",
      desc: "Browse our curated photography services and choose what fits your occasion.",
    },
    {
      icon: CalendarCheck,
      title: "Book Your Slot",
      desc: "Pick a date and time from our live calendar. Securely book in under 2 minutes.",
    },
    {
      icon: CreditCard,
      title: "Secure Deposit",
      desc: "Pay a small refundable deposit via UPI or Card to lock in your date.",
    },
    {
      icon: Camera,
      title: "Shoot Day Magic",
      desc: "We handle the lighting and props. Just show up and enjoy the experience.",
    },
    {
      icon: ImageIcon,
      title: "High-Res Gallery",
      desc: "Receive your private gallery in 7 days. Download and treasure your memories.",
    },
  ], []);

  useEffect(() => {
    // Registering ScrollTrigger locally for safety, even if globally registered
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const container = containerRef.current;
    const progressLine = lineRef.current;
    
    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
    }, (context) => {
      const { isDesktop } = context.conditions;
      const stepItems = container.querySelectorAll(".step-item");
      
      // 1. MASTER PROGRESS LINE
      // Matches the scroll perfectly from top to bottom
      gsap.fromTo(progressLine, 
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 75%", 
            end: "bottom 75%", 
            scrub: 0.5,
          },
        }
      );

      // 2. STEP REVEALS (Synced with Line)
      stepItems.forEach((el, i) => {
        const content = el.querySelector(".step-card-ui");
        const dot = el.querySelector(".step-dot-ui");
        const isEven = i % 2 === 0;
        
        // Compact movement
        const xMove = isDesktop ? (isEven ? -40 : 40) : 20;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 80%", // Syncs with the progress line reaching the card
            end: "top 50%",
            scrub: 1, // Follows scroll for that liquid feel
          }
        });

        tl.fromTo(content, 
          { opacity: 0, x: xMove, y: 20 },
          { 
            opacity: 1, 
            x: 0, 
            y: 0, 
            ease: "power2.out"
          }
        )
        .fromTo(dot,
          { scale: 0 },
          { 
            scale: 1, 
            ease: "back.out(2)"
          },
          0 // Start with the content
        );
      });
    });

    // Refresh triggers to account for dynamic layout shifts
    ScrollTrigger.refresh();

    return () => mm.revert();
  }, [steps]);

  return (
    <section className="py-20 md:py-32 bg-bg overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <header className="mb-20 md:mb-28 text-center md:text-left">
          <h2 className="text-4xl md:text-7xl text-center font-heading text-primary leading-tight tracking-tight">
            How it <span className="italic tracking-tighter">Works</span>
          </h2>
        </header>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-border/30 -translate-x-1/2 pointer-events-none">
            <div 
              ref={lineRef}
              className="absolute top-0 left-0 w-full h-full bg-accent origin-top scale-y-0 will-change-transform"
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-28">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step-item relative flex items-center gap-8 md:gap-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Card Content */}
                <div className="w-full md:w-1/2 flex flex-col pl-10 md:pl-0">
                  <div className={`step-card-ui p-6 md:p-10 rounded-[2rem] bg-card/40 backdrop-blur-xl border border-border/50 hover:border-accent/30 transition-all duration-500 group relative
                    ${index % 2 === 0 ? "md:mr-10" : "md:ml-10"}`}>
                    
                    {/* Subtle Numbering */}
                    <span className="absolute top-2 right-6 text-7xl md:text-9xl font-heading text-primary opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none select-none">
                      {index + 1}
                    </span>

                    <div className="flex flex-col gap-6 relative z-10">
                      <div className="text-accent group-hover:scale-105 transition-transform duration-500 origin-left">
                        <step.icon size={36} weight="duotone" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-3xl font-heading text-primary mb-3">
                          {step.title}
                        </h3>
                        <p className="text-sm md:text-lg text-text-secondary leading-relaxed font-medium">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Dot */}
                <div className="step-dot-ui absolute left-4 md:left-1/2 w-3.5 h-3.5 bg-border rounded-full -translate-x-1/2 z-10 border-4 border-bg shadow-xl will-change-transform" />

                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 md:mt-32 flex justify-center">
          <Button text="Start Your Journey" primary />
        </div>
      </div>
    </section>
  );
}
