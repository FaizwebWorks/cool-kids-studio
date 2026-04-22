import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FacebookLogo, InstagramLogo, TwitterLogo, LinkedinLogo } from 'phosphor-react';

const Navbar = () => {
  const [time, setTime] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        hour: 'numeric', minute: '2-digit', hour12: true,
        timeZone: 'Asia/Kolkata'
      };
      setTime(`(${now.toLocaleTimeString('en-US', options)})`);
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    "HOME", "SERVICE", "GALLERY", "PRICING", "HOW IT WORKS", "BLOG", "CONTACT"
  ];

  const menuVariants = {
    closed: { 
      y: "-100%", 
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
    },
    open: { 
      y: 0, 
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
    }
  };

  // const linkVariants = {
  //   initial: { x: -20, opacity: 0 },
  //   enter: (i) => ({
  //     x: 0, opacity: 1,
  //     transition: { 
  //       type: "spring",
  //       stiffness: 50,
  //       damping: 15,
  //       delay: 0.5 + i * 0.05 
  //     }
  //   }),
  //   exit: { opacity: 0, transition: { duration: 0.3 } }
  // };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full px-4 md:px-8 py-4 md:py-6 flex items-center justify-between z-[100] bg-bg">
        
        {/* LEFT: MENU ICON */}
        <button 
          type="button"
          className="flex flex-col w-fit justify-center gap-1.5 md:gap-2 cursor-pointer group z-[110] scale-90 md:scale-100 p-2 -ml-2 -mt-2 h-fit"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.div 
            animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className="w-10 md:w-12 h-0.5 bg-primary origin-center will-change-transform"
          />
          <motion.div 
            animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            className="w-10 md:w-12 h-0.5 bg-primary origin-center will-change-transform"
          />
        </button>

        {/* CENTER: LOGO */}
        <div className="absolute left-1/2 -translate-x-1/2 z-[110]">
          <span className="text-xl md:text-3xl font-semibold tracking-tight text-primary">
            The Cool Kids.
          </span>
        </div>

        {/* RIGHT: LOCATION & TIME */}
        <div className="hidden sm:flex flex-col items-end text-[10px] md:text-sm font-medium tracking-wider leading-3 md:leading-4 text-primary z-[110]">
          <span>GUJARAT, INDIA</span>
          <span className="opacity-60">{time}</span>
        </div>
      </nav>

      {/* FULLSCREEN MENU OVERLAY */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-bg z-[50] flex flex-col md:flex-row items-start justify-between px-6 md:px-20 pt-24 md:pt-32 pb-10 overflow-y-auto will-change-transform"
          >
            {/* LEFT SIDE: NAV LINKS */}
            <div className="w-full md:w-1/2 flex flex-col gap-1 md:gap-4 order-1 mt-4 md:mt-0">
              {navLinks.map((link) => (
                <div
                  key={link}
                  className="overflow-hidden group relative"
                >
                  <a 
                    href="#" 
                    className="relative text-5xl sm:text-5xl md:text-6xl font-semibold font-heading text-primary/95 inline-block px-2 md:px-4 py-1 md:py-2 z-10 transition-colors duration-300"
                  >
                    {/* HOVER BACKGROUND */}
                    <span className="absolute inset-0 bg-accent -z-10 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[0.76,0,0.24,1] will-change-transform"></span>
                    {link}
                  </a>
                </div>
              ))}
            </div>

            {/* RIGHT SIDE: IMAGE & CONTACT */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-end order-2 gap-6 md:gap-10">
              {/* FEATURED IMAGE WITH FRAME */}
              <div className="w-full sm:max-w-sm md:max-w-md p-2 md:p-2.5 bg-[#E2E2E2] rounded-2xl md:rounded-3xl shadow-sm">
                <div 
                  className="w-full aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden"
                >
                  <img 
                    src="/images/about.webp" 
                    alt="Featured" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* CONTACT & SOCIALS */}
              <div className="flex flex-col items-center md:items-end gap-4 md:gap-6 text-center md:text-right">
                <div className="flex flex-col items-center md:items-end">
                  <span className="text-text-secondary text-xs md:text-lg opacity-60 font-medium">(239) 555-0108</span>
                  <a href="mailto:hello@coolkids.com" className="text-lg md:text-3xl font-bold text-primary hover:opacity-70 transition-opacity uppercase">
                    HELLO@COOLKIDS.COM
                  </a>
                </div>

                {/* SOCIAL ICONS */}
                <div className="flex gap-3 md:gap-4">
                  {[FacebookLogo, InstagramLogo, TwitterLogo, LinkedinLogo].map((Icon, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-bg transition-colors duration-300 will-change-transform"
                    >
                      <Icon size={18} weight="fill" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
