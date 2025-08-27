'use client';
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { LuSparkles } from "react-icons/lu";
import Image from "next/image";
import { GoDotFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useCreateProject } from "@/features/editor/hooks/useCreateProject";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useGetSubscription } from "@/features/editor/hooks/useGetSubscription";
import { useGetUser } from "@/features/editor/hooks/useGetUser";
import { useQueryClient } from "@tanstack/react-query";

export default function Hero() {
  const router = useRouter();
  const mutation = useCreateProject();
  const session = useSession();
  const{data: subscription, isLoading} = useGetSubscription()
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const queryClient = useQueryClient();

  const onClick = async () => {
    if (!session.data?.user) {
      toast.error("Please login");
      return;
    }
    
    if(!isLoading && !isUserLoading && !subscription?.status && user?.totalProjects === 5){
      toast.error("You have reached the limit. Please upgrade to continue")
      return;
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
          queryClient.invalidateQueries({ queryKey: ["user"] });
          router.push(`/editor/${data.id}`);
        },
      }
    );
  };

  return (
    <section className="relative min-h-screen pt-32 md:pt-44 pb-24 px-6 text-center md:text-left overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-50">
        <Image src="/images/background.png" alt="Shapes" fill className="object-cover" />
      </div>

      <div className="flex flex-col md:mx-[5%] lg:flex-row gap-5">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block bg-white/20 px-3 py-2 text-sm rounded-full backdrop-blur-md mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex gap-3">
              <LuSparkles className="text-[#00c4cc] size-5" />{" "}
              <span className="bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] bg-clip-text text-transparent">
                Now with AI-powered design suggestions
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-left md:text-6xl font-extrabold leading-tight"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            Design anything with{" "}
            <span className="bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] bg-clip-text text-transparent">
              PixelForge
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 md:text-left text-lg md:text-xl text-gray-500 md:mr-[15%]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The most intuitive design platform for creators, teams, and businesses.
            From social media graphics to presentations, create stunning visuals in minutes.
          </motion.p>

          <motion.div
            className="mt-8 flex justify-center md:justify-start gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Button
              disabled={mutation.isPending}
              onClick={onClick}
              className="bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] text-white font-bold px-6 py-3 rounded-lg shadow-md hover:opacity-70"
            >
              Start Creating Free →
            </Button>
            <Button
              variant="outline"
              className="text-black border-white/50 hover:bg-white/10 px-6 py-3 rounded-lg flex items-center gap-2"
            >
              <Play size={16} /> Watch Demo
            </Button>
          </motion.div>

          <motion.div
            className="mt-6 justify-center md:justify-start flex text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <GoDotFill className="mt-[2px] text-blue-700" />
            No credit card required
            <GoDotFill className="mt-[2px] text-blue-700" /> 10M+ templates
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        >
          <Image
            src="/images/hero8.jpg"
            alt="PixelForge UI"
            width={900}
            height={500}
            className="rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
