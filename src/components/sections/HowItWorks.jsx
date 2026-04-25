import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Target,
  CalendarCheck,
  CreditCard,
  Camera,
  Image as ImageIcon,
} from "phosphor-react";
import Button from "../common/Button";
import { requestScrollTriggerRefresh } from "../../utils/scrollTriggerRefresh";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  const steps = useMemo(
    () => [
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
    ],
    []
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const line = lineRef.current;
      const items = gsap.utils.toArray(".step-item");

      // 🔥 Progress line (center sync)
      gsap.to(line, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 50%",
          end: "bottom 50%",
          scrub: true,
        },
      });

      // 🔥 Cards reveal (FAST + NO MISS)
      items.forEach((el, i) => {
        const card = el.querySelector(".step-card-ui");
        const dot = el.querySelector(".step-dot-ui");

        const isMobile = window.innerWidth < 768;
        const isEven = i % 2 === 0;

        // initial state (important for fast scroll)
        gsap.set(card, {
          opacity: 0,
          x: isMobile ? 40 : (isEven ? -40 : 40),
        });

        gsap.set(dot, { scale: 0 });

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%", // early trigger (no delay)
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
              overwrite: "auto",
            });

            gsap.to(dot, {
              scale: 1,
              duration: 0.3,
              ease: "back.out(2)",
              delay: 0.1,
            });
          },

          // 🔥 critical for fast scroll (reverse case)
          onEnterBack: () => {
            gsap.to(card, {
              opacity: 1,
              x: 0,
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
            });

            gsap.to(dot, {
              scale: 1,
              duration: 0.3,
              ease: "back.out(2)",
            });
          },
        });
      });

    }, containerRef);

    const cleanupRefresh = requestScrollTriggerRefresh(180);

    return () => {
      ctx.revert();
      cleanupRefresh();
    };
  }, [steps]);

  return (
    <section id="how-it-works" className="py-16 bg-bg overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <header className="mb-16 md:mb-28 text-center md:text-left">
          <h2 className="text-5xl md:text-7xl font-heading text-primary/95 leading-tight tracking-tighter uppercase">
            How it{" "}
            <span className="italic font-light text-primary/30">Works.</span>
          </h2>
        </header>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-border/40 -translate-x-1/2 pointer-events-none">
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
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                }`}
              >
                {/* Card */}
                <div className="w-full md:w-1/2 flex flex-col pl-10 md:pl-0">
                  <div
                    className={`step-card-ui p-6 md:p-10 rounded-[2rem] bg-card/40 backdrop-blur-xl border border-primary/5 transition-all duration-500 group relative
                    ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"}`}
                  >
                    <span className="absolute top-2 right-6 text-7xl md:text-9xl font-heading text-primary/95 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none select-none">
                      {index + 1}
                    </span>

                    <div className="flex flex-col gap-6 relative z-10">
                      <div className="text-accent group-hover:scale-110 transition-transform duration-500 origin-left">
                        <step.icon size={32} weight="duotone" />
                      </div>

                      <div>
                        <h3 className="text-xl md:text-3xl font-heading text-primary/95 mb-4 uppercase tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-sm md:text-base text-text-secondary leading-relaxed font-medium">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dot */}
                <div className="step-dot-ui absolute left-4 md:left-1/2 w-3 h-3 bg-[#d9e4ae] border border-accent rounded-full -translate-x-1/2 z-10 shadow-xl" />

                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-36 flex justify-center">
          <Button text="Start Your Journey" primary />
        </div>
      </div>
    </section>
  );
}
