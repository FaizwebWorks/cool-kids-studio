import React from 'react';
import { motion } from 'framer-motion';
import { WhatsappLogo, Sparkle } from 'phosphor-react';
import Button from './Button';
import { useSectionNavigation } from '../../hooks/useSectionNavigation';

const CTABanner = () => {
  const navigateToSection = useSectionNavigation();

  const whatsappNumber = "9023827460";
  const whatsappMsg = encodeURIComponent("Hi The Cool Kids Studio! I just saw your beautiful work on the website and would love to chat about booking a session.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;


  return (
    <section className="py-24 md:py-26 px-6 md:px-12 lg:px-24 bg-primary relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />

        {/* Background Marquee Text - Subtle Urgency */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full flex whitespace-nowrap opacity-[0.03] select-none">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="text-[25vw] font-heading uppercase leading-none pr-10"
          >
            Limited Slots Available • Book Your Date • Memories Forever •
          </motion.div>
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="text-[25vw] font-heading uppercase leading-none pr-10"
          >
            Limited Slots Available • Book Your Date • Memories Forever •
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <Sparkle size={16} weight="fill" className="text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Final Call</span>
          </div>

          <h2 className="text-5xl md:text-8xl lg:text-[8.5rem] font-heading uppercase leading-[0.85] tracking-tighter text-white mb-10">
            Ready to Make <br />
            <span className="text-accent italic font-light">Memories</span> That <br />
            <span className="opacity-20 italic">Last Forever?</span>
          </h2>

          <p className="text-lg md:text-2xl text-white/40 leading-snug font-medium mb-16 max-w-2xl mx-auto italic">
            Slots fill up fast — especially around festivals and baby season.
            Don't wait until <span className="text-white">it's too late.</span>
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              text="Book My Session Now"
              onClick={() => navigateToSection('contact')}
              primary
            />

            <motion.button
              whileHover="hover"
              whileTap={{ scale: 0.96 }}
              onClick={() => window.open(whatsappUrl, '_blank', 'noopener,noreferrer')}
              className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-full overflow-hidden border transition-all duration-500 group cursor-pointer bg-bg text-primary/95 hover:bg-accent"
            >

              {/* ICON LEFT */}
              <motion.span
                variants={{
                  hover: {
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1
                  }
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-accent-hover group-hover:text-primary/95 relative z-10"
              >
                <WhatsappLogo size={22} weight="duotone" />
              </motion.span>

              {/* TEXT ANIMATION */}
              <span className="relative z-10 flex overflow-hidden font-medium text-base leading-none">
                {Array.from("WhatsApp Us First").map((char, i) => (
                  <span key={i} className="relative inline-block h-[1.2em] overflow-hidden">
                    {/* ORIGINAL */}
                    <motion.span
                      variants={{ hover: { y: "-105%" } }}
                      transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1], delay: i * 0.015 }}
                      className="block"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>

                    {/* HOVER TEXT */}
                    <motion.span
                      initial={{ y: "110%" }}
                      variants={{ hover: { y: 0 } }}
                      transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1], delay: i * 0.015 }}
                      className="absolute top-0 left-0 text-primary/95"
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  </span>
                ))}
              </span>
            </motion.button>

          </div>

          {/* FOOTER SMALL TEXT */}
          <div className="mt-16 md:mt-24 pt-12 border-t border-white/5">
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
              {["No booking fee", "Free consultation", "Cancel anytime"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-accent" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/30 italic">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-white/5 rounded-tl-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-white/5 rounded-br-3xl pointer-events-none" />
    </section>
  );
};

export default CTABanner;
