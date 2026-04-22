import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    emoji: "🎯",
    title: "Pick Your Shoot",
    desc: "Browse our services and choose the type of photography that fits your occasion. Not sure? WhatsApp us — we'll guide you.",
  },
  {
    emoji: "📅",
    title: "Choose Your Slot",
    desc: "Select a date and time that works for you from our live availability calendar. Book online in under 2 minutes.",
  },
  {
    emoji: "💳",
    title: "Pay a Small Deposit",
    desc: "Secure your booking with a refundable deposit via Razorpay (UPI / Card / Net Banking). The rest on shoot day.",
  },
  {
    emoji: "📸",
    title: "Show Up & Shine",
    desc: "We handle the rest — setup, lighting, props, poses. Just bring your family and your smiles.",
  },
  {
    emoji: "🖼️",
    title: "Receive Your Gallery",
    desc: "Within 7 days, your private password-protected gallery is delivered to your inbox. Download. Print. Treasure forever.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current.querySelectorAll(".step-card");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-bg overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block text-sm md:text-base text-accent font-medium tracking-widest uppercase mb-4">
            Simple as 1–2–3
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary font-medium">
            Booking Your Session is Effortless
          </h2>
        </div>

        <div
          ref={containerRef}
          className="relative"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-card relative group cursor-default"
              >
                <div className={`relative bg-card p-8 rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${index % 2 === 1 ? 'md:mt-12' : ''}`}>
                  <div className="absolute -top-4 left-8 w-12 h-12 bg-accent font-heading rounded-full flex items-center justify-center text-2xl shadow-lg">
                    {index + 1}
                  </div>

                  <div className="flex items-start gap-4 mt-4">
                    <span className="text-4xl">{step.emoji}</span>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-heading text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16 md:mt-20">
          <Button text="Book Your Session" primary />
        </div>
      </div>
    </section>
  );
}