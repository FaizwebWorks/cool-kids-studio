import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Baby, Calendar, Heart, ArrowRight } from 'phosphor-react';
import Button from '../common/Button';

const milestones = [
  {
    label: "Newborn",
    age: "0 Days",
    icon: <Baby size={24} weight="duotone" />,
    desc: "The beginning of the journey."
  },
  {
    label: "Sitting Up",
    age: "3 Months",
    icon: <Calendar size={24} weight="duotone" />,
    desc: "First smiles and tiny giggles."
  },
  {
    label: "Crawling",
    age: "6 Months",
    icon: <Heart size={24} weight="duotone" />,
    desc: "Exploring the world on all fours."
  },
  {
    label: "First Step",
    age: "1 Year",
    icon: <Bell size={24} weight="duotone" />,
    desc: "The big first birthday celebration."
  }
];

const MilestoneReminder = () => {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-bg overflow-hidden relative">
      {/* Decorative Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-accent/3 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-black block mb-6">
              Milestone Tracking
            </span>
            <h2 className="text-5xl md:text-[7.5rem] font-heading uppercase leading-[0.85] tracking-tighter">
              We Remember, <br />
              <span className="text-primary/30 italic font-light">So You Don't Have To.</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="md:pb-4 max-w-sm"
          >
             <p className="text-lg md:text-xl text-text-secondary leading-snug font-medium">
              Babies grow fast. We make sure you 
              <span className="text-primary/95 italic"> never miss a moment </span> 
              by saving your child's milestones the day we meet them.
            </p>
          </motion.div>
        </div>

        {/* INTERACTIVE TIMELINE SECTION */}
        <div className="relative">
          {/* Main Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-primary/10 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative z-10">
            {milestones.map((ms, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="group"
              >
                <div className="bg-white border border-primary/5 rounded-[2.5rem] p-8 md:p-10 flex flex-col gap-8 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-700 h-full">
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-primary/95 transition-all duration-500">
                      {ms.icon}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-primary/30 font-bold">{ms.age}</span>
                  </div>
                  
                  <div>
                    <h4 className="text-xl md:text-2xl font-heading uppercase mb-2 text-primary/95">{ms.label}</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">{ms.desc}</p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-primary/5 flex items-center gap-2 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Auto Reminder Set</span>
                    <Bell size={14} weight="fill" className="animate-swing" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM CONTENT AREA */}
        <div className="mt-24 md:mt-40 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="p-8 md:p-12 bg-primary text-bg rounded-[3rem] shadow-3xl relative overflow-hidden"
             >
                {/* Mock Notification Visual */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl rounded-full" />
                
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-primary/95 shadow-lg shadow-accent/20">
                    <Bell size={28} weight="fill" />
                  </div>
                  <div>
                    <h5 className="font-bold text-accent uppercase tracking-widest text-xs mb-1">Incoming Notification</h5>
                    <p className="text-bg/40 text-[10px] uppercase tracking-widest font-medium">Gentle Reminder</p>
                  </div>
                </div>
                
                <h4 className="text-2xl md:text-4xl font-heading uppercase leading-tight mb-8">
                  Hey there! <span className="text-accent italic">Little One </span> is turning 6 months soon.
                </h4>
                
                <p className="text-bg/60 text-sm md:text-base leading-relaxed mb-10">
                  When we photograph your newborn, we save their birthday. At every major milestone, 
                  we'll reach out so you can preserve these fleeting moments forever.
                </p>

                <div className="h-px w-full bg-white/10 mb-8" />
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-bg/30 italic">
                  Every milestone deserves its own set of photos.
                </p>
             </motion.div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-5xl font-heading uppercase leading-none mb-8 text-primary/95">
                One Less Thing <br />
                <span className="text-accent italic">On Your List.</span>
              </h3>
              <p className="text-text-secondary text-lg leading-relaxed mb-12">
                We handle the scheduling and the tracking. All you have to do is show up 
                and enjoy the memory-making process. No stress, no missed opportunities.
              </p>
              <Button 
                text="Book a Newborn Shoot"
                onClick={() => console.log("Booking Newborn Shoot")}
                primary
              />
            </motion.div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }
        .animate-swing {
          animation: swing 2s infinite ease-in-out;
        }
      `}} />
    </section>
  );
};

export default MilestoneReminder;
