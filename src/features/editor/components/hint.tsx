"use client"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface HintProps{
    label: string,
    children: React.ReactNode,
    side?:"top"|"bottom"|"left"|"right"
    align?:"start"|'end'|"center",
    sideOffset?:number
}

const Hint = ({
    label,
    children,
    side,
    align,
    sideOffset
 }:HintProps)=>{
    return(
        <TooltipProvider >
            <Tooltip delayDuration={100} >
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent className="bg-slate-800" align={align} side={side} sideOffset={sideOffset}>
                <p className="text-white capitalize">{label}</p>
            </TooltipContent>
            </Tooltip>
        </TooltipProvider>    )
}

export default Hint