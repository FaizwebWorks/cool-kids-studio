import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'phosphor-react';

const Button = ({ 
  text, 
  primary = false, 
  Icon, 
  icon, 
  onClick, 
  className = "",
  impact = true,
  type = "button",
  disabled = false,
}) => {
  const [ripples, setRipples] = useState([]);
  const characters = Array.from(text);

  const handleClick = (e) => {
    if (impact) {
      const id = Date.now();
      setRipples(prev => [...prev, { id }]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 1000);
    }
    if (onClick) onClick(e);
  };

  const FinalIcon = icon || (Icon && <Icon size={20} weight="bold" />) || <ArrowUpRight size={20} weight="bold" />;

  return (
    <motion.button
      type={type}
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative flex items-center justify-center gap-3 px-8 py-4 rounded-full overflow-hidden border transition-colors duration-300 group cursor-pointer
        disabled:cursor-not-allowed disabled:opacity-60
        ${primary
          ? "bg-accent text-primary/95 border-accent hover:bg-accent-hover hover:border-accent-hover"
          : "bg-bg text-primary/95 border-primary/10 hover:bg-[#eaeaea]"
        }
        ${className}
      `}
    >
      {/* Signature Impact Ripple */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 20, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full pointer-events-none z-0 ${primary ? 'bg-white/40' : 'bg-primary/20'}`}
          />
        ))}
      </AnimatePresence>

      {/* TEXT CONTAINER WITH SLIDING ANIMATION */}
      <span className="relative z-10 flex overflow-hidden font-medium text-base leading-none pointer-events-none">
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
      <span className="relative z-10 w-5 h-5 overflow-hidden flex items-center justify-center pointer-events-none">
        {/* DEFAULT ICON */}
        <motion.span
          variants={{ hover: { x: 20, y: -20, opacity: 0 } }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="absolute"
        >
          {FinalIcon}
        </motion.span>

        {/* HOVER ICON (Slides in) */}
        <motion.span
          initial={{ x: -20, y: 20, opacity: 0 }}
          variants={{ hover: { x: 0, y: 0, opacity: 1 } }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className="absolute"
        >
          {FinalIcon}
        </motion.span>
      </span>
    </motion.button>
  );
};

export default Button;
