'use client'
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

const baseCategories = [
  { label: "For You", icon: <Sparkles className="text-emerald-700" /> },
  { label: "Education", icon: <GraduationCap className="text-pink-700" /> },
  { label: "Marketing", icon: <Megaphone className="text-blue-500" /> },
  { label: "Print Products", icon: <Printer className="text-purple-500" /> },
  { label: "Cards & Invitations", icon: <CreditCard className="text-green-500" /> },
  { label: "Social Media", icon: <BsFillPostageHeartFill size={22} className="text-cyan-400" /> },
  { label: "YouTube Thumbnail", icon: <TfiYoutube size={22} className="text-red-400" /> },
  { label: "Business", icon: <IoBusiness size={22} className="text-yellow-400" /> },
  { label: "Wallpaper", icon: <MdWallpaper size={22} className="text-sky-400" /> },
  { label: "Logo", icon: <IoLogoPinterest size={22} className="text-orange-400" /> },
  { label: "Flyer", icon: <BiSolidSpreadsheet size={22} className="text-lime-400" /> },
  { label: "Poster", icon: <GiTargetPoster size={22} className="text-fuchsia-400" /> },
];

const loopedCategories = [...baseCategories, ...baseCategories, ...baseCategories];

export default function CategorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div className="relative px-4 py-3">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

      <div
        ref={containerRef}
        className="flex overflow-x-auto space-x-2 scrollbar-hide px-4"
      >
        {loopedCategories.map((cat, index) => (
          <div className="border rounded-lg" key={index}>
            <div
              className="group flex-shrink-0 w-28 h-20 justify-center  flex flex-col items-center border border-transparent rounded-lg py-1 text-sm transition-all duration-500 hover:border hover:border-[#7d2ae7]"
            >
              <div className="transition-transform duration-500 group-hover:scale-[1.35]">
                {cat.icon}
              </div>
              <div className="text-gray-700 text-[10px] whitespace-nowrap transition-transform duration-500 group-hover:translate-y-1">
                {cat.label}
              </div>
            </div>
          </div>

        ))}
      </div> 
    </div>
  );
}
