
'use client';
import Image from "next/image";
import { IoIosColorPalette } from "react-icons/io";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";
import { MdOutlinePhoneAndroid, MdOutlineSecurity } from "react-icons/md";
import { FaCloud } from "react-icons/fa";
import FeatureCard from "./FeatureCard";
import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: IoIosColorPalette,
    title: "Intuitive Design Tools",
    description: "Professional-grade editing tools that are easy to use for everyone, from beginners to design experts."
  },
  {
    icon: BsLightningChargeFill,
    title: "Lightning Fast",
    description: "Cloud-powered performance ensures your designs load instantly and save automatically."
  },
  {
    icon: FaUserGroup,
    title: "Team Collaboration",
    description: "Work together in real-time with commenting, sharing, and version control features."
  },
  {
    icon: MdOutlinePhoneAndroid,
    title: "Multi-Platform",
    description: "Design on any device - desktop, tablet, or mobile. Your work syncs seamlessly across all platforms."
  },
  {
    icon: FaCloud,
    title: "Cloud Storage",
    description: "Never lose your work with unlimited cloud storage and automatic backups."
  },
  {
    icon: MdOutlineSecurity,
    title: "Enterprise Security",
    description: "Bank-level security with SSO, team management, and advanced permission controls."
  }
];

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setCardsVisible(true), 300);
          setTimeout(() => setImageVisible(true), 600);
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
      id="features" 
      className="py-20 px-6 md:mx-[5%] bg-white text-gray-800"
    >
      <div className="mx-auto">
        <div className="text-center flex justify-center w-full">
          <div 
            className={`max-w-4xl text-center transform transition-all duration-1000 ease-out ${
              isVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-5 text-center leading-tight">
              <span className="whitespace-pre-wrap">
                Everything you need to{" "}
                <span className="bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] bg-clip-text text-transparent">
                  create amazing designs
                </span>
              </span>
            </h2>
            
            <p className="text-lg text-center mb-16 text-gray-500">
              From powerful editing tools to seamless collaboration, PixelForge has everything you need to bring your creative vision to life.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`transform transition-all duration-700 ease-out ${
                cardsVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ 
                transitionDelay: `${i * 100}ms` 
              }}
            >
              <FeatureCard 
                title={feature.title} 
                description={feature.description} 
                icon={feature.icon} 
              />
            </div>
          ))}
        </div>

        <div 
          className={`mt-16 transform transition-all duration-1000 ease-out ${
            imageVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-8 opacity-0 scale-95'
          }`}
        >
          <Image
            src="/images/feature-icons.jpg"
            alt="Design Tools"
            width={900}
            height={500}
            className="mx-auto rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
}