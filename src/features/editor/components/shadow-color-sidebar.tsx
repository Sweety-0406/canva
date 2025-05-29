"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import ColorPicker from "./color-picker" 
import { motion } from "framer-motion"

interface ShadowColorSidebarProps{
    editor: Editor | undefined,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const ShadowColorSidebar = ({
    editor,
    onChangeActiveTool
}:ShadowColorSidebarProps)=>{
    const textShadow = editor?.selectedObjects[0]?.get("shadow")    
    const onClose = ()=>{
        onChangeActiveTool("select")
    } 

    const onChange=(value:string)=>{
        editor?.changeTextShadow( value)
    }
    const value = typeof textShadow ==="object"? textShadow?.color:"black" 
    return(
        <motion.div 
            initial={{ opacity: 0, x: -240 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -240 }}
            transition={{ duration: 0.5 }}
            className="w-72 bg-white border-r absolute z-40 h-full left-[68px]"
        >
            <ToolSidebarHeader onClose={onClose} title="Shadow color" description="Add shadow color to your element" />
            <ScrollArea className="p-3 h-[84vh]">
                <div className="m-1">
                    <ColorPicker  value={value} onChange={onChange} />
                </div>
            </ScrollArea>
        </motion.div>
    )
}

export default ShadowColorSidebar
