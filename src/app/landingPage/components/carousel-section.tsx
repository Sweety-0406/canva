"use client"

import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Description } from "@radix-ui/react-dialog";

const CarouselSection = ()=>{
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));
    return(
        <div className="bg-gradient-to-r from-blue-700 to-purple-700 mt-10">
            <div className="p-4 lg:px-[20%] pt-16 text-white">
                <h1 className="text-2xl lg:text-4xl font-semibold">Meet Magic Studio™: All the power of Canva’s AI</h1>
                <p className="text-[17px] lg:text-xl text-white/70"> Magic Studio™ brings together the best AI-powered tools for you and your team to help you design with more ease, speed, and creativity. </p>
            </div>
            <div className="w-full object-contain h-full">
                <Carousel items={cards} />
            </div>
        </div>
    )
}

   
const data = [
    {
      title: "Magic Write™",
      description: "Create an impressive first draft",
      src: "/images/carousel-image2.png",
    },
    {
      title: "Translate",
      description: "Translate your text and connect with people anywhere",
      src: "/images/carousel-image3.png",
      isPro: true
    },
    {
      title: "Explore Magic Studio™",
      description: "Use AI to design with more ease, speed and creativity",
      src: "/images/carousel-image4.png",
    },
];

export default CarouselSection