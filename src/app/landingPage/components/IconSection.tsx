"use client"

import React from 'react';
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


const categories = [
  { label: "For You", icon: <Sparkles /> },
  { label: "Education", icon: <GraduationCap /> },
  { label: "Marketing", icon: <Megaphone /> },
  { label: "Print Products", icon: <Printer /> },
  { label: "Cards & Invitations", icon: <CreditCard /> },
  { label: "Social Media", icon: <BsFillPostageHeartFill  /> },
  { label: "YouTube Thumbnail", icon: <TfiYoutube  /> },
  { label: "Business", icon: <IoBusiness  /> },
  { label: "Wallpaper", icon: <MdWallpaper  /> },
  { label: "Logo", icon: <IoLogoPinterest  /> },
  { label: "Flyer", icon: <BiSolidSpreadsheet  /> },
  { label: "Poster", icon: <GiTargetPoster  /> },
];

export default function IconSection() {
    return (
        <div className='items-center w-full flex justify-center'>
            <div className=" bg-white shadow-xl max-w-6xl rounded-2xl p-8 lg:px-[10%] lg:py-[5%]">
                <div className=" mx-auto">
                    <div className="grid grid-cols-4 gap-8">
                        {categories.map((category, index) => (
                            <div
                            key={index}
                            className="group flex flex-col items-center space-y-2 cursor-pointer"
                            >
                            {/* 3D Glossy Icon Container - matches your reference image */}
                            <div className="relative size-16 group-hover:scale-110 transition-transform duration-200">
                                {/* Base shadow */}
                                <div className="absolute -inset-1 bg-violet-300 rounded-xl blur-md"></div>
                                
                                {/* Main icon background with gradient */}
                                <div className="relative size-16 rounded-xl bg-gradient-to-br from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] shadow-2xl overflow-hidden">
                                
                                {/* Secondary gradient overlay for depth */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7]"></div>
                                
                                {/* Top glossy highlight */}
                                <div className="absolute inset-x-2 top-2 h-6 bg-gradient-to-b from-white/50 to-transparent rounded-t-lg"></div>
                                
                                {/* Side highlight */}
                                <div className="absolute left-2 top-6 bottom-6 w-1 bg-gradient-to-b from-white/30 to-transparent rounded-xl"></div>
                                
                                {/* Icon content */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-white drop-shadow-lg scale-110">
                                    {React.isValidElement(category.icon) ? 
                                        React.cloneElement(category.icon as React.ReactElement<any>, {
                                        className: "text-white",
                                        size: 24
                                        }) : 
                                        category.icon
                                    }
                                    </div>
                                </div>
                                
                                {/* Inner shadow for more depth */}
                                <div className="absolute inset-0 rounded-xl shadow-inner shadow-black/20"></div>
                                </div>
                            </div>
                            
                            {/* Label */}
                            <span className="text-xs font-medium text-gray-700 text-center px-2 leading-tight">
                                {category.label}
                            </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}