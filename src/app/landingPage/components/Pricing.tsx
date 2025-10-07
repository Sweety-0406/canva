

"use client"

import PricingCard from "./PricingCard";
import { useEffect, useRef, useState } from "react";

const plans = [
  {
    title: "Free",
    cost: "0",
    costText: "forever",
    description: "Perfect for getting started with design",
    features: ["5 projects", "Basic templates", "Standard export quality", "Community support", "1GB storage"],
    billing: "free" as "free"|"monthly"|"yearly"
  },
  {
    title: "Pro (Monthly)",
    cost: "400",
    costText: "per month",
    description: "For professional designers and teams",
    features: ["Unlimited projects", "Premium templates", "4K export quality", "Priority support", "Advanced tools", "100GB storage"],
    popular: true,
    billing: "monthly" as "free"|"monthly"|"yearly"
  },
  {
    title: "Pro (Yearly)",
    cost: "4000",
    costText: "per year (save 15% )",
    description: "Best value for long-term creators and teams",
    features: [
      "Everything in Pro (Monthly)",
      "Save 15% compared to monthly billing",
      "Exclusive yearly-only templates",
      "1TB storage",
      "Dedicated success manager"
    ],
    billing: "yearly" as "free"|"monthly"|"yearly"
  }
];

export default function Pricing() {
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
      id="pricing" 
      className="py-20 px-6 md:px-[5%] lg:px-[10%] bg-gradient-to-b from-white to-muted"
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
              Choose your{" "}
              <span className="bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] bg-clip-text text-transparent">
                creative plan
              </span>
            </span>
          </h2>
          
          <p className="text-lg mb-16 max-w-xl text-gray-500">
            Start free and upgrade as you grow. All plans include our core design tools and customer support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-10">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`transform transition-all duration-800 ease-out ${
                cardsVisible 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-12 opacity-0 scale-95'
              }`}
              style={{ 
                transitionDelay: `${i * 200}ms` 
              }}
            >
              <PricingCard 
                title={plan.title} 
                cost={plan.cost} 
                costText={plan.costText} 
                features={plan.features} 
                description={plan.description} 
                popular={plan.popular}  
                billing={plan.billing}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}