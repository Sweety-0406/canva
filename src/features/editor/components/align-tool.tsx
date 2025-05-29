"use client"

import type { LucideIcon } from "lucide-react"
import { IconType } from "react-icons/lib"
import { cn } from "@/lib/utils"

interface AlignToolProps{
    onClick:()=>void,
    icon:IconType | LucideIcon,
    iconClassName?:string,
    isActive?: boolean
}

const AlignTool=({
    onClick,
    icon:Icon,
    iconClassName,
    isActive
}:AlignToolProps)=>{
    return(
        <div 
            className={`
                ${isActive && "border-2  border-[#8B3DFF]"}
                border p-[1px] hover:cursor-pointer rounded-md w-7 flex justify-center
            `}
            onClick={onClick}
        >
            <Icon className={cn("h-5 w-5 flex justify-center", iconClassName)} />
        </div>
    )
}


export default AlignTool