import { motion } from "framer-motion";
import { ArrowUpRight } from "phosphor-react";

export default function Button({ text, primary, onClick }) {
  // Use Array.from to correctly split emojis and other special characters
  const characters = Array.from(text);

  return (
    <motion.button
      whileHover="hover"
      onClick={onClick}
      className={`relative flex items-center justify-center gap-3 px-8 py-4 rounded-full overflow-hidden border transition-colors duration-300 group cursor-pointer
        ${primary 
          ? "bg-accent text-primary/95 border-accent hover:bg-accent-hover hover:border-accent-hover" 
          : "bg-transparent text-primary/95 border-primary/10 hover:border-primary/40"
        }`}
    >
      {/* TEXT CONTAINER */}
      <span className="relative flex overflow-hidden font-medium text-base leading-none">
        {characters.map((char, i) => (
          <span key={i} className="relative inline-block h-[1.2em] overflow-hidden">
            
            {/* ORIGINAL */}
            <motion.span
              variants={{
                hover: { y: "-105%" },
              }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1], delay: i * 0.01 }}
              className="block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>

            {/* NEW TEXT (Coming from below) */}
            <motion.span
              variants={{
                hover: { y: 0 },
              }}
              initial={{ y: "110%" }}
              transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1], delay: i * 0.01 }}
              className="absolute top-0 left-0"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </span>
        ))}
      </span>

      {/* ICON CONTAINER */}
      <span className="relative w-5 h-5 overflow-hidden flex items-center justify-center">
        
        {/* DEFAULT ICON */}
        <motion.span
          variants={{ hover: { x: 20, y: -20, opacity: 0 } }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="absolute"
        >
          <ArrowUpRight size={20} weight="bold" />
        </motion.span>

        {/* HOVER ICON (Slides in) */}
        <motion.span
          initial={{ x: -20, y: 20, opacity: 0 }}
          variants={{ hover: { x: 0, y: 0, opacity: 1 } }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="absolute"
        >
          <ArrowUpRight size={20} weight="bold" />
        </motion.span>

      </span>
    </motion.button>
  );
}
