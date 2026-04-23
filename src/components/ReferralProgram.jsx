import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, Ticket, UsersThree, Gift, ArrowRight } from 'phosphor-react';
import Button from './Button';

const steps = [
  {
    icon: <Ticket size={24} weight="duotone" />,
    title: "Get Your Code",
    desc: "After your shoot, a unique referral code is automatically generated for you."
  },
  {
    icon: <UsersThree size={24} weight="duotone" />,
    title: "Share the Love",
    desc: "Send your code to friends and family who haven't booked with us yet."
  },
  {
    icon: <Handshake size={24} weight="duotone" />,
    title: "Friend Books",
    desc: "They get an instant ₹500 discount when they book their first session."
  },
  {
    icon: <Gift size={24} weight="duotone" />,
    title: "You Save Too",
    desc: "You receive a ₹500 credit in your account for your next session."
  }
];

const ReferralProgram = () => {
  return (
    <section className="py-16 md:py-20 px-6 md:px-12 lg:px-24 bg-bg overflow-hidden relative">
      {/* Subtle Background Text */}
      <div className="absolute hidden md:block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] whitespace-nowrap">
        <span className="text-[20vw] font-heading uppercase leading-none">Share Value</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-20 md:mb-16 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-black block mb-6">
                Referral Rewards
              </span>
              <h2 className="text-4xl md:text-7xl lg:text-[6.5rem] font-heading uppercase leading-[0.85] tracking-tighter">
                Refer a Friend. <br />
                <span className="text-primary italic font-light opacity-30">Both of You Save.</span>
              </h2>
            </motion.div>
          </div>
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-lg md:text-xl text-text-secondary leading-snug font-medium">
                Love your photos? Share the love — and get rewarded. It's that simple.
                <span className="text-primary italic"> Happy clients</span> are our best marketing.
              </p>
              <div className="h-px w-20 bg-accent" />
            </motion.div>
          </div>
        </div>

        {/* MAIN VISUAL: THE "DOUBLE REWARD" CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-0 md:mb-16">

          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              {/* Reward Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-10 bg-primary text-bg rounded-[2.5rem] flex flex-col gap-12 shadow-2xl relative overflow-hidden"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                    <Ticket size={24} className="text-accent" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">For Them</span>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2 font-bold">Instantly</div>
                  <div className="text-5xl font-heading uppercase">₹500 <span className="text-xl opacity-40">Off</span></div>
                </div>
                <p className="text-xs text-white/60 leading-relaxed uppercase tracking-widest font-medium">Their first session</p>
              </motion.div>

              {/* Reward Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 md:p-10 bg-white border border-primary/5 rounded-[2.5rem] flex flex-col gap-12 shadow-xl shadow-primary/5"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Gift size={24} className="text-accent" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-primary/40 font-bold">For You</span>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-accent mb-2 font-bold">Account Credit</div>
                  <div className="text-5xl font-heading uppercase text-primary">₹500 <span className="text-xl opacity-40 text-primary/60">Off</span></div>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed uppercase tracking-widest font-medium">Your next session</p>
              </motion.div>
            </div>
            {/* Connecting Visual */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[100px] -z-10 rounded-full" />
          </div>

          <div className="order-1 lg:order-2">
            <div className="space-y-10">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx }}
                  className="flex items-start gap-6 group"
                >
                  <div className="text-accent group-hover:scale-110 transition-transform duration-500 mt-1">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-primary font-bold uppercase tracking-wider text-sm mb-2">{step.title}</h4>
                    <p className="text-text-secondary text-sm leading-relaxed max-w-sm">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-16">
              <Button
                text="Get My Referral Code"
                onClick={() => console.log("Referral Code Requested")}
                primary
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralProgram;
