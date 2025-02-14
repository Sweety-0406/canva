"use client"

import type { LucideIcon } from "lucide-react"
import { IconType } from "react-icons/lib"
import { cn } from "@/lib/utils"

interface ShapeToolProps{
    onClick:()=>void,
    icon:IconType | LucideIcon,
    iconClassName?:string
}

const ShapeTool=({
    onClick,
    icon:Icon,
    iconClassName
}:ShapeToolProps)=>{
    return(
        <div className="border p-2 hover:cursor-pointer" onClick={onClick}>
            <Icon className={cn("h-full w-full flex justify-center", iconClassName)} />
        </div>
    )
}


export default ShapeTool