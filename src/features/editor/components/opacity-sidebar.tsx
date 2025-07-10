"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@radix-ui/react-dropdown-menu"
import { ActiveTool, Editor } from "../types"
import { Slider } from "@/components/ui/slider"
import { RxTransparencyGrid } from "react-icons/rx"
import Hint from "./hint"
import { motion } from "framer-motion"

interface OpacitySidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void 
}

const OpacitySidebar = ({
    editor,
    activeTool,
    onChangeActiveTool
}:OpacitySidebarProps)=>{
    const value = editor?.selectedObjects[0]?.opacity || 1


    const onChangeOpacity=(value:number)=>{
        editor?.changeOpacity(value)
    }


    return(
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                onChangeActiveTool("opacity");
            } else {
                onChangeActiveTool("select"); // 👈 or whatever your default tool is
            }
        }}>
            <DropdownMenuTrigger asChild>
                <div  className={`p-2 hover:bg-muted hover:cursor-pointer rounded-sm ${activeTool === "opacity" ? "bg-[#a570ff33]" : "bg-transparent border-none"}`}>
                    <Hint 
                        label="Transparency" 
                        sideOffset={10} 
                        side="bottom"
                    >
                        <RxTransparencyGrid  className="size-4 rounded-sm" />
                    </Hint>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent asChild>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="w-44 rounded-md bg-white shadow-md p-4 mt-4"
                >
                    <Slider 
                    onValueChange={(values)=>onChangeOpacity(values[0])}
                    value={[value]}
                    max={1}
                    min={0}
                    step={0.01}
                    className="cursor-pointer"
                    />
                </motion.div>
            </DropdownMenuContent>

        </DropdownMenu>
    )
}

export default OpacitySidebar

