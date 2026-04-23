import React from 'react';
import { motion } from 'framer-motion';
import { Lock, DownloadSimple, DeviceMobile, Image, Clock } from 'phosphor-react';
import Button from './Button';

const features = [
  {
    icon: <Lock weight="duotone" size={20} />,
    title: "Password Protected",
    desc: "Only you and your chosen ones can access."
  },
  {
    icon: <DownloadSimple weight="duotone" size={20} />,
    title: "One-Click Download",
    desc: "Get all your high-res photos instantly."
  },
  {
    icon: <DeviceMobile weight="duotone" size={20} />,
    title: "Multi-Device Sync",
    desc: "Works perfectly on mobile, tablet & desktop."
  },
  {
    icon: <Image weight="duotone" size={20} />,
    title: "Print Ready",
    desc: "High-resolution files optimized for printing."
  },
  {
    icon: <Clock weight="duotone" size={20} />,
    title: "6-Month Access",
    desc: "Your gallery stays live for half a year."
  }
];

const PrivateGallery = () => {
  return (
    <section className="pb-16 md:pt-5 md:pb-20 px-6 md:px-12 lg:px-24 bg-bg overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/2 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT CONTENT */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent uppercase tracking-[0.4em] text-[9px] font-black block mb-4">
                Private Access
              </span>
              <h2 className="text-4xl md:text-7xl font-heading uppercase leading-[0.85] tracking-tighter mb-6">
                Your Photos, <br />
                <span className="text-primary/30 italic font-light">Safe & Beautiful</span>
              </h2>
              <p className="text-base md:text-xl text-text-secondary leading-snug font-medium mb-10 max-w-lg">
                No more receiving 80 blurry photos on WhatsApp. Every shoot comes with a 
                <span className="text-primary italic"> dedicated digital vault</span> built just for you.
              </p>

              {/* FEATURES LIST */}
              <div className="space-y-5 mb-12">
                {features.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-primary/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-500 shadow-sm shadow-primary/5 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-primary uppercase tracking-wider text-xs mb-1">{item.title}</h4>
                      <p className="text-text-secondary text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button 
                text="See Sample Gallery"
                onClick={() => window.location.href = "#"}
                primary
              />
            </motion.div>
          </div>

          {/* RIGHT VISUAL: OPTIMIZED HIGH-END MOCKUP */}
          <div className="order-1 lg:order-2 relative h-[400px] md:h-[550px] flex items-center justify-center lg:justify-end">
            
            {/* Main Tablet Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-[320px] md:w-[480px] aspect-[4/3] bg-white border-[6px] md:border-[10px] border-primary rounded-[2.5rem] shadow-2xl overflow-hidden z-20"
            >
              <div className="w-full h-full flex flex-col bg-gray-50">
                <div className="px-6 py-4 border-b border-black/5 flex justify-between items-center bg-white">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[10px] font-bold tracking-widest text-primary/40 uppercase italic">The Cool Kids Gallery</div>
                  <div className="w-6 h-6 rounded-full bg-accent/20" />
                </div>
                
                <div className="p-4 grid grid-cols-2 gap-2 flex-grow overflow-hidden">
                  <img src="/images/newborn1.webp" className="w-full h-full object-cover rounded-xl shadow-sm" alt="Gallery" />
                  <img src="/images/birthday1.webp" className="w-full h-full object-cover rounded-xl shadow-sm" alt="Gallery" />
                  <img src="/images/maternity1.webp" className="w-full h-full object-cover rounded-xl shadow-sm" alt="Gallery" />
                  <img src="/images/wedding1.webp" className="w-full h-full object-cover rounded-xl shadow-sm" alt="Gallery" />
                </div>
              </div>
            </motion.div>

            {/* Floating Phone Mockup */}
            <motion.div 
              initial={{ x: 60, y: 120, opacity: 0, rotate: 12 }}
              whileInView={{ x: 40, y: 100, opacity: 1, rotate: 8 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="absolute bottom-0 -right-4 w-[140px] md:w-[200px] h-[280px] md:h-[400px] bg-primary border-[6px] md:border-[8px] border-white/5 rounded-[2rem] shadow-3xl z-30 overflow-hidden hidden md:block"
            >
              <div className="w-full h-full flex flex-col">
                <div className="h-6 w-full flex items-center justify-center">
                  <div className="w-12 h-1 bg-white/10 rounded-full" />
                </div>
                <img src="/images/portrait1.webp" className="w-full h-full object-cover rounded-t-lg" alt="Mobile Preview" />
              </div>
            </motion.div>

            {/* Floating Newborn Photo - Static Tilt */}
            <motion.div 
              initial={{ opacity: 0, y: 20, rotate: -10 }}
              whileInView={{ opacity: 1, y: 0, rotate: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute -top-10 left-10 md:left-20 w-24 md:w-36 aspect-square bg-white p-2 rounded-xl shadow-xl z-10 border border-primary/5 hidden lg:block"
            >
               <img src="/images/newborn2.webp" alt="Preview" className="w-full h-full object-cover rounded-lg" />
            </motion.div>

            {/* Floating Birthday Photo - Static Tilt */}
            <motion.div 
              initial={{ opacity: 0, y: -20, rotate: 12 }}
              whileInView={{ opacity: 1, y: 0, rotate: 8 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
              className="absolute -bottom-10 left-0 w-32 md:w-44 aspect-[3/4] bg-white p-2 rounded-xl shadow-xl z-40 border border-primary/5 hidden lg:block"
            >
               <img src="/images/birthday2.webp" alt="Preview" className="w-full h-full object-cover rounded-lg" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PrivateGallery;
