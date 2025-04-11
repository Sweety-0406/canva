"use client"

import Logo from "@/app/(dashboard)/logo"
import UserButton from "./userButton"
import Hint from "@/features/editor/components/hint"
import { Button } from "@/components/ui/button"
import { TiHomeOutline } from "react-icons/ti";
import Link from "next/link"
import { BsPatchQuestion } from "react-icons/bs";
import { Loader } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const Navbar = ()=>{
    const session = useSession();
    const router = useRouter();

    if (session.status === "loading") {
    return <Loader className="size-4 animate-spin text-muted-foreground" />
    }

    return(
        <div>
            <nav className="h-[58px]  flex items-center justify-between pr-5 ">
                <Logo />
                {session.data ? (
                    <div className="mt-2 flex gap-3">
                        <div>
                            <Hint 
                                label="Home"
                                side="bottom"
                            >
                                <Button 
                                    onClick={()=>"/"}
                                    size="lg" 
                                    variant="ghost"
                                    className={`
                                        items-center h my-1 rounded-sm  flex justify-center p- px-3
                                        
                                        `}
                                >
                                    <TiHomeOutline 
                                        className="size- rounded-sm "
                                    />    
                                </Button>
                            </Hint>
                        </div>
                        <div>
                            <Hint 
                                label="Help"
                                side="bottom"
                            >
                                <Button 
                                    size="lg" 
                                    variant="ghost"
                                    className={`
                                        items-center h my-1 rounded-sm  flex justify-center p- px-3
                                        
                                        `}
                                >
                                    <Link
                                        href="mailto:kiyaranandi02@gmail.com"
                                    >
                                        <BsPatchQuestion  className="size-6 " />
                                    </Link>   
                                </Button>
                            </Hint>
                        </div>
                        <UserButton />
                    </div>
                ):(
                    <div >
                        <div className="flex gap-3" >
                            <Button
                                onClick={()=>router.push("/sign-in")}
                                variant="purple"
                            >
                                Login
                            </Button>
                            <Button
                                onClick={()=>router.push("/sign-up")}
                                variant="purple"
                                className="hover:cursor-pointer"
                            >
                                Register
                            </Button>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default Navbar

