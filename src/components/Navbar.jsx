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
    closed: { y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    open: { y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
  };

  const linkVariants = {
    initial: { x: -20, opacity: 0 },
    enter: (i) => ({
      x: 0, opacity: 1,
      transition: { duration: 0.5, delay: 0.5 + i * 0.07, ease: [0.33, 1, 0.68, 1] }
    }),
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full px-8 py-6 flex items-center justify-between z-[110] bg-transparent">
        
        {/* LEFT: MENU ICON (ANIMATED TO CROSS) */}
        <div 
          className="flex flex-col gap-[8px] cursor-pointer group z-[120]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.div 
            animate={isMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            className="w-12 h-[2px] bg-primary origin-center"
          />
          <motion.div 
            animate={isMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            className="w-12 h-[2px] bg-primary origin-center"
          />
        </div>

        {/* CENTER: LOGO */}
        <div className="absolute left-1/2 -translate-x-1/2 z-[120]">
          <span className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
            The Cool Kids.
          </span>
        </div>

        {/* RIGHT: LOCATION & TIME */}
        <div className="flex flex-col items-end text-xs md:text-sm font-medium tracking-wider text-primary z-[120]">
          <span>GUJARAT, INDIA</span>
          <span className="opacity-60">{time}</span>
        </div>
      </nav>

      {/* FULLSCREEN MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-bg z-[100] flex flex-col md:flex-row items-center px-10 md:px-20 pt-32 pb-10 overflow-y-auto"
          >
            {/* LEFT SIDE: NAV LINKS */}
            <div className="w-full md:w-1/2 flex flex-col gap-2 md:gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link}
                  custom={i}
                  variants={linkVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  className="overflow-hidden group relative"
                >
                  <a 
                    href="#" 
                    className="relative text-4xl md:text-6xl font-bold font-heading text-primary inline-block px-4 py-2 z-10 transition-colors duration-300 group-hover:text-primary"
                  >
                    {/* HOVER BACKGROUND */}
                    <span className="absolute inset-0 bg-accent -z-10 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[0.76,0,0.24,1]"></span>
                    {link}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* RIGHT SIDE: IMAGE & CONTACT */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-end mt-10 md:mt-0 gap-10">
              {/* FEATURED IMAGE */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="w-full max-w-md aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl"
              >
                <img 
                  src="/images/about.avif" 
                  alt="Featured" 
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* CONTACT & SOCIALS */}
              <div className="flex flex-col items-center md:items-end gap-6 text-right">
                <div className="flex flex-col items-center md:items-end">
                  <span className="text-text-secondary text-sm md:text-lg opacity-60">(239) 555-0108</span>
                  <a href="mailto:HELLO@STORYPIXEL.COM" className="text-xl md:text-3xl font-bold text-primary hover:opacity-70 transition-opacity">
                    HELLO@STORYPIXEL.COM
                  </a>
                </div>

                {/* SOCIAL ICONS */}
                <div className="flex gap-4">
                  {[FacebookLogo, InstagramLogo, TwitterLogo, LinkedinLogo].map((Icon, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-bg transition-colors duration-300"
                    >
                      <Icon size={20} weight="fill" />
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
