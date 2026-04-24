import React from 'react';
import { motion } from 'framer-motion';
import { 
  InstagramLogo, 
  WhatsappLogo, 
  ArrowUpRight,
  Heart,
  Sparkle
} from 'phosphor-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: "Home", href: "#" },
      { name: "Services", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Gallery", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Gift Cards", href: "#" }
    ],
    services: [
      { name: "Newborn", href: "#" },
      { name: "Maternity", href: "#" },
      { name: "Wedding", href: "#" },
      { name: "Birthday", href: "#" },
      { name: "Portrait", href: "#" },
      { name: "Fashion", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms & Conditions", href: "#" },
      { name: "Refund Policy", href: "#" }
    ]
  };

  const socialLinks = [
    { 
      icon: <InstagramLogo size={20} weight="fill" />, 
      label: "Instagram", 
      handle: "@the_coolkids_studi0",
      href: "https://instagram.com/the_coolkids_studi0" 
    },
    { 
      icon: <WhatsappLogo size={20} weight="fill" />, 
      label: "WhatsApp", 
      handle: "+91 79471 16815",
      href: "https://wa.me/917947116815" 
    }
  ];

  // Animated Link Component for consistency
  const AnimatedLink = ({ name, href }) => (
    <li>
      <a href={href} className="group relative w-fit block overflow-hidden py-1">
        <div className="flex flex-col transition-transform duration-500 ease-[0.76,0,0.24,1] group-hover:-translate-y-full">
          <span className="text-sm md:text-base font-medium text-white/60 whitespace-nowrap">
            {name}
          </span>
          <span className="absolute top-full left-0 text-sm md:text-base font-medium text-accent italic whitespace-nowrap">
            {name}
          </span>
        </div>
        <div className="absolute bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-100" />
      </a>
    </li>
  );

  return (
    <footer className="bg-primary text-white pt-16 md:pt-24 pb-8 md:pb-12 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Decorative Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] md:w-[50%] h-[50%] bg-accent/20 blur-[100px] md:blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TOP SECTION: TAGLINE & LOGO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 md:mb-32">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[10vw] sm:text-4xl md:text-6xl lg:text-7xl font-heading uppercase leading-[1.1] tracking-tighter mb-8 max-w-3xl">
                Capturing <span className="text-accent italic font-light">tiny moments</span> <br />
                before they <span className="opacity-40 italic">grow up.</span>
              </h2>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-6 md:gap-12 mt-8 md:mt-12">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary group-hover:border-accent transition-all duration-300 shrink-0">
                      {social.icon}
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-white/40 group-hover:text-accent transition-colors">
                        {social.label}
                      </span>
                      <span className="text-sm font-medium tracking-tight group-hover:text-white transition-colors">
                        {social.handle}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-between border-t border-white/5 pt-8 lg:border-t-0 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-left lg:text-right"
            >
              <span className="text-xl md:text-3xl font-semibold tracking-tighter text-white block mb-1">
                The Cool Kids.
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Studio</span>
            </motion.div>

            <motion.button
              // whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group cursor-pointer text-accent hover:border-accent/70 transition-all duration-500 shadow-xl"
            >
              <ArrowUpRight size={20} weight="bold" className="group-hover:-rotate-45 transition-transform duration-500" />
            </motion.button>
          </div>
        </div>

        {/* MIDDLE SECTION: LINKS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-y-12 gap-x-8 pb-16 md:pb-32 border-b border-white/5">
          
          <div className="col-span-1 lg:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-6 md:mb-8">Quick Links</h4>
            <ul className="flex flex-col">
              {footerLinks.quickLinks.map((link, i) => (
                <AnimatedLink key={i} {...link} />
              ))}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-6 md:mb-8">Services</h4>
            <ul className="flex flex-col">
              {footerLinks.services.map((link, i) => (
                <AnimatedLink key={i} {...link} />
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-6 md:mb-8">Legal</h4>
            <ul className="flex flex-col">
              {footerLinks.legal.map((link, i) => (
                <AnimatedLink key={i} {...link} />
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-3 flex flex-col justify-end mt-4 lg:mt-0">
            <div className="p-6 md:p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-sm group hover:border-accent/20 transition-colors duration-500">
              <p className="text-sm text-white/40 leading-relaxed mb-6 italic group-hover:text-white/60 transition-colors">
                "We don't just take photographs, we create heirlooms that your children's children will cherish."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart size={14} weight="fill" className="text-accent" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-accent transition-colors">Made for you</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: COPYRIGHT & CREDIT */}
        <div className="pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="text-[10px] md:text-xs font-medium text-white/20 tracking-[0.2em] uppercase">
            © {currentYear} The Cool Kids Studio. All rights reserved.
          </div>
          
          <div className="flex items-center gap-2 text-[10px] md:text-xs font-medium text-white/30 tracking-[0.15em] group cursor-default">
            <span>Designed and developed by</span>
            <a href="https://thyrtn.com" target="_blank" rel="noopener noreferrer" className="text-white/60 font-bold group-hover:text-accent transition-colors duration-300 flex items-center gap-1.5">
              thyrtn.com
              <Sparkle size={12} weight="fill" className="text-accent animate-pulse" />
            </a>
          </div>
        </div>

      </div>

      {/* Background Marquee (Very Subtle) */}
      <div className="absolute bottom-0 left-0 w-full opacity-[0.02] pointer-events-none select-none pb-4 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="text-[20vw] lg:text-[15vw] font-heading whitespace-nowrap uppercase leading-none"
        >
          The Cool Kids Studio • Memories Forever • Capturing Moments • 
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
