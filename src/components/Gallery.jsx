import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from 'phosphor-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from './Button';

const categories = ["All", "Newborn", "Maternity", "Wedding", "Birthday", "Portrait", "Fashion"];

const projects = [
  // Newborn
  { id: 1, category: "Newborn", title: "Soft Whispers", image: "/images/newborn1.webp", span: "md:col-span-2 md:row-span-2" },
  { id: 2, category: "Newborn", title: "Pure Innocence", image: "/images/newborn2.webp", span: "md:col-span-1 md:row-span-1" },
  { id: 3, category: "Newborn", title: "Tiny Toes", image: "/images/newborn3.webp", span: "md:col-span-1 md:row-span-1" },
  { id: 4, category: "Newborn", title: "Peaceful Slumber", image: "/images/newborn4.webp", span: "md:col-span-1 md:row-span-2" },
  { id: 5, category: "Newborn", title: "Dreamy Days", image: "/images/newborn5.webp", span: "md:col-span-1 md:row-span-1" },

  // Birthday
  { id: 6, category: "Birthday", title: "Joyful Chaos", image: "/images/birthday1.webp", span: "md:col-span-2 md:row-span-1" },
  { id: 7, category: "Birthday", title: "Cake Smash", image: "/images/birthday2.webp", span: "md:col-span-1 md:row-span-1" },
  { id: 8, category: "Birthday", title: "Party Fun", image: "/images/birthday3.webp", span: "md:col-span-1 md:row-span-2" },
  { id: 9, category: "Birthday", title: "Golden Moments", image: "/images/birthday4.webp", span: "md:col-span-1 md:row-span-1" },
  { id: 10, category: "Birthday", title: "Happy Smiles", image: "/images/birthday5.webp", span: "md:col-span-2 md:row-span-2" },
  { id: 11, category: "Birthday", title: "Celebration", image: "/images/birthday6.webp", span: "md:col-span-1 md:row-span-1" },
  { id: 12, category: "Birthday", title: "Special Day", image: "/images/birthday7.webp", span: "md:col-span-1 md:row-span-1" },

  // Fashion
  { id: 13, category: "Fashion", title: "Urban Edge", image: "/images/fashion1.webp", span: "md:col-span-1 md:row-span-2" },
  { id: 14, category: "Fashion", title: "Studio Light", image: "/images/fashion2.webp", span: "md:col-span-1 md:row-span-1" },
  { id: 15, category: "Fashion", title: "Vogue Kids", image: "/images/fashion3.webp", span: "md:col-span-2 md:row-span-1" },

  // Maternity
  { id: 16, category: "Maternity", title: "Glowing Grace", image: "/images/maternity1.webp", span: "md:col-span-1 md:row-span-1" },
  { id: 17, category: "Maternity", title: "Motherly Love", image: "/images/maternity2.webp", span: "md:col-span-1 md:row-span-2" },
  { id: 18, category: "Maternity", title: "Ethereal Glow", image: "/images/maternity3.webp", span: "md:col-span-2 md:row-span-1" },
  { id: 19, category: "Maternity", title: "Nature's Bond", image: "/images/maternity4.webp", span: "md:col-span-1 md:row-span-1" },
  { id: 20, category: "Maternity", title: "Waiting for You", image: "/images/maternity5.webp", span: "md:col-span-1 md:row-span-1" },

  // Portrait
  { id: 21, category: "Portrait", title: "Pure Essence", image: "/images/portrait1.webp", span: "md:col-span-2 md:row-span-2" },
  { id: 22, category: "Portrait", title: "Soulful Eyes", image: "/images/portrait2.webp", span: "md:col-span-1 md:row-span-1" },
  { id: 23, category: "Portrait", title: "Quiet Moments", image: "/images/portrait3.webp", span: "md:col-span-1 md:row-span-2" },
  { id: 24, category: "Portrait", title: "Wild Spirit", image: "/images/portrait4.webp", span: "md:col-span-1 md:row-span-1" },

  // Wedding
  { id: 25, category: "Wedding", title: "Everlasting Love", image: "/images/wedding1.webp", span: "md:col-span-2 md:row-span-1" },
  { id: 26, category: "Wedding", title: "The Union", image: "/images/wedding2.webp", span: "md:col-span-1 md:row-span-1" },
  { id: 27, category: "Wedding", title: "Golden Hour", image: "/images/wedding3.webp", span: "md:col-span-1 md:row-span-2" },
  { id: 28, category: "Wedding", title: "Sweet Kiss", image: "/images/wedding4.webp", span: "md:col-span-1 md:row-span-1" },
  { id: 29, category: "Wedding", title: "Bridal Bliss", image: "/images/wedding5.webp", span: "md:col-span-1 md:row-span-1" },
  { id: 30, category: "Wedding", title: "Happy Couple", image: "/images/wedding6.webp", span: "md:col-span-2 md:row-span-2" },
  { id: 31, category: "Wedding", title: "The Vows", image: "/images/wedding7.webp", span: "md:col-span-1 md:row-span-1" },
  { id: 32, category: "Wedding", title: "First Dance", image: "/images/wedding8.webp", span: "md:col-span-1 md:row-span-1" },
  { id: 33, category: "Wedding", title: "Eternal Bond", image: "/images/wedding9.webp", span: "md:col-span-1 md:row-span-1" },
  { id: 34, category: "Wedding", title: "Forever After", image: "/images/wedding10.webp", span: "md:col-span-1 md:row-span-1" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  // Filtering Logic
  const filteredProjects = activeCategory === "All"
    ? (showAll ? projects : projects.slice(0, 11)) 
    : projects.filter(p => p.category === activeCategory);

  // Refresh ScrollTrigger when layout changes
  useEffect(() => {
    // Small delay to allow Framer Motion's layout animations to start/complete
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [filteredProjects, showAll]);

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full border border-primary/20 text-xs font-medium tracking-widest uppercase"
            >
              Our Work
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-heading uppercase leading-none"
            >
              A Peek Into <br /> Our World
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-text-secondary max-w-md leading-relaxed"
            >
              Real families. Real moments. <br /> Zero filters on the happiness.
            </motion.p>
          </div>

          {/* FILTER TABS */}
          <div className="flex flex-wrap gap-2 md:pb-2">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (idx * 0.05) }}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAll(false); // Reset showAll when category changes
                }}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-300 relative overflow-hidden group border
                  ${activeCategory === cat
                    ? "bg-primary/95 text-bg border-primary/95"
                    : "bg-transparent text-primary/95 border-primary/10 hover:border-primary/40"
                  }`}
              >
                <span className="relative z-10">{cat}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* GALLERY GRID */}
        <motion.div
          layout
          className="grid grid-flow-dense grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className={`relative group overflow-hidden rounded-2xl bg-card ${project.span}`}
              >
                {/* Image */}
                <motion.img
                  layout
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end"
                >
                  <p className="text-accent text-xs font-medium uppercase tracking-widest mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {project.category}
                  </p>
                  <h3 className="text-bg text-2xl font-heading uppercase translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    {project.title}
                  </h3>
                </motion.div>

                {/* Floating Category Tag (Static) */}
                <div className="absolute top-4 right-4 bg-bg/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-bold text-bg opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  {project.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA SECTION */}
        <div className="mt-20 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {activeCategory === "All" && (
              <Button 
                text={showAll ? "Hide Extra Gallery" : "View Full Gallery"} 
                Icon={Image} 
                primary 
                onClick={() => setShowAll(!showAll)}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
