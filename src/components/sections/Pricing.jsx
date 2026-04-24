import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Star, Crown, Lightning, Phone } from 'phosphor-react';
import Button from '../common/Button';

const packages = [
  {
    name: "Starter Package",
    badge: "🥉 Starter",
    bestFor: "Portraits & Small Sessions",
    price: "₹5,000",
    description: "Perfect for quick sessions and personal branding.",
    features: [
      { text: "1-hour session", included: true },
      { text: "1 outfit / look", included: true },
      { text: "15 edited photos", included: true },
      { text: "Private online gallery", included: true },
      { text: "High-res digital download", included: true },
      { text: "Prints not included", included: false },
    ],
    cta: "Book Starter",
    highlight: false,
  },
  {
    name: "Popular Package",
    badge: "🥇 Most Popular",
    bestFor: "Newborn, Maternity, Birthday",
    price: "₹12,000",
    description: "Our most loved package for growing families.",
    features: [
      { text: "2-hour session", included: true },
      { text: "Up to 3 outfits / looks", included: true },
      { text: "40 edited photos", included: true },
      { text: "Private online gallery", included: true },
      { text: "High-res digital download", included: true },
      { text: "1 printed 12x18 frame", included: true },
      { text: "BTS short video reel", included: true },
      { text: "Priority slot booking", included: true },
    ],
    cta: "Book Popular",
    highlight: true,
  },
  {
    name: "Premium Package",
    badge: "🥈 Premium",
    bestFor: "Weddings & Functions",
    price: "₹18,000",
    priceSuffix: " onwards",
    description: "Full-scale coverage for your biggest milestones.",
    features: [
      { text: "Full-day coverage (up to 8 hrs)", included: true },
      { text: "2 photographers", included: true },
      { text: "100+ edited photos", included: true },
      { text: "Highlight video reel", included: true },
      { text: "Private online gallery", included: true },
      { text: "High-res digital download", included: true },
      { text: "Premium photo album (20 pages)", included: true },
      { text: "Same-week delivery", included: true },
    ],
    cta: "Book Premium",
    highlight: false,
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 md:py-32 px-6 md:px-12 lg:px-24 bg-bg relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-16 md:mb-24 relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-[1px] w-10 bg-primary/20" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-primary/60">
              Pricing & Packages
            </span>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <h2 className="text-5xl md:text-[7.5rem] font-heading uppercase leading-[0.85] tracking-tighter">
                <motion.span 
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  className="block"
                >
                  Simple <span className="italic font-light text-primary/40">Packages.</span>
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                  className="block text-accent font-heading"
                >
                  Zero <span className="text-primary/95">Hidden</span> Charges.
                </motion.span>
              </h2>
            </div>
            
            <div className="lg:col-span-4 lg:pb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <p className="text-lg md:text-xl text-text-secondary leading-tight font-medium">
                  Every package includes <span className="text-primary/95 italic">professional editing</span>, a private online gallery, and delivery within <span className="text-primary/95 underline decoration-accent underline-offset-4">7 days</span>.
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-bg bg-card overflow-hidden ring-1 ring-primary/5">
                        <img src={`/images/portrait${i}.webp`} alt="User" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="h-8 w-px bg-primary/10" />
                  <p className="text-[10px] uppercase tracking-widest font-bold text-primary/40 leading-none">
                    Trusted by <br /> <span className="text-primary/95 text-xs">500+ Families</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Rotating Badge */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-12 right-0 hidden xl:block pointer-events-none"
          >
            <svg viewBox="0 0 100 100" className="w-32 h-32 opacity-10">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
              <text className="text-[10px] font-bold uppercase tracking-[0.2em] fill-primary">
                <textPath xlinkHref="#circlePath">
                  • satisfaction guaranteed • premium quality •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Star size={20} weight="fill" className="text-accent" />
            </div>
          </motion.div>
        </div>

        {/* PRICING GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className={`relative flex flex-col p-6 sm:p-8 md:p-10 rounded-[2rem] sm:rounded-[2.5rem] transition-all duration-500 border group
                ${pkg.highlight 
                  ? "bg-primary text-bg border-primary shadow-2xl shadow-primary/20 scale-100 lg:scale-105 z-10" 
                  : "bg-card/50 text-primary/95 border-primary/5 hover:border-primary/20"
                }`}
            >
              {/* Badge */}
              <div className="flex justify-between items-start mb-8 sm:mb-10">
                <span className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest
                  ${pkg.highlight ? "bg-accent text-primary/95" : "bg-primary/10 text-primary/95"}
                `}>
                  {pkg.badge}
                </span>
                {pkg.highlight && (
                  <Lightning size={20} weight="fill" className="text-accent animate-pulse" />
                )}
              </div>

              {/* Title & Price */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xs sm:text-sm font-medium uppercase tracking-widest mb-2 opacity-60">
                  {pkg.bestFor}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-heading uppercase">{pkg.price}</span>
                  {pkg.priceSuffix && (
                    <span className="text-base sm:text-lg opacity-60 font-medium lowercase italic">{pkg.priceSuffix}</span>
                  )}
                </div>
              </div>

              <p className={`text-sm leading-relaxed mb-8 ${pkg.highlight ? "text-bg/60" : "text-text-secondary"}`}>
                {pkg.description}
              </p>

              {/* Features */}
              <div className="flex-grow space-y-3 sm:space-y-4 mb-8 sm:mb-12">
                {pkg.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3 group/item">
                    {feature.included ? (
                      <CheckCircle size={18} sm:size={20} weight="bold" className={pkg.highlight ? "text-accent" : "text-primary/95"} />
                    ) : (
                      <XCircle size={18} sm:size={20} weight="bold" className="text-primary/20" />
                    )}
                    <span className={`text-xs sm:text-sm font-medium ${!feature.included && "opacity-30 line-through"}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto">
                <Button 
                  text={pkg.cta} 
                  primary={pkg.highlight} 
                  onClick={() => console.log(`Booking ${pkg.name}`)}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CTA: CREATIVE SPOTLIGHT */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mt-15 sm:mt-32 relative py-12 sm:py-20 border rounded-3xl md:rounded-4xl border-primary/10 overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-repeat"
        >
          <div className="absolute inset-0 bg-accent/5 translate-x-[-100%] animate-[slide_10s_linear_infinite]" />
          
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 px-6 max-w-5xl mx-auto text-center lg:text-left">
            <div className="space-y-2">
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase text-accent">
                Custom Commissions
              </span>
              <h4 className="text-3xl sm:text-4xl md:text-5xl font-heading uppercase tracking-tight text-primary">
                Have a unique vision?
              </h4>
            </div>
            
            <div className="group relative">
              <Button 
                text="Request Custom Quote" 
                onClick={() => console.log("Custom Quote")}
                primary
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
