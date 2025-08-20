
"use client"
import { LiaRupeeSignSolid } from "react-icons/lia";
import { RxCheck } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useBilling } from "@/features/editor/hooks/useBilling";
import usePaywall from "@/features/editor/hooks/usePaywall";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface PricingCardProps {
    title: string,
    cost: string,
    costText: string,
    features: string[],
    description: string,
    popular?: boolean,
    billing: "free" | "monthly" | "yearly"
}

const PricingCard = ({
    title,
    cost,
    costText,
    features,
    description,
    popular,
    billing
}: PricingCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter()
    const { shouldBlock, triggerPaywall, isLoading } = usePaywall();
    const mutation = useBilling();
    const session = useSession();

    const onClick = () => {
        if (session.status === "unauthenticated" || !session.data) {
            toast.error("Please login to continue");
            return null;
        }
        if (shouldBlock) {
            if(billing === "free"){
                router.push("/")
            }else if(billing === "monthly"){
                triggerPaywall("monthly");
            }else{
                triggerPaywall("yearly");
            }
            return;
        }

        mutation.mutate();
    };
    return (
        <div
            className={`
                group cursor-pointer relative  bg-white/90 backdrop-blur-md p-6 py-10 rounded-xl shadow-md transition-all duration-500
                ${popular 
                    ? "border-2 shadow-xl shadow-violet-200/50 scale-y-110 scale-x-105 border-violet-500 hover:shadow-2xl hover:shadow-violet-200/60" 
                    : "border border-gray-200 hover:shadow-xl hover:scale-105 hover:shadow-violet-200/30"
                }
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`absolute inset-0 transition-opacity duration-500 ${
                popular 
                    ? 'bg-gradient-to-br from-violet-50/60 via-cyan-50/40 to-purple-50/60 opacity-100' 
                    : 'bg-gradient-to-br from-violet-50/30 via-cyan-50/20 to-purple-50/30 opacity-0 group-hover:opacity-100'
            }`} />

            {popular && (
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] rounded-xl opacity-20 blur-md" />
            )}

            {popular && (
                <div className={`absolute mx-auto  -top-5 w-full transform transition-all duration-500 ${
                    isHovered ? 'scale-110 -top-6' : 'scale-100'
                }`}>
                    <Button 
                        variant="purple" 
                        className="items-center  mr-8 hover:cursor-default bg-white bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] text-white shadow-lg"
                    >
                        Most popular
                    </Button>
                </div>
            )}

            <div className="relative z-10">
                <div className="flex flex-col gap-3">
                    {/* Title with animation */}
                    <div className={`font-bold text-start text-xl md:text-3xl transition-all duration-300 ${
                        isHovered ? 'text-gray-900' : 'text-gray-800'
                    }`}> 
                        {title} 
                    </div>
                    
                    {/* Price with animation */}
                    <div className="flex">
                        <div className={`font-bold flex gap-0 text-3xl md:text-4xl transition-all duration-300 ${
                            isHovered ? 'scale-105' : 'scale-100'
                        }`}>
                            <LiaRupeeSignSolid className="mt-[3px]" />
                            {cost}
                        </div>
                        <p className="mt-3 ml-1 text-gray-500">/{costText}</p>
                    </div>
                    
                    <div className={`text-start text-gray-500 transition-colors duration-300 ${
                        isHovered ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                        {description}
                    </div>
                </div>

                {/* Features list with staggered animation */}
                <div className="my-8 space-y-2">
                    {features.map((f, i) => (
                        <div 
                            key={i} 
                            className={`text-gray-700 flex gap-2 transition-all duration-300 ${
                                isHovered ? 'translate-x-1' : 'translate-x-0'
                            }`}
                            style={{ transitionDelay: `${i * 50}ms` }}
                        >
                            <RxCheck className={`text-cyan-500 size-7 transition-all duration-300 ${
                                isHovered ? 'scale-110 text-cyan-600' : 'scale-100'
                            }`} />
                            <span className={`transition-colors duration-300 ${
                                isHovered ? 'text-gray-800' : 'text-gray-700'
                            }`}>
                                {f}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Animated CTA button */}
                <Button 
                    disabled={isLoading}
                    onClick={onClick}
                    className={`w-full transition-all duration-300 bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] text-white font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-xl ${
                        isHovered 
                            ? 'scale-105 shadow-lg hover:shadow-violet-200/50' 
                            : 'scale-100 hover:opacity-90'
                    }`}
                >
                    Get Started
                </Button>
            </div>

            {/* Floating elements for popular card */}
            {popular && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className={`absolute top-6 right-6 w-2 h-2 bg-violet-400 rounded-full transition-all duration-1000 ${
                        isHovered ? 'opacity-100 animate-bounce' : 'opacity-0'
                    }`} />
                    <div className={`absolute bottom-8 left-6 w-1 h-1 bg-cyan-400 rounded-full transition-all duration-1000 ${
                        isHovered ? 'opacity-100 animate-bounce' : 'opacity-0'
                    }`} style={{ animationDelay: '0.5s' }} />
                </div>
            )}

            {/* Shine effect */}
            <div className="absolute top-0 -left-4 w-4 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_ease-in-out] transition-opacity duration-500" />
        </div>
    )
}

export default PricingCard