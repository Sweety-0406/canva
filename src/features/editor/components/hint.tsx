
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
      <Tooltip delayDuration={100} >
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          sideOffset={sideOffset}
          className={cn("text-muted bg-[#171f25] text-xs z-[200] capitalize px-2 py-1 rounded shadow", customClassName)}
        >
          {label}
          <TooltipArrow className="fill-[#171f25]" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Hint
