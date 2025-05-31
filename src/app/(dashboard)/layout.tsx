"use client"

import { NamedTemplateModal } from "@/features/editor/components/namedTemplateModal"
import Navbar from "./navbar"
import Sidebar from "./sidebar"

interface DashBoardLayoutProps{
    children: React.ReactNode
}

const DashBoardLayout = ({children}: DashBoardLayoutProps)=>{
    return(
        <div className="bg-white h-full z-50">
            <NamedTemplateModal/>
            <Sidebar />
            <div className="pl-12 lg:pl-[300px] h-full max-h-screen overflow-hidden">
                <Navbar />
                <main className="bg-white overflow-auto h-full  lg:rounded-tl-xl">
                    {children} 
                </main>
            </div>
        </div>
    )
}

export default DashBoardLayout