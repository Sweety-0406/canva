

"use client";

import Logo from "@/features/editor/components/logo";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setLinksVisible(true), 300);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  const linkColumns = [
    {
      title: "Product",
      links: ["Features", "Templates", "Pricing", "Enterprise"]
    },
    {
      title: "Support", 
      links: ["Help Center", "Contact Us", "Community", "API Docs"]
    },
    {
      title: "Company",
      links: ["About", "Careers", "Press", "Privacy"]
    }
  ];

  return (
    <footer ref={footerRef} className="bg-white border-t border-gray-200 pt-10">
      <div className="w-full md:mx-[5%] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        
        <div 
          className={`flex flex-col -mt-3 items-center md:items-start transform transition-all duration-1000 ease-out ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center gap-2 group">
            <div className="h-8 w-8 -mt-2 rounded-lg bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] group-hover:scale-110 transition-transform duration-300" />
            <Logo />
          </div>
          
          <p className="mt-2 text-gray-500 text-sm max-w-xs">
            The ultimate design platform for creators, teams, and businesses worldwide.
          </p>
          
          <div className="flex gap-4 mt-4">
            {[
              { src: "/images/fb-logo.png", alt: "fb-logo", delay: "0ms" },
              { src: "/images/twitter-logo.png", alt: "twitter-logo", delay: "100ms" },
              { src: "/images/printest-logo.png", alt: "printest-logo", delay: "200ms" },
              { src: "/images/insta-logo.png", alt: "insta-logo", delay: "300ms" }
            ].map((social, i) => (
              <div 
                key={i}
                className={`size-8 transform transition-all duration-700 ease-out hover:scale-125 hover:-translate-y-1 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: social.delay }}
              >
                <Image 
                  className="object-cover w-full h-full rounded-lg hover:shadow-lg cursor-pointer transition-shadow duration-300" 
                  src={social.src} 
                  alt={social.alt} 
                  width={45} 
                  height={45}
                />
              </div>
            ))}
          </div>
        </div>

        {linkColumns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className={`transform transition-all duration-1000 ease-out ${
              linksVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${columnIndex * 150}ms` }}
          >
            <h4 className="font-semibold text-gray-900 mb-4 relative">
              {column.title}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00c4cc] to-[#6420ff] group-hover:w-full transition-all duration-300" />
            </h4>
            
            <ul className="space-y-2 text-gray-500 text-sm">
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a 
                    href="#" 
                    className={`hover:text-gray-900 transition-all duration-300 hover:translate-x-1 inline-block transform ${
                      linksVisible 
                        ? 'translate-x-0 opacity-100' 
                        : 'translate-x-2 opacity-0'
                    }`}
                    style={{ transitionDelay: `${(columnIndex * 150) + (linkIndex * 50)}ms` }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div 
        className={`border-t border-gray-200 py-4 text-center text-gray-500 text-sm transform transition-all duration-1000 ease-out ${
          linksVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-4 opacity-0'
        }`}
        style={{ transitionDelay: '600ms' }}
      >
        <div className="relative">
          © 2024 PixelForge. All rights reserved.
          
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-pulse opacity-30" />
        </div>
      </div>
    </footer>
  );
}