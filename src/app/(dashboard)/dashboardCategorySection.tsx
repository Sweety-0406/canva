"use client" 


import React, { useRef, useEffect } from "react";
import {
  GraduationCap,
  Megaphone,
  Printer,
  CreditCard,
} from "lucide-react";
import { BsFillPostageHeartFill } from "react-icons/bs";
import { TfiYoutube } from "react-icons/tfi";
import { IoBusiness } from "react-icons/io5";
import { MdWallpaper } from "react-icons/md";
import { IoLogoPinterest } from "react-icons/io";
import { BiSolidSpreadsheet } from "react-icons/bi";
import { GiTargetPoster } from "react-icons/gi";
import { Sparkles } from 'lucide-react';
import useGetTemplateModal from "@/features/editor/hooks/useGetTemplateModal";

const baseCategories = [
  { label: "For You", icon: <Sparkles className="text-white  " />, color:"bg-emerald-700" },
  { label: "Education", icon: <GraduationCap className="text-white  " />, color:"bg-pink-700" },
  { label: "Marketing", icon: <Megaphone className="text-white  " />, color:"bg-blue-500" },
  { label: "Print Products", icon: <Printer className="text-white  " />, color:"bg-purple-500" },
  { label: "Cards & Invitations", icon: <CreditCard className="text-white  " />, color:"bg-green-500" },
  { label: "Social Media", icon: <BsFillPostageHeartFill size={20} className="text-white  " />, color:"bg-cyan-400" },
  { label: "YouTube Thumbnail", icon: <TfiYoutube size={20} className="text-white  " />, color:"bg-red-400" },
  { label: "Business", icon: <IoBusiness size={20} className="text-white  " />, color:"bg-yellow-400" },
  { label: "Wallpaper", icon: <MdWallpaper size={20} className="text-white  " />, color:"bg-sky-400" },
  { label: "Logo", icon: <IoLogoPinterest size={20} className="text-white  " />, color:"bg-orange-400" },
  { label: "Flyer", icon: <BiSolidSpreadsheet size={20} className="text-white  " />, color:"bg-lime-400" },
  { label: "Poster", icon: <GiTargetPoster size={20} className="text-white  " />, color:"bg-fuchsia-400" },
];

const loopedCategories = [...baseCategories, ...baseCategories, ...baseCategories];

export default function DashboardCategorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {onOpen} = useGetTemplateModal()
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const third = el.scrollWidth / 3;
    el.scrollLeft = third;

    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      if (scrollLeft < third / 2) {
        el.scrollLeft += third;
      } else if (scrollLeft > third * 1.5) {
        el.scrollLeft -= third;
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative px-4 py-3 pt-5">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

      <div
        ref={containerRef}
        className="flex overflow-x-auto space-x-2 scrollbar-hide px-4"
      >
        {loopedCategories.map((cat, index) => (
          <div className="hover:cursor-pointer" key={index} onClick={()=>onOpen(cat.label)}>
            <div
              className="group flex-shrink-0 w-20 h-20 justify-center  flex flex-col items-center   rounded-lg py-1 text-sm "
            >
                <div className={`${cat.color} rounded-full p-2`}>
                    <div className={`transition-transform duration-500 group-hover:scale-[1.25] `} >
                        {cat.icon}
                    </div>
                </div>
                <div className="text-gray-700 w-12 mt-2 text-[10px] text-center break-words leading-none">
                {cat.label}
                </div>
            </div>
          </div>

        ))}
      </div> 
    </div>
  );
}
