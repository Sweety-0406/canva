"use client"

import Navbar from "./navbar"
import Sidebar from "./sidebar"

interface DashBoardLayoutProps{
    children: React.ReactNode
}

const DashBoardLayout = ({children}: DashBoardLayoutProps)=>{
    return(
        <div className="bg-muted h-full">
            <Sidebar />
            <div className="lg:pl-[300px] h-full">
                <Navbar />
                <main className="bg-white overflow-auto h-full  lg:rounded-tl-xl">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashBoardLayout