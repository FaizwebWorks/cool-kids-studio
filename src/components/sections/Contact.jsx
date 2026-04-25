import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  InstagramLogo, 
  MapPin, 
  Clock, 
  WhatsappLogo, 
  EnvelopeSimple,
  ArrowRight
} from 'phosphor-react';
import Button from '../common/Button';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Phone size={24} weight="duotone" />,
      label: "Phone / WhatsApp",
      value: "+91 79471 16815",
      link: "tel:+917947116815"
    },
    {
      icon: <InstagramLogo size={24} weight="duotone" />,
      label: "Instagram",
      value: "@the_coolkids_studi0",
      link: "https://instagram.com/the_coolkids_studi0"
    },
    {
      icon: <MapPin size={24} weight="duotone" />,
      label: "Location",
      value: "Navsari, Gujarat — 396445",
      link: "https://maps.google.com/?q=Navsari%2C+Gujarat%20396445"
    }
  ];

  const workingHours = [
    { day: "Mon–Sat", hours: "9:00 AM – 7:00 PM" },
    { day: "Sunday", hours: "By Appointment Only" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="contact" className="py-24 md:py-40 px-6 md:px-12 lg:px-24 bg-bg relative overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none opacity-[0.02] select-none whitespace-nowrap">
        <span className="text-[30vw] font-heading leading-none uppercase">Get In Touch • </span>
        <span className="text-[30vw] font-heading leading-none uppercase">Get In Touch • </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          
          {/* LEFT CONTENT: HEADING */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/10 bg-white/50 backdrop-blur-sm mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60">Available for Bookings</span>
              </motion.div>

              <motion.h2 
                variants={itemVariants}
                className="text-7xl md:text-9xl lg:text-[11rem] font-heading uppercase leading-[0.85] tracking-tight text-primary/95 mb-8"
              >
                Let's <br />
                <span className="text-accent italic font-light">Talk</span>
                <span className="text-primary/20 ml-4 inline-block transform -rotate-12 hover:rotate-0 transition-transform duration-500 hover:text-accent cursor-default">📞</span>
              </motion.h2>

              <motion.p 
                variants={itemVariants}
                className="text-xl md:text-2xl text-text-secondary max-w-lg leading-snug font-medium italic"
              >
                Have a question? Not sure which package is right? 
                <span className="text-primary/95 block mt-2 not-italic">Just reach out — we're friendly, we promise.</span>
              </motion.p>
            </motion.div>

            {/* ACTION BUTTONS */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 mt-12 md:mt-20"
            >
              <Button 
                text="WhatsApp Us" 
                primary 
                onClick={() => window.open('https://wa.me/917947116815', '_blank', 'noopener,noreferrer')}
                icon={<WhatsappLogo size={20} weight="duotone" />}
              />
              <Button 
                text="Send Enquiry" 
                onClick={() => window.location.assign('mailto:hello@coolkids.com')}
                icon={<EnvelopeSimple size={20} weight="duotone" />}
                className="bg-primary/95 text-white hover:bg-primary/95 hover:text-white transition-all duration-500"
              />
            </motion.div>
          </div>

          {/* RIGHT CONTENT: INFO GRID */}
          <div className="lg:col-span-5">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-white/60 shadow-sm"
            >
              <div className="space-y-12">
                {/* CONTACT ITEMS */}
                {contactInfo.map((item, index) => {
                  const isWebLink = item.link.startsWith('http');

                  return (
                    <motion.a
                      key={index}
                      href={item.link}
                      target={isWebLink ? "_blank" : undefined}
                      rel={isWebLink ? "noopener noreferrer" : undefined}
                      variants={itemVariants}
                      className="flex items-start gap-6 group cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-primary text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-primary/95 transition-colors duration-500 shadow-lg shadow-primary/5">
                        {item.icon}
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-primary/40 mb-1">
                          {item.label}
                        </span>
                        <span className="text-lg md:text-xl font-semibold text-primary/95 group-hover:text-accent transition-colors duration-300 underline underline-offset-4 decoration-primary/10">
                          {item.value}
                        </span>
                      </div>
                    </motion.a>
                  );
                })}

                {/* WORKING HOURS */}
                <motion.div variants={itemVariants} className="pt-8 border-t border-primary/5">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock size={20} className="text-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary/40">Working Hours</span>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {workingHours.map((slot, index) => (
                      <div key={index} className="flex justify-between items-center group">
                        <span className="text-sm font-bold text-primary/60 uppercase tracking-tighter group-hover:text-primary/95 transition-colors">
                          {slot.day}
                        </span>
                        <div className="h-[1px] flex-grow mx-4 bg-primary/5 group-hover:bg-accent/20 transition-colors" />
                        <span className="text-sm font-semibold text-primary/95 italic">
                          {slot.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
