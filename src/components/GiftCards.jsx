import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Sparkle, CheckCircle, ArrowRight, Selection, ShieldCheck, EnvelopeOpen, CalendarCheck } from 'phosphor-react';
import Button from './Button';

const giftAmounts = [
  { label: "Starter", value: "2000" },
  { label: "Popular", value: "5000" },
  { label: "Premium", value: "12000" },
  { label: "Custom", value: "" }
];

const occasionTags = [
  "Baby Showers", "Anniversaries", "Birthdays", "Mother's Day"
];

const steps = [
  { 
    id: "01", 
    title: "Choose Amount", 
    desc: "Select a pre-set value or enter a custom amount for your gift.",
    icon: <Selection size={28} weight="duotone" />
  },
  { 
    id: "02", 
    title: "Instant Payment", 
    desc: "Pay securely via UPI or Card. Process is quick and encrypted.",
    icon: <ShieldCheck size={28} weight="duotone" />
  },
  { 
    id: "03", 
    title: "Receive Card", 
    desc: "Get a beautifully designed digital gift card in your inbox instantly.",
    icon: <EnvelopeOpen size={28} weight="duotone" />
  },
  { 
    id: "04", 
    title: "Gift & Book", 
    desc: "Send it to your loved one. They can book their session anytime.",
    icon: <CalendarCheck size={28} weight="duotone" />
  }
];

const GiftCards = () => {
  const [selectedAmount, setSelectedAmount] = useState("5000");
  const [isCustom, setIsCustom] = useState(false);
  const [customVal, setCustomVal] = useState("");

  const handleSelect = (amt) => {
    if (amt.label === "Custom") {
      setIsCustom(true);
      setSelectedAmount(customVal || "0");
    } else {
      setIsCustom(false);
      setSelectedAmount(amt.value);
    }
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    setCustomVal(val);
    setSelectedAmount(val || "0");
  };

  const displayAmount = selectedAmount === "0" || !selectedAmount ? "Any Amount" : `₹${Number(selectedAmount).toLocaleString('en-IN')}`;

  return (
    <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-20 md:mb-32 items-end">
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent uppercase tracking-[0.3em] text-[10px] font-medium block mb-6">
                Gift Something Meaningful
              </span>
              <h2 className="text-5xl md:text-[7.5rem] font-heading uppercase leading-[0.85] tracking-tighter">
                Give the Gift <br />
                <span className="text-primary/30 italic font-light">of a Memory.</span>
              </h2>
            </motion.div>
          </div>
          
          <div className="lg:col-span-4 lg:pb-4">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg md:text-xl text-text-secondary leading-snug font-medium"
            >
              Because toys get forgotten. Photos last forever. Perfect for those who 
              <span className="text-primary italic"> value experiences </span> over possessions.
            </motion.p>
          </div>
        </div>

        {/* MAIN INTERACTIVE AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-20">
          
          {/* LEFT: GIFT CARD VISUAL */}
          <div className="relative group perspective-1000">
            <motion.div
              initial={{ opacity: 0, rotateY: -15, scale: 0.95 }}
              whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="relative aspect-[1.6/1] w-full max-w-[500px] mx-auto"
            >
              <div className="w-full h-full bg-primary rounded-[2rem] p-8 md:p-12 flex flex-col justify-between shadow-3xl relative overflow-hidden ring-1 ring-white/10 group-hover:scale-[1.02] transition-transform duration-700">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center border border-accent/20">
                    <Sparkle size={24} weight="fill" className="text-accent" />
                  </div>
                  <div className="text-white/20 font-heading text-4xl italic leading-none">The Cool Kids</div>
                </div>

                <div className="relative z-10">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Gift Value</div>
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={displayAmount}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-4xl md:text-6xl text-accent font-heading uppercase truncate"
                    >
                      {displayAmount}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-end relative z-10">
                  <div className="text-[10px] uppercase tracking-widest text-white/30">
                    Valid for all session types <br /> No expiry date
                  </div>
                  <CreditCard size={32} weight="thin" className="text-white/20" />
                </div>
              </div>
              <div className="absolute -inset-4 bg-accent/5 rounded-[2.5rem] blur-2xl -z-10 group-hover:bg-accent/10 transition-colors duration-700" />
            </motion.div>

            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {occasionTags.map((tag, idx) => (
                <motion.span 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  className="px-5 py-2 border border-primary/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary/60 hover:border-accent hover:text-primary transition-all cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* RIGHT: CONFIGURATION */}
          <div className="flex flex-col gap-10">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-6">Select Amount</h4>
              <div className="grid grid-cols-2 gap-4">
                {giftAmounts.map((amt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(amt)}
                    className={`p-6 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group
                      ${(isCustom && amt.label === "Custom") || (!isCustom && selectedAmount === amt.value && amt.label !== "Custom")
                        ? "bg-primary border-primary shadow-xl shadow-primary/10" 
                        : "bg-white border-primary/5 hover:border-primary/20"
                      }`}
                  >
                    <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 
                      ${((isCustom && amt.label === "Custom") || (!isCustom && selectedAmount === amt.value && amt.label !== "Custom")) ? "text-accent" : "text-primary/40"}`}>
                      {amt.label}
                    </div>
                    
                    {amt.label === "Custom" ? (
                      <div className="flex items-center">
                        <span className={`text-xl font-heading uppercase mr-1 ${isCustom ? "text-white" : "text-primary"}`}>₹</span>
                        <input 
                          type="text"
                          placeholder="Amount"
                          value={customVal}
                          onChange={handleCustomChange}
                          onFocus={() => setIsCustom(true)}
                          className={`w-full bg-transparent border-none outline-none font-heading text-xl uppercase p-0
                            ${isCustom ? "text-white placeholder:text-white/20" : "text-primary placeholder:text-primary/20"}`}
                        />
                      </div>
                    ) : (
                      <div className={`text-xl font-heading uppercase 
                        ${selectedAmount === amt.value && !isCustom ? "text-white" : "text-primary"}`}>
                        ₹{Number(amt.value).toLocaleString('en-IN')}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm font-medium text-text-secondary">
                <CheckCircle size={20} weight="fill" className="text-accent" />
                <span>Instant delivery via Email or WhatsApp</span>
              </div>
              <div className="flex items-center gap-4 text-sm font-medium text-text-secondary">
                <CheckCircle size={20} weight="fill" className="text-accent" />
                <span>Personalized message for the recipient</span>
              </div>
              
              <div className="pt-4">
                <Button 
                  text="Buy a Gift Card"
                  onClick={() => console.log("Buying Gift Card for:", selectedAmount)}
                  primary
                />
              </div>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS SECTION - REIMAGINED */}
        <div className="relative">
           <div className="relative z-10">
              <div className="mb-10 md:mb-20 text-center lg:text-left">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-primary/40 block mb-2">Process</span>
                <h3 className="text-3xl md:text-5xl font-heading uppercase">Simple Flow. <span className="text-primary/20 italic">Instant Joy.</span></h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx, duration: 0.6 }}
                    className="relative group bg-card/20 backdrop-blur-sm border border-primary/5 rounded-[2rem] p-8 hover:bg-white hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500"
                  >
                    {/* Icon Container */}
                    <div className="w-14 h-14 rounded-2xl bg-white border border-primary/5 flex items-center justify-center text-accent mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                      {step.icon}
                    </div>

                    <div className="flex items-baseline gap-4 mb-4">
                      <span className="text-2xl font-heading text-primary/10 group-hover:text-accent/30 transition-colors">{step.id}</span>
                      <h4 className="font-bold text-primary uppercase tracking-wider text-sm">
                        {step.title}
                      </h4>
                    </div>

                    <p className="text-text-secondary text-sm leading-relaxed font-medium">
                      {step.desc}
                    </p>

                    {/* Desktop Step Connector Arrow */}
                    {idx < steps.length - 1 && (
                      <div className="hidden lg:flex absolute -right-6 top-14 items-center justify-center text-primary/10 z-20">
                        <ArrowRight size={20} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default GiftCards;
