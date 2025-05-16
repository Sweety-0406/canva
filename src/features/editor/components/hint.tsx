// "use client"

// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
// } from "@/components/ui/tooltip"
// import { cn } from "@/lib/utils"

// interface HintProps{
//     label: string,
//     children: React.ReactNode,
//     side?:"top"|"bottom"|"left"|"right"
//     align?:"start"|'end'|"center",
//     sideOffset?:number,
//     customClassName?: string
// }

// const Hint = ({
//     label,
//     children,
//     side,
//     align,
//     sideOffset,
//     customClassName
//  }:HintProps)=>{
//     return(
//         <TooltipProvider >
//             <Tooltip delayDuration={100} >
//             <TooltipTrigger asChild>
//                 {children}
//             </TooltipTrigger>
//             <TooltipContent className={cn("bg-slate-800", customClassName )} align={align} side={side} sideOffset={sideOffset}>
//                 <p className="text-white text-xs capitalize">{label}</p>
//             </TooltipContent>
//             </Tooltip>
//         </TooltipProvider>    )
// }

// export default Hint


"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface HintProps {
  label: string
  children: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "end" | "center"
  sideOffset?: number
  customClassName?: string
}

const Hint = ({
  label,
  children,
  side = "top",
  align = "center",
  sideOffset = 2,
  customClassName,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={cn("bg-slate-800 text-white text-xs capitalize px-2 py-1 rounded shadow", customClassName)}
        >
          {label}
          <TooltipArrow className="fill-slate-800 " />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Hint
