"use client"

import UserButton from "@/features/editor/components/user-button"
import Logo from "./logo"
import Hint from "@/features/editor/components/hint"
import { Button } from "@/components/ui/button"
import { Link, MessageCircleQuestion } from "lucide-react"
import { PiSealQuestionBold } from "react-icons/pi";import SidebarItem from "./sidebar-item"
import { BiArchiveIn } from "react-icons/bi";
import { RiInboxArchiveLine } from "react-icons/ri"
import { LuLayoutTemplate } from "react-icons/lu"
import { useRouter } from "next/navigation"

const Navbar = ()=>{
    const router = useRouter()
    return(
        <div>
            <nav className=" hidden h-[58px] lg:flex justify-end pr-5 ">
                <div className="mt-2">
                    <UserButton />
                </div>
            </nav>
            <nav className="h-[58px] flex lg:hidden justify-between pr-5 ">
                <Logo />
                <div className="mt-2 flex gap-3">
                    <div className="block lg:hidden">
                        <Hint 
                            label="Templates"
                            side="bottom"
                        >
                            <Button 
                                onClick={()=>router.push("/templates")}
                                size="lg" 
                                variant="ghost"
                                className={`
                                    items-center  rounded-sm hover:bg-white  flex justify-center  px-3
                                `}
                            >
                                <LuLayoutTemplate className="size-6 " />
                            </Button>
                        </Hint>
                    </div>
                    <div className="block lg:hidden">
                        <Hint 
                            label="Archive"
                            side="bottom"
                        >
                            <Button 
                                onClick={()=>router.push("/archive")}
                                size="lg" 
                                variant="ghost"
                                className={`
                                    items-center  rounded-sm hover:bg-white  flex justify-center  px-3
                                `}
                            >
                                <RiInboxArchiveLine className="size-6 " />
                            </Button>
                        </Hint>
                    </div>
                    <div className="block lg:hidden">
                        <Hint 
                            label="Help"
                            side="bottom"
                        >
                            <Button 
                                size="lg" 
                                variant="ghost"
                                className={`
                                    items-center  rounded-sm hover:bg-white  flex justify-center  px-3
                                `}
                            >
                                <a
                                    href="mailto:kiyaranandi02@gmail.com"
                                >
                                    <MessageCircleQuestion  className="size-6 " />
                                </a>   
                            </Button>
                        </Hint>
                    </div>
                    <UserButton />
                </div> 
            </nav>
        </div>
    )
}

export default Navbar