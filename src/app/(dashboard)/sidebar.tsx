"use client"

import Logo from "./logo"
import SidebarRoutes from "./sidebar-routes"

const Sidebar = ()=>{
    return(
        <aside className="w-[300px] px-2 fixed hidden lg:flex flex-col left-0 shrink-0">
           <Logo />
           <SidebarRoutes />
        </aside>
    )
}

export default Sidebar