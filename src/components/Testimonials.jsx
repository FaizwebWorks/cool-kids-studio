import React from 'react';
import { Quotes, Star } from 'phosphor-react';
import { motion } from 'framer-motion';
import Button from './Button';

const testimonials = [
  {
    quote: "We booked a newborn shoot for our daughter and honestly cried looking at the photos. They made her look like an angel.",
    name: "Priya Desai",
    role: "Mom of Baby Aanya",
    image: "/images/portrait1.webp",
    rating: 5
  },
  {
    quote: "The maternity shoot was a dream. The photographer made me feel so comfortable. The photos are stunning.",
    name: "Meera Shah",
    role: "Maternity Client",
    image: "/images/portrait2.webp",
    rating: 5
  },
  {
    quote: "They handled 15 hyper kids, a messy cake smash, and my emotional in-laws all at once — and still got the most beautiful shots.",
    name: "Rohan Patel",
    role: "Birthday Client",
    image: "/images/portrait3.webp",
    rating: 5
  },
  {
    quote: "Our wedding photos are everything we dreamed of. They captured moments we didn't even notice were happening.",
    name: "Anjali & Kiran",
    role: "Wedding Couple",
    image: "/images/portrait4.webp",
    rating: 5
  },
  {
    quote: "Got my daughter's portfolio done here for modeling. Super professional setup and the photos were industry-ready.",
    name: "Fatima Shaikh",
    role: "Portfolio Client",
    image: "/images/portrait1.webp",
    rating: 4
  },
  {
    quote: "A refreshing and imaginative agency that consistently delivers exceptional results - highly recommended for any project.",
    name: "Victoria Thompson",
    role: "Brand Manager",
    image: "/images/portrait2.webp",
    rating: 5
  }
];

const firstRow = testimonials.slice(0, 3);
const secondRow = testimonials.slice(3, 6);

const TestimonialCard = ({ testimonial }) => (
  <div className="flex-none w-[280px] md:w-[350px] p-6 md:p-8 bg-card/40 backdrop-blur-sm rounded-[2rem] md:rounded-[2.2rem] flex flex-col gap-4 mx-2 md:mx-3 border border-primary/5 hover:border-primary/10 transition-all duration-500 group/card relative overflow-hidden">
    <div className="absolute -top-4 -right-4 text-accent/5 transition-transform group-hover/card:scale-110 group-hover/card:rotate-12 duration-700">
      <Quotes size={80} weight="fill" />
    </div>

    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={12}
          weight="fill"
          className={i < testimonial.rating ? "text-accent" : "text-primary/10"}
        />
      ))}
    </div>

    <p className="text-xs md:text-sm text-primary/80 font-medium leading-relaxed tracking-tight relative z-10 italic">
      "{testimonial.quote}"
    </p>

    <div className="flex items-center gap-3 pt-4 mt-auto border-t border-primary/10 relative z-10">
      <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden flex-shrink-0 border border-accent/20 ring-2 ring-bg">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-full h-full object-cover transition-all duration-700 ease-out"
        />
      </div>
      <div>
        <h4 className="font-bold text-primary text-[10px] md:text-xs leading-none uppercase tracking-wider">{testimonial.name}</h4>
        <p className="text-[8px] md:text-[9px] text-primary/40 mt-1 uppercase tracking-widest font-bold">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="py-16 md:py-32 px-6 md:px-12 lg:px-24 bg-bg overflow-hidden relative">
      <style dangerouslySetInnerHTML={{
        __html: `
        .marquee-container {
          display: flex;
          width: max-content;
          gap: 0.5rem;
        }
        .marquee-left {
          animation: scroll-left 50s linear infinite;
        }
        .marquee-right {
          animation: scroll-right 50s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .fade-left {
          background: linear-gradient(to right, var(--color-bg) 0%, transparent 100%);
        }
        .fade-right {
          background: linear-gradient(to left, var(--color-bg) 0%, transparent 100%);
        }
      `}} />

      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-12 md:mb-20 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[1px] w-8 bg-primary/20" />
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-primary/60">
              Love Notes
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <h2 className="text-3xl md:text-6xl font-heading uppercase leading-[1] tracking-tighter">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  className="block"
                >
                  Real <span className="italic font-light text-primary/40">Stories.</span>
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                  className="block text-accent font-heading tracking-normal"
                >
                  Heartfelt <span className="text-primary/95">Encounters.</span>
                </motion.span>
              </h2>
            </div>
          </div>

          {/* Rotating Badge */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-8 right-0 hidden xl:block pointer-events-none"
          >
            <svg viewBox="0 0 100 100" className="w-28 h-28 opacity-10">
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text className="text-[10px] font-bold uppercase tracking-[0.2em] fill-primary">
                <textPath xlinkHref="#circlePath">
                  Certified Love • Certified Love • Certified Love •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Star size={18} weight="fill" className="text-accent" />
            </div>
          </motion.div>
        </div>

        {/* MARQUEE ROWS */}
        <div className="relative flex flex-col gap-5 md:gap-6 -mx-6 md:-mx-12 lg:-mx-24">
          <div className="flex overflow-hidden">
            <div className="marquee-container marquee-right">
              {[...firstRow, ...firstRow, ...firstRow].map((t, idx) => (
                <TestimonialCard key={`r1-${idx}`} testimonial={t} />
              ))}
            </div>
          </div>

          <div className="flex overflow-hidden">
            <div className="marquee-container marquee-left">
              {[...secondRow, ...secondRow, ...secondRow].map((t, idx) => (
                <TestimonialCard key={`r2-${idx}`} testimonial={t} />
              ))}
            </div>
          </div>

          <div className="absolute top-0 left-0 w-16 md:w-48 h-full fade-left pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-16 md:w-48 h-full fade-right pointer-events-none z-10" />
        </div>
        {/* BOTTOM ACTION */}
        <div className="mt-10 md:mt-20 flex flex-col items-center text-center">
          <p className="text-xs md:text-sm text-text-secondary font-medium mb-6">
            Ready to be featured in our <span className="text-primary italic">love notes?</span>
          </p>
          <Button
            text="Get Custom Quote"
            onClick={() => window.location.href = "mailto:hello@coolkids.com"}
            primary
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
