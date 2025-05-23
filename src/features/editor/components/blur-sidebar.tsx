"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@radix-ui/react-dropdown-menu"
import { ActiveTool, Editor } from "../types"
import { Slider } from "@/components/ui/slider"
import { MdLensBlur } from "react-icons/md";
import Hint from "./hint"
import { motion } from "framer-motion"

interface BlurSidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const BlurSidebar = ({
    editor,
    activeTool,
}:BlurSidebarProps)=>{
    const value = editor?.blur || 0


    const onChangeBlurValue=(value:number)=>{
        editor?.changeBlur(value)
    }


    return(
        <div className="">
            <DropdownMenu >
                <DropdownMenuTrigger >
                    <div className={`mt-2 ${activeTool==="opacity"?"bg-muted":"bg-transparent"}`}>
                        <Hint 
                            label="Blur"
                            side="bottom"
                            >
                            <MdLensBlur  
                                className="size-4 -mt- rounded-sm"
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
                        onValueChange={(values)=>onChangeBlurValue(values[0])}
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

export default BlurSidebar

