import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import gsap from 'gsap';

const LegalLayout = ({ title, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Premium entrance animation
    const ctx = gsap.context(() => {
      gsap.from(".legal-content", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      });
    });

    return () => ctx.revert();
  }, [title]);

  return (
    <main className="bg-bg min-h-screen relative">
      {/* Header Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 mb-6">
              Legal Information
            </span>
            <h1 className="text-6xl md:text-8xl font-heading uppercase leading-none tracking-tighter text-primary">
              {title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 !== 0 ? 'text-accent italic font-light' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-40 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto legal-content prose prose-lg prose-primary">
          <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 md:p-16 border border-white/60 shadow-sm text-text-secondary leading-relaxed space-y-8">
            {children}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default LegalLayout;
