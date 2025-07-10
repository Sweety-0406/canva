"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@radix-ui/react-dropdown-menu"
import { ActiveTool, Editor } from "../types"
import { Slider } from "@/components/ui/slider"
import { RiShadowLine } from "react-icons/ri";
import Hint from "./hint"
import { motion } from "framer-motion"

interface OffsetSidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void 
}

const OffsetSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool
}:OffsetSidebarProps)=>{
    const color = editor?.textShadow || "#fffff"
    const offsetX = editor?.offsetX || 0
    const offsetY = editor?.offsetY ?? 0

    const onChangeOffsetX=(value:number)=>{
        editor?.changeOffsetX(value)
        editor?.changeTextShadow(color)
    }

    const onChangeOffsetY=(value:number)=>{
        editor?.changeOffsetY(value)
        editor?.changeTextShadow(color)
    }


    return(
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                onChangeActiveTool("offset");
            } else {
                onChangeActiveTool("select");
            }
        }}>
            <DropdownMenuTrigger asChild>
                <div  className={`p-2 hover:bg-muted hover:cursor-pointer rounded-sm ${activeTool === "offset" ? "bg-[#a570ff33]" : "bg-transparent border-none"}`}>
                <Hint 
                    label="Offset" 
                    sideOffset={10}  
                    side="bottom"
                >
                    <RiShadowLine  className="size-4 rounded-sm" />
                </Hint>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent asChild>
                <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="w-44 flex flex-col gap-6 rounded-md bg-white shadow-md p-4 mt-4"
                >
                <Slider
                    onValueChange={(values) => onChangeOffsetX(values[0])}
                    value={[offsetX]}
                    max={50}
                    min={-50}
                    step={1}
                    className="cursor-pointer"
                />
                <Slider
                    onValueChange={(values) => onChangeOffsetY(values[0])}
                    value={[offsetY]}
                    max={50}
                    min={-50}
                    step={1}
                    className="cursor-pointer"
                />
                </motion.div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default OffsetSidebar

