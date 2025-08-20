
"use client"

import { FaUserGroup, FaArrowTrendUp } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { TbWorld } from "react-icons/tb";
import StatsCard from "./StatsCard";
import Testimonials from "./Testimonials";
import { useEffect, useRef, useState } from "react";

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    {
      icon: FaUserGroup,
      title: "10M+",
      description: "Active Creators",
      color: "text-violet-500"
    },
    {
      icon: FiDownload,
      title: "50M+",
      description: "Designs Created",
      color: "text-cyan-500"
    },
    {
      icon: TbWorld,
      title: "150M+",
      description: "Countries",
      color: "text-orange-500"
    },
    {
      icon: FaArrowTrendUp,
      title: "99.9%",
      description: "Uptime",
      color: "text-violet-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setStatsVisible(true), 200);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-16 px-6 md:mx-[5%] text-center"
    >
      <div 
        className={`text-center flex flex-col justify-center items-center w-full transform transition-all duration-1000 ease-out ${
          isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-5 text-center leading-tight">
          <span className="whitespace-pre-wrap">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] bg-clip-text text-transparent">
              millions worldwide
            </span>
          </span>
        </h2>
        <p className="text-lg mb-16 max-w-md text-gray-500">
          Numbers that speak to our commitment to providing the best design experience.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`transform transition-all duration-700 ease-out ${
              statsVisible 
                ? 'translate-y-0 opacity-100 scale-100' 
                : 'translate-y-8 opacity-0 scale-95'
            }`}
            style={{ 
              transitionDelay: `${i * 150}ms` 
            }}
          >
            <StatsCard 
              icon={stat.icon} 
              title={stat.title} 
              description={stat.description} 
              color={stat.color} 
            />
          </div>
        ))}
      </div>
      
      <Testimonials />
    </section>
  );
}