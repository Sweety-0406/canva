"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/features/editor/hooks/useCreateProject";
import { useState } from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";


const Banner = () => {
  const router = useRouter();
  const mutation = useCreateProject();
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 5000);
  };

  const onClick = async () => {
    mutation.mutate(
      {
        name: "Untitled Project",
        json: "",
        width: 500,
        height: 700,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };

  return (
    <BackgroundGradientAnimation className=" absolute text-black flex gap-4 z-50">
      <div  
        className="relative rounded-full size-28 flex items-center justify-center bg-white/50 overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        <motion.div
          className="rounded-full size-20 flex items-center justify-center bg-purple-50 relative"
          whileHover={{ scale: 0.85 }}
          whileTap={{ scale: 1}}
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
        <h1 className="text-xl md:text-3xl font-semibold">Bring your ideas to life with advanced image technology</h1>
        <p className="text-xs md:text-lg mb-2" style={{ fontFamily: "'Brush Script MT', cursive" }}>
          Transform your ideas into designs instantly. Just upload an image and watch technology work its magic.
        </p>
        <Button disabled={mutation.isPending} onClick={onClick} variant="outline" className="w-[160px] text-black">
          Start creating
          <ArrowRight className="size-4 ml-2" />
        </Button>
      </div>
    </BackgroundGradientAnimation> 
  );
};

export default Banner;

