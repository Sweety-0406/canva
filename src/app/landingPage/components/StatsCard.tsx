

"use client"
import type { LucideIcon } from "lucide-react"
import { IconType } from "react-icons/lib"
import { useState, useEffect, useRef } from "react"

interface StatsCardProps {
    title: string,
    description: string,
    icon: IconType | LucideIcon,
    color: string
}

const StatsCard = ({
    title,
    description,
    icon: Icon,
    color
}: StatsCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [animatedTitle, setAnimatedTitle] = useState("0");
    const cardRef = useRef<HTMLDivElement>(null);

    // Number animation effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Extract number from title for animation
                    const numMatch = title.match(/(\d+(?:\.\d+)?)/);
                    if (numMatch) {
                        const targetNum = parseFloat(numMatch[1]);
                        const suffix = title.replace(numMatch[1], '');
                        let current = 0;
                        const increment = targetNum / 50; 
                        
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= targetNum) {
                                setAnimatedTitle(title);
                                clearInterval(timer);
                            } else {
                                const displayNum = Math.floor(current);
                                setAnimatedTitle(displayNum + suffix);
                            }
                        }, 30);

                        return () => clearInterval(timer);
                    } else {
                        setAnimatedTitle(title);
                    }
                }
            },
            { threshold: 0.5 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [title]);

    return (
        <div
            ref={cardRef}
            className="group cursor-pointer relative overflow-hidden flex flex-col justify-center items-center bg-white/80 backdrop-blur-md p-6 py-10 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-violet-200/50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50/30 via-cyan-50/20 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] rounded-xl opacity-0 group-hover:opacity-30 blur-sm transition-all duration-500" />
            
            <div className="relative z-10 flex flex-col items-center">
                <div className={`size-16 mb-6 flex justify-center items-center bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] p-4 rounded-xl shadow-lg transform transition-all duration-500 ${
                    isHovered 
                        ? 'scale-110 rotate-6 shadow-2xl' 
                        : 'scale-100 rotate-0'
                }`}>
                    <Icon className="size-8 text-white transition-all duration-300 group-hover:scale-110" />
                </div>
                
                <h3 className={`text-3xl md:text-5xl font-bold mb-2 transition-all duration-300 ${color} ${
                    isHovered ? 'scale-110' : 'scale-100'
                }`}>
                    {animatedTitle}
                </h3>
                
                <p className="text-sm text-gray-500 font-medium group-hover:text-gray-700 transition-colors duration-300">
                    {description}
                </p>
            </div>
            
            <div className={`absolute inset-0 rounded-xl transition-all duration-700 ${
                isHovered 
                    ? 'bg-gradient-to-r from-[#00c4cc]/5 via-[#6420ff]/5 to-[#7d2ae7]/5 animate-pulse' 
                    : 'bg-transparent'
            }`} />
            
            <div className="absolute top-0 -left-4 w-4 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_ease-in-out] transition-opacity duration-500" />
        </div>
    )
}

export default StatsCard