"use client"

import type { LucideIcon } from "lucide-react"
import { IconType } from "react-icons/lib"
import { cn } from "@/lib/utils"

interface ShapeToolProps{
    onClick:()=>void,
    icon:IconType | LucideIcon,
    iconClassName?:string,
    isActive?: boolean
}

const ShapeTool=({
    onClick,
    icon:Icon,
    iconClassName,
    isActive
}:ShapeToolProps)=>{
    return(
        <div 
            className={`
                ${isActive && "border-2 border-[#8B3DFF]"}
                border p-2 hover:cursor-pointer
            `}
            onClick={onClick}
        >
            <Icon className={cn("h-full w-full flex justify-center", iconClassName)} />
        </div>
    )
}


export default ShapeTool