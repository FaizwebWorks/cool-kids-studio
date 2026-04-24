import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ className }) => {
  return (
    <motion.div
      className={`bg-card/50 overflow-hidden relative ${className}`}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

export default Skeleton;

export const HeroSkeleton = () => (
  <div className="w-full h-screen flex flex-col items-center justify-center space-y-8 px-6">
    <Skeleton className="w-3/4 h-20 md:h-32 rounded-2xl" />
    <Skeleton className="w-1/2 h-20 md:h-32 rounded-2xl" />
    <Skeleton className="w-1/3 h-6 md:h-8 rounded-full" />
    <Skeleton className="w-48 h-12 md:h-14 rounded-full" />
  </div>
);

export const SectionSkeleton = () => (
  <div className="w-full py-20 px-6 space-y-12">
    <div className="flex flex-col items-center space-y-4">
      <Skeleton className="w-48 h-10 rounded-full" />
      <Skeleton className="w-3/4 max-w-xl h-16 md:h-20 rounded-2xl" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <Skeleton key={i} className="aspect-[4/5] rounded-[2.5rem]" />
      ))}
    </div>
  </div>
);
