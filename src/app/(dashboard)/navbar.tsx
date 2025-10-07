"use client"

import UserButton from "@/features/editor/components/user-button"
import Logo from "./logo"
import { Button } from "@/components/ui/button"
import usePaywall from "@/features/editor/hooks/usePaywall"
import { FaCrown } from "react-icons/fa"
import { useBilling } from "@/features/editor/hooks/useBilling"

const Navbar = ()=>{
    const { shouldBlock, triggerPaywall, isLoading } = usePaywall();
    const mutation = useBilling();
    
      const onClick = () => {
        if (shouldBlock) {
          triggerPaywall();
          return;
        }
    
        mutation.mutate();
    };
    return(
        <div className="border-b">
            <nav className=" hidden h-[10vh] items-center lg:flex justify-end pr-5 ">
                {shouldBlock && !isLoading && (
                    <div className="mt-2">
                        <div className="px-2 ">
                            <Button
                                disabled={mutation.isPending}
                                onClick={onClick}
                                className="flex w-full rounded-lg hover:bg-white  hover:opacity-75 transition"
                                variant="outline"
                            >
                                <FaCrown size={10} className="fill-yellow-500 text-yellow-500" />
                                <div>Upgrade to PixelForge Pro</div>
                            </Button>
                        </div>
                    </div>
                )}
                <div className="mt-2">
                    <UserButton />
                </div>
            </nav>
            <nav className="h-[58px] flex lg:hidden justify-between pr-5 ">
                <div className="-ml-12">
                    <Logo />
                </div>
                <div className="mt-2 flex gap-3">
                    <UserButton />
                </div> 
            </nav>
        </div>
    )
}

export default Navbar