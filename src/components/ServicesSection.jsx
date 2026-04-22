import React from "react";
import { motion } from "framer-motion";

export default function ServicesSection() {
  const services = [
    {
      title: "Newborn Sessions",
      description: "Capturing those first fleeting moments of tiny fingers, sleepy smiles, and pure innocence. Every yawn, stretch, and tiny grip tells a story we preserve forever.",
      image: "/images/baby-laughing.webp",
      alt: "Newborn photography session",
    },
    {
      title: "Kids Photography",
      description: "From first steps to jumping in puddles, we document the wild, wonderful, and energetic journey of childhood. Natural moments, genuine laughter, and authentic personalities shine through.",
      image: "/images/img1.webp",
      alt: "Kids photography session",
    },
    {
      title: "Maternity & Family",
      description: "Celebrating the glow, the anticipation, and the beautiful connections that make your family uniquely yours. Timeless portraits that honor this incredible journey together.",
      image: "/images/img2.webp",
      alt: "Maternity family photography session",
    },
    {
      title: "Event Coverage",
      description: "From birthday parties to milestone celebrations, we capture the joy, emotions, and special moments that make your events unforgettable. Discreet, professional, and always ready for the perfect shot.",
      image: "/images/img3.webp",
      alt: "Event photography coverage",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-bg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-[2.5rem] sm:text-[3.5rem] font-semibold font-heading text-primary tracking-tight uppercase mb-6">
            Our Services
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm sm:text-base leading-relaxed opacity-80">
            Preserving life's most precious moments with artistic vision and genuine connection
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
              className="group relative overflow-hidden rounded-xl bg-bg/50 backdrop-blur-sm border border-bg/20"
            >
              <div className="p-6 sm:p-8">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="w-full h-48 sm:h-56 object-cover rounded-lg mb-6 shadow-sm transition-transform duration-500 group-hover:scale-105"
                />
                <h3 className="text-[1.5rem] sm:text-[1.75rem] font-semibold font-heading text-primary mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed opacity-90 mb-4">
                  {service.description}
                </p>
                <a href="#contact" className="inline-flex items-center text-primary font-medium text-sm transition-colors duration-300 hover:text-accent">
                  Learn More
                  <span className="ml-2">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}