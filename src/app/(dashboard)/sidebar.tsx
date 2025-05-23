"use client"

import Logo from "./logo"
import SidebarRoutes from "./sidebar-routes"

const Sidebar = ()=>{
    return(
        <aside className="w-12 lg:w-[300px] mt-[58px] lg:mt-0 border-r  lg:px-2 h-full fixed flex flex-col left-0 shrink-0">
            <div className="hidden lg:block">
                <Logo />
            </div>
           <SidebarRoutes />
        </aside>
    )
}

export default Sidebar