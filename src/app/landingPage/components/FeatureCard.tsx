
"use client"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { IconType } from "react-icons/lib"

interface FeatureCardProps {
    title: string,
    description: string,
    icon: IconType | LucideIcon,
}

const FeatureCard = ({
    title,
    description,
    icon: Icon
}: FeatureCardProps) => {
    return (
        <div
            className="group cursor-pointer relative overflow-hidden flex flex-col justify-start bg-white/80 backdrop-blur-md p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-violet-200/50"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-cyan-50/30 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] rounded-xl opacity-0 group-hover:opacity-20 blur-sm transition-all duration-500 group-hover:blur-md" />
            
            <div className="relative z-10">
                <div className="size-12 mb-4 flex justify-center items-center bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] p-3 rounded-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                    <Icon className={cn("size-6 text-white transition-all duration-300 group-hover:scale-110")} />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-gray-900 transition-colors duration-300">
                    {title}
                </h3>
                
                <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">
                    {description}
                </p>
            </div>
            
            <div className="absolute top-0 -left-4 w-4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1s_ease-in-out] transition-opacity duration-500" />
        </div>
    )
}

export default FeatureCard