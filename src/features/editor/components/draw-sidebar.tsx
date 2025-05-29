"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import ColorPicker from "./color-picker" 
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface DrawSidebarProps{
    editor: Editor | undefined,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const DrawSidebar = ({
    editor,
    onChangeActiveTool
}:DrawSidebarProps)=>{
    const strokeColorvalue = editor?.strokeColor || "#00000"
    const strokeTypeValue = editor?.strokeType || []

    const strokeWidthValue = editor?.strokeWidth || 5

    const onClose = ()=>{
        onChangeActiveTool("select")
    }

    const onChangeStrokeWidth=(value:number)=>{
        editor?.changeStrokeWidth(value)
    }

    const onChange=(value:string)=>{
        editor?.changeStrokeColor(value)
    }

    const onChangeStrokeType=(value: number[])=>{
        editor?.changeStrokeType(value)
    }



    return(
        <motion.div 
            initial={{ opacity: 0, x: -240 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -240 }}
            transition={{ duration: 0.5 }}
            className="w-72  bg-white border-r absolute z-40 h-full left-[68px]"
        >
            <ToolSidebarHeader onClose={onClose} title="Draw" description="Change the brush attributes" />
            <ScrollArea className="p-3 h-[84vh]">
                <div className="m-1">
                    <div className=" pb-2">
                        <Label>
                            Stroke color
                        </Label>
                    </div>
                    <ColorPicker value={strokeColorvalue} onChange={onChange} />
                </div>
                <div className="border-t mb-2 p-1 mt-4">
                    <div className="m-1 pb-2">
                        <Label>
                            Stroke width
                        </Label>
                    </div>
                    <div className="m-1 pb-2  ">
                        <Slider 
                            className=""
                            onValueChange={(values)=>onChangeStrokeWidth(values[0])}
                            value={[strokeWidthValue]}
                        />
                    </div>
                </div>
                <div className="border-t mb-2 p-1">
                    <div className="m-1 pb-2">
                        <Label>
                            Stroke type
                        </Label>
                    </div>
                    <div className="p-1 flex flex-col gap-2">
                        <Button 
                            onClick={()=>onChangeStrokeType([])}
                            variant="secondary"
                            className={`
                                w-full
                                ${JSON.stringify(strokeTypeValue) === '[]'? "border-2 border-[#8B3DFF]": "border-none"}
                            `}
                            >
                            <div className="border-2 rounded-full border-black w-full " />
                        </Button>
                        <Button 
                            onClick={()=>onChangeStrokeType([10,10])}
                            variant="secondary"
                            className={`
                                w-full
                                ${JSON.stringify(strokeTypeValue) === '[10,10]' ? "border-2 border-[#8B3DFF]": "border-none"}
                            `}
                        >
                            <div className="border-2 border-dashed rounded-full border-black w-full " />
                        </Button>
                    </div>
                </div>
            </ScrollArea>
        </motion.div>
    )
}

export default DrawSidebar

