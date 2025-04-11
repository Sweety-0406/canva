"use client"
import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/features/editor/hooks/useCreateProject";
import { useSession } from "next-auth/react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";
import { motion, AnimatePresence } from 'framer-motion';

const LandingPageArea = ()=>{
    const router = useRouter();
    const mutation = useCreateProject();
    const session = useSession()
  
    const onClick = async () => {
      if(!session.data?.user){
        toast.error("Please login");
        return
      }
      mutation.mutate(
        {
          name: "Untitled Project",
          json: "",
          width: 500,
          height: 700,
        },
        {
          onSuccess: ({ data }) => {
            router.push(`/editor/${data.id}`);
          },
        }
      );
    };    
    const [step, setStep] = useState(1);
    return(
        <div className="mt-10 p-4 lg:px-[24%] ">
            <h1 className="text-xl font-semibold">How to create a landing page</h1>
            <div className="aspect-video mt-10 ">
                <div className="h-full w-full  bg-cover bg-center bg-[url('/images/device.png')] relative">
                    <Image
                        src="/images/website-template.jpg"
                        alt="Landing page creation image"
                        width={100}
                        height={100}
                        className="object-cover h-[90%] w-[76%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                </div>
            </div>
            <div>
                <div className="flex gap-2 my-10"> 
                    <div 
                        onClick={()=>setStep(1)} 
                        className={`
                            w-full h-1 rounded-md
                            ${step==1 ? "bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600":"bg-gray-200"}
                        `}
                    />
                    <div 
                        onClick={()=>setStep(2)} 
                        className={`
                            w-full h-1 rounded-md
                            ${step==2 ? "bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600":"bg-gray-200"}
                        `}
                    />
                    <div 
                        onClick={()=>setStep(3)} 
                        className={`
                            w-full h-1 rounded-md
                            ${step==3 ? "bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600":"bg-gray-200"}
                        `}
                    />
                    <div 
                        onClick={()=>setStep(4)} 
                        className={`
                            w-full h-1 rounded-md
                            ${step==4 ? "bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600":"bg-gray-200"}
                        `}
                    />
                    <div 
                        onClick={()=>setStep(5)} 
                        className={`
                            w-full h-1 rounded-md
                            ${step==5 ? "bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600":"bg-gray-200"}
                        `}
                    />
                </div>

                <div className="h-36">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h1 className="font-semibold round mb-4 text-[17px]">Open Canva</h1>
                                <p className="text-[17px]">Launch Canva and search for “Website” to begin your webpage design.</p>
                            </motion.div>
                        )}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h1 className="font-semibold round mb-4 text-[17px]">Select a template</h1>
                                <p className="text-[17px]">Browse through our collection of customizable layouts. Choose a design that will fit your intent or purpose. Filter your search according to color, theme, or style.</p>
                            </motion.div>
                        )}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h1 className="font-semibold round mb-4 text-[17px]">Personalize your site</h1>
                                <p className="text-[17px]">You can apply quick changes to your design, so it’s ready to publish. Tweak existing placeholder text to your own content and modify fonts, sizes, and colors.</p>
                            </motion.div>
                        )}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h1 className="font-semibold round mb-4 text-[17px]">Add more elements</h1>
                                <p className="text-[17px]">Use graphic elements from our rich media library to elaborate your content. Pick text styles, backgrounds, illustrations, vectors, images, and videos. You can also upload them from your gallery.</p>
                            </motion.div>
                        )}
                        {step === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h1 className="font-semibold mb-4 text-[17px]">Publish to the web</h1>
                                <p className="text-[17px]">Save your landing page design and publish straight from Canva. Use your own domain or our free domain for up to five free live websites. You can also buy a domain through Canva and publish unlimited websites. Then, share the link with your target audience.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div>
                    <Button onClick={onClick} variant="purple" className="w-full">
                        Create a landing page
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LandingPageArea