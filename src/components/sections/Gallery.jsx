import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from 'phosphor-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../common/Button';
import { categories, projects } from '../../data/projects';

const ProjectCard = React.memo(({ project }) => (
  <motion.div
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className={`relative group overflow-hidden rounded-2xl bg-card ${project.span}`}
  >
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
      <p className="text-accent text-xs font-medium uppercase tracking-widest mb-1">
        {project.category}
      </p>
      <h3 className="text-bg text-2xl font-heading uppercase">
        {project.title}
      </h3>
    </div>

    <div className="absolute top-4 right-4 bg-bg/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase font-bold text-bg opacity-100 group-hover:opacity-0 transition-opacity duration-300">
      {project.category}
    </div>
  </motion.div>
));

ProjectCard.displayName = 'ProjectCard';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = useMemo(() => {
    const filtered = activeCategory === "All"
      ? projects
      : projects.filter(p => p.category === activeCategory);
    
    return activeCategory === "All" && !showAll ? filtered.slice(0, 11) : filtered;
  }, [activeCategory, showAll]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [filteredProjects, showAll]);

  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat);
    setShowAll(false);
  }, []);

  return (
    <section id="gallery" className="py-15 md:py-10 px-6 md:px-12 lg:px-24 bg-bg min-h-screen">
      <div className="max-w-7xl mx-auto">

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

          <div className="relative">
            <nav className="flex overflow-x-auto md:overflow-visible flex-nowrap md:flex-wrap gap-2 md:pb-2 pb-4 no-scrollbar [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:[mask-image:none]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-5 py-2 rounded-full text-sm cursor-pointer whitespace-nowrap transition-all duration-300 relative border
                    ${activeCategory === cat
                      ? "text-bg border-transparent"
                      : "bg-transparent text-primary/95 border-primary/10 hover:border-primary/40"
                    }`}
                  aria-pressed={activeCategory === cat}
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    />
                  )}
                  <span className={`relative z-10 ${activeCategory === cat ? "text-bg" : "text-primary/95"}`}>
                    {cat}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-flow-dense grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 flex justify-center">
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
