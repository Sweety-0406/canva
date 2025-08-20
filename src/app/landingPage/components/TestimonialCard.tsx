
"use client"
import { BiSolidQuoteSingleRight } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

interface TestimonialCardProps {
    name: string,
    profession: string,
    description: string,
    iconText: string,
}

const TestimonialCard = ({
    name,
    profession,
    description,
    iconText
}: TestimonialCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group cursor-pointer relative overflow-hidden flex flex-col justify-start bg-white/90 backdrop-blur-md p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-violet-200/50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50/40 via-cyan-50/20 to-purple-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] rounded-xl opacity-0 group-hover:opacity-20 blur-sm transition-all duration-500" />
            
            <div className="relative z-10">
                <div className="flex mb-4">
                    <BiSolidQuoteSingleRight className={`text-violet-300 size-10 transition-all duration-500 ${
                        isHovered ? 'scale-110 text-violet-400' : 'scale-100'
                    }`} />
                    <BiSolidQuoteSingleRight className={`text-violet-300 -ml-4 size-10 transition-all duration-500 ${
                        isHovered ? 'scale-110 text-violet-400' : 'scale-100'
                    }`} />
                </div>
                
                <div className="text-zinc-600 text-sm font-normal italic text-start mb-4 leading-relaxed group-hover:text-zinc-700 transition-colors duration-300">
                    &quots;{description}&quots;
                </div>
                
                <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <FaStar 
                            key={i}
                            className={`size-4 fill-cyan-400 transition-all duration-300 ${
                                isHovered ? 'scale-110 fill-cyan-500' : 'scale-100'
                            }`}
                            style={{ transitionDelay: `${i * 50}ms` }}
                        />
                    ))}
                </div>
                
                <div className="flex gap-3 mt-4">
                    <div className={`flex justify-center items-center bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] p-3 size-12 rounded-full shadow-lg transition-all duration-500 ${
                        isHovered ? 'scale-110 rotate-3 shadow-xl' : 'scale-100 rotate-0'
                    }`}>
                        <span className="text-white text-sm">{iconText}</span>
                    </div>
                    
                    <div className="text-start flex-1">
                        <h3 className={`font-semibold text-gray-900 transition-all duration-300 ${
                            isHovered ? 'text-black' : 'text-gray-900'
                        }`}>
                            {name}
                        </h3>
                        <p className={`text-xs text-gray-500 transition-all duration-300 ${
                            isHovered ? 'text-gray-600' : 'text-gray-500'
                        }`}>
                            {profession}
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-4 right-4 w-1 h-1 bg-violet-400 rounded-full transition-all duration-1000 ${
                    isHovered ? 'opacity-100 animate-bounce' : 'opacity-0'
                }`} />
                <div className={`absolute bottom-6 left-4 w-1 h-1 bg-cyan-400 rounded-full transition-all duration-1000 ${
                    isHovered ? 'opacity-100 animate-bounce' : 'opacity-0'
                }`} style={{ animationDelay: '0.5s' }} />
            </div>
            
            <div className="absolute top-0 -left-4 w-4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1s_ease-in-out] transition-opacity duration-500" />
        </div>
    )
}

export default TestimonialCard