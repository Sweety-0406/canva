"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import ShapeTool from "./shape-tool";
import { CiTextAlignCenter, CiTextAlignJustify, CiTextAlignLeft, CiTextAlignRight  } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";

interface TextAlignSidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const TextAlignSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool
}:TextAlignSidebarProps)=>{
    //@ts-ignore
    const value = editor?.selectedObjects[0]?.get("textAlign") 

    const onClose = ()=>{
        onChangeActiveTool("select")
    }

    return(
        <motion.div 
            initial={{ opacity: 0, x: -240 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -240 }}
            transition={{ duration: 0.5 }}
            className="w-64 bg-white border-r absolute z-40 h-full left-16"
        >
            <ToolSidebarHeader onClose={onClose} title="Text Align" description="Align text of your element" />
            <ScrollArea className="p-1">
                <div className="grid  pt-2 grid-cols-3 gap-2">
                    {value=="left" ? (
                        <ShapeTool icon={CiTextAlignLeft} onClick={()=>editor?.changeTextAlign("left")} isActive={true} />
                    ):(
                        <ShapeTool icon={CiTextAlignLeft} onClick={()=>editor?.changeTextAlign("left")} />
                    )}
                    {value=="center" ? (
                        <ShapeTool icon={CiTextAlignCenter} onClick={()=>editor?.changeTextAlign("center")} isActive={true} />
                    ):(
                        <ShapeTool icon={CiTextAlignCenter} onClick={()=>editor?.changeTextAlign("center")} />
                    )}
                    {value=="right" ? (
                        <ShapeTool icon={CiTextAlignRight} onClick={()=>editor?.changeTextAlign("right")} isActive={true} />
                    ):(
                        <ShapeTool icon={CiTextAlignRight} onClick={()=>editor?.changeTextAlign("right")} />
                    )}
                    {value=="justify" ? (
                        <ShapeTool icon={CiTextAlignJustify} onClick={()=>editor?.changeTextAlign("justify")} isActive={true} />
                    ):(
                        <ShapeTool icon={CiTextAlignJustify} onClick={()=>editor?.changeTextAlign("justify")} />
                    )}
                </div>
            </ScrollArea>
        </motion.div>
    )
}

export default TextAlignSidebar

