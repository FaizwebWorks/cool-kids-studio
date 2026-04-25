import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";

const textLines = [
  "FROM TINY [giggles] TO BIG [milestones]",
  "CAPTURED BEFORE IT [slips] AWAY",
];

const imageMap = {
  giggles: "/images/baby-laughing.webp",
  milestones: "/images/birthday.webp",
  slips: "/images/running-kid.webp",
};

const springTransition = (delay) => ({
  type: "spring",
  stiffness: 40,
  damping: 15,
  mass: 0.8,
  delay: delay,
});

const AnimatedPart = React.memo(({ part, partIdx, lineIdx, staggerOffset }) => {
  if (part.startsWith("[") && part.endsWith("]")) {
    const key = part.slice(1, -1).toLowerCase();
    const imgSrc = imageMap[key];

    if (imgSrc) {
      return (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={springTransition(staggerOffset * 0.02 + lineIdx * 0.15)}
          className="inline-block mx-1 md:mx-2 align-middle will-change-transform"
        >
          <img
            src={imgSrc}
            alt={key}
            loading="eager"
            className="w-16 h-10 md:w-28 md:h-16 object-cover rounded-xl shadow-sm hover:scale-105 transition-transform duration-300 pointer-events-auto"
          />
        </motion.div>
      );
    }
  }

  const chars = Array.from(part);
  return chars.map((char, charIdx) => (
    <motion.span
      key={`${partIdx}-${charIdx}`}
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={springTransition((staggerOffset + charIdx) * 0.02 + lineIdx * 0.15)}
      className="text-[3rem] sm:text-[3.5rem] md:text-[5rem] font-semibold font-heading text-primary/95 inline-block tracking-tight uppercase will-change-transform"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ));
});

AnimatedPart.displayName = 'AnimatedPart';

export default function Hero() {
  const renderedContent = useMemo(() => {
    return textLines.map((line, lineIdx) => {
      const parts = line.split(/(\[.*?\])/);
      let cumulativeStagger = 0;

      const elements = parts.map((part, partIdx) => {
        const offset = cumulativeStagger;
        if (part.startsWith("[") && part.endsWith("]")) {
          cumulativeStagger += 5;
        } else {
          cumulativeStagger += part.length;
        }

        return (
          <AnimatedPart 
            key={partIdx} 
            part={part} 
            partIdx={partIdx} 
            lineIdx={lineIdx} 
            staggerOffset={offset} 
          />
        );
      });

      return (
        <div key={lineIdx} className="flex justify-center items-center flex-wrap overflow-hidden py-2 leading-[1.1]">
          {elements}
        </div>
      );
    });
  }, []);

  const fullText = textLines.join(" ").replace(/\[|\]/g, "");

  return (
    <section className="h-full w-full flex flex-col items-center justify-center text-center px-4 md:px-6 relative overflow-hidden pointer-events-none bg-bg" aria-label="Welcome section">
      <h1 className="sr-only">{fullText}</h1>
      
      <div className="space-y-1 md:space-y-4 max-w-[95vw] pointer-events-auto" aria-hidden="true">
        {renderedContent}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className="mt-8 text-center text-text-secondary max-w-sm md:max-w-xl text-sm md:text-lg font-normal leading-relaxed opacity-70 will-change-transform"
      >
        Babies grow. Kids get hyper. Weddings get emotional. <br className="hidden md:block" />
        Good thing we're there to freeze it all before it disappears.
      </motion.p>

      <div className="flex flex-col items-center sm:flex-row gap-4 md:gap-5 mt-8 sm:mt-14 pointer-events-auto w-full sm:w-auto px-0 sm:px-0">
        <Button text="Book Your Session" primary />
      </div>
    </section>
  );
}
