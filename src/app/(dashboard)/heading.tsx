"use client"

import { useRouter } from "next/navigation"
import { IoFolderOpenOutline } from "react-icons/io5"
import { LuLayoutTemplate } from "react-icons/lu"

const Heading=()=>{
    const router = useRouter()
    return(
        <div>
            <div className="flex flex-col items-center justify-center">
                <h3 className="font-semibold  mt-1 text-4xl bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] bg-clip-text text-transparent">What will you design today?</h3>
                <div className="flex gap-3 mt-4 mb-1">
                    <button className="flex gap-2 bg-white border rounded-full text-sm p-1 px-3  duration-500 hover:bg-[#e7dbff] hover:border-[#8b3dff]"> <IoFolderOpenOutline className="mt-[2px]"/> Your design</button>
                    <button onClick={()=>router.push("/templates")} className="flex gap-2 bg-white border rounded-full text-sm p-1 px-3  duration-500 hover:bg-[#e7dbff] hover:border-[#8b3dff]"><LuLayoutTemplate className="mt-[2px]"/> Templates</button>
                </div> 
            </div> 
        </div>
    )
}

export default Heading