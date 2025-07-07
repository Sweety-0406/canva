"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link"
import { MdKeyboardArrowRight } from "react-icons/md";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { useRouter } from "next/navigation";
import { useCreateProject } from "@/features/editor/hooks/useCreateProject";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";


const HeroPage=()=>{
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
    return(
        <div className="bg-purple-100 min-h-screen p-4 md:px-[8%] lg:px-[10%] flex  flex-row md:flex-col justify-between lg:flex-row gap-2  ">
            <div className="">
              <div className="flex gap-2">
                  <Link href={"/"} className="hover:underline text-xs lg:text-sm hover:underline-offset-2">
                      Home
                  </Link>
                  <MdKeyboardArrowRight  className="size-4 lg:size-5" />
                  <p className="text-xs lg:text-sm">Create Landing Pages</p>
              </div>
              <div className="max-w-[300px]  sm:max-w-[350px] mt-44 md:mt-20 lg:mt-44 lg:max-w-[350px] xl:max-w-[570px]">
                  <h1 className="text-3xl sm:text-4xl font-serif lg:text-6xl">Free Online Landing Page Builder</h1>
                  <Button 
                    disabled={mutation.isPending} 
                    onClick={onClick}
                    variant="purple"
                    className="mt-8"
                  >
                      Create a landing page
                  </Button>
              </div>
            </div>
            <div>
            <div className="overflow-hidden  -mt-16 md:mt-auto w-full">
                <MacbookScroll 
                    src={`/images/landing-page.png`}
                    // showGradient={false}
                />
            </div>
            </div>
        </div>
    )
}

export default HeroPage