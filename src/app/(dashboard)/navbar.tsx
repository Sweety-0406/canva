"use client"

import UserButton from "@/features/editor/components/user-button"
import Logo from "./logo"


const Navbar = ()=>{
    return(
        <div>
            <nav className=" hidden h-[58px] lg:flex justify-end pr-5 ">
                <div className="mt-2">
                    <UserButton />
                </div>
            </nav>
            <nav className="h-[58px] flex lg:hidden justify-between pr-5 ">
                <Logo />
                <div className="mt-2">
                    <UserButton />
                </div>
            </nav>
        </div>
    )
}

export default Navbar