"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const Banner = () => {
  return (
    <BackgroundGradientAnimation className="absolute text-black flex gap-4 z-50">
      <div  
        className="relative rounded-full size-24 flex items-center justify-center bg-white/50 overflow-hidden cursor-pointer"
      >
        <motion.div
          className="rounded-full size-16 flex items-center justify-center bg-purple-50 relative"
          whileHover={{ scale: 0.85 }}
          whileTap={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="h-20 text-[#7700ff] fill-[#b300ff]" />
          </motion.div>
        </motion.div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-xl md:text-3xl font-semibold">
          Bring your ideas to life with advanced image technology
        </h1>
        <p className="text-xs md:text-lg mb-2" style={{ fontFamily: "'Brush Script MT', cursive" }}>
          Transform your ideas into designs instantly. Just upload an image and watch technology work its magic.
        </p>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default Banner;
