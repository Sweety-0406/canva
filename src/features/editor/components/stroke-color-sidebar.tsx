"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import ColorPicker from "./color-picker" 
import { useEffect, useState } from "react"
import { HiOutlineColorSwatch } from "react-icons/hi"
import { IoColorPaletteOutline } from "react-icons/io5"
import { motion } from "framer-motion"

interface StrokeColorSidebarProps{
    editor: Editor | undefined,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const StrokeColorSidebar = ({
    editor,
    onChangeActiveTool
}:StrokeColorSidebarProps)=>{
    const value = editor?.selectedObjects[0].stroke || "#000000"
    // const value = editor?.strokeColor || "#000000"
    const [colors, setColors] = useState<string[]>([])
    useEffect(() => {
        const selectedObjects = editor?.selectedObjects
        if (!selectedObjects) return;

        const objectsColors: string[] = []

        for (let i = 0; i < selectedObjects.length; i++) {
            const fill = selectedObjects[i].stroke

            if (typeof fill === "string") {
                objectsColors.push(fill)
            } else {
                console.warn("Non-string fill type (gradient/pattern) found:", fill)
            }
        }

        const uniqueColors = [...new Set(objectsColors)];

        setColors(uniqueColors);
    }, [editor?.selectedObjects, value])
    const onClose = ()=>{
        onChangeActiveTool("select")
    }

    const onChange=(value:string)=>{
        editor?.changeStrokeColor(value)
    }

    return(
        <motion.div 
            initial={{ opacity: 0, x: -240 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -240 }}
            transition={{ duration: 0.5 }}
            className="w-72  bg-gradient-to-r from-white/80 to-white border-r absolute z-40 h-full left-[74px]"
        >
            <ToolSidebarHeader onClose={onClose} title="Stroke color" description="Add stroke color to your element" />
            <ScrollArea className="p-3 h-[84vh]">
                {colors.length > 0 && (
                    <div>
                        <div className="flex gap-1 text-slate-500 text-sm mb-1 w-full">
                            <HiOutlineColorSwatch  className="size-5 " />
                            <div>Your document stroke colors</div> 
                        </div>
                        <div className="flex gap-2 flex-wrap w-full mb-2">
                            {colors.map((c, i) => (
                                <button
                                key={i}
                                title={c}
                                onClick={()=>onChange(c)}
                                className=" h-[25px] w-[25px] rounded-full border shadow"
                                style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <div className="m-1 mt-5">
                    <div className="flex gap-1 text-slate-500 text-sm mb-1 w-full">
                        <IoColorPaletteOutline className=" size-5 " />
                        <div>Choose stroke color</div> 
                    </div>
                    <ColorPicker value={value} onChange={onChange} />
                </div>
            </ScrollArea>
        </motion.div>
    )
}

export default StrokeColorSidebar

