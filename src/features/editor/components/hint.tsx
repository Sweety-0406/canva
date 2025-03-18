"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface HintProps{
    label: string,
    children: React.ReactNode,
    side?:"top"|"bottom"|"left"|"right"
    align?:"start"|'end'|"center",
    sideOffset?:number,
    customClassName?: string
}

const Hint = ({
    label,
    children,
    side,
    align,
    sideOffset,
    customClassName
 }:HintProps)=>{
    return(
        <TooltipProvider >
            <Tooltip delayDuration={100} >
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent className={cn("bg-slate-800", customClassName )} align={align} side={side} sideOffset={sideOffset}>
                <p className="text-white text-xs capitalize">{label}</p>
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>    )
}

export default Hint