

import TestimonialCard from "./TestimonialCard";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Sarah Chen",
    iconText: "👩‍💼",
    profession: "Creative Director",
    description: "PixelForge has completely transformed our design workflow. What used to take hours now takes minutes, and the quality is consistently amazing."
  },
  {
    name: "David Kim",
    iconText: "👨‍🎨",
    profession: "Freelance Designer",
    description: "I've tried every design tool out there, and PixelForge is hands down the most intuitive. My clients are blown away by the results."
  },
  {
    name: "Lina Gomez",
    iconText: "👩‍💻",
    profession: "Marketing Lead",
    description: "Our team went from zero design skills to creating professional-quality content. PixelForge makes everyone feel like a designer."
  },
  {
    name: "Raj Patel",
    iconText: "👨‍💼",
    profession: "Product Manager",
    description: "The collaboration features are incredible. Our remote team can work together seamlessly, and the real-time editing is a game-changer."
  }
];

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setCardsVisible(true), 300);
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
      className="pt-20 bg-white"
    >
      <div className="mx-auto text-center">
        <div 
          className={`text-center flex flex-col justify-center items-center w-full transform transition-all duration-1000 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-center leading-tight">
            <span className="whitespace-pre-wrap">
              Loved by{" "}
              <span className="bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] bg-clip-text text-transparent">
                creative professionals
              </span>
            </span>
          </h2>
          <p className="text-lg mb-16 max-w-xl text-gray-500">
            Join thousands of designers, marketers, and creators who trust PixelForge to bring their vision to life every day.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`transform transition-all duration-700 ease-out ${
                cardsVisible 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-8 opacity-0 scale-95'
              }`}
              style={{ 
                transitionDelay: `${i * 120}ms` 
              }}
            >
              <TestimonialCard 
                name={t.name} 
                description={t.description} 
                iconText={t.iconText} 
                profession={t.profession} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}