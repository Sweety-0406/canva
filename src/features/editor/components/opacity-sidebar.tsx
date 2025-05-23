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
}

const OpacitySidebar = ({
    editor,
    activeTool,
}:OpacitySidebarProps)=>{
    const value = editor?.selectedObjects[0]?.opacity || 1


    const onChangeOpacity=(value:number)=>{
        editor?.changeOpacity(value)
    }


    return(
        <div className="">
            <DropdownMenu >
                <DropdownMenuTrigger >
                    <div className={`mt-2 ${activeTool==="opacity"?"bg-muted":"bg-transparent"}`}>
                        <Hint 
                            label="Transparency"
                            side="bottom"
                            >
                            <RxTransparencyGrid  
                                className="size-4 rounded-sm"
                            /> 
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
        </div>
    )
}

export default OpacitySidebar

