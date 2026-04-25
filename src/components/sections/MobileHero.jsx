import React from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";

export default function MobileHero() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 overflow-hidden bg-bg">
      <div className="w-full max-w-full overflow-hidden">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            mass: 1,
          }}
          className="text-[2.5rem] font-semibold font-heading text-primary/95 tracking-tight uppercase leading-[1.1]"
        >
          From tiny giggles to big milestones captured before it slips away.
        </motion.h1>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className="mt-8 text-center text-text-secondary max-w-xs text-sm font-normal tracking-tight opacity-80"
      >
        Babies grow. Kids get hyper. Weddings get emotional. <br />
        Good thing we're there to freeze it all before it disappears.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        className="flex flex-col items-center gap-4 mt-10 w-full"
      >
        <Button text="Book Your Session" primary />
      </motion.div>
    </section>
  );
}
