"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import ColorPicker from "./color-picker" 
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface StrokeWidthSidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const StrokeWidthSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool
}:StrokeWidthSidebarProps)=>{
    const strokeWidthValue = editor?.strokeWidth || 5
    const strokeTypeValue = editor?.strokeType || []
    const onClose = ()=>{
        onChangeActiveTool("select")
    }

    const onChangeStrokeWidth=(value:number)=>{
        editor?.changeStrokeWidth(value)
    }

    const onChangeStrokeType=(value: number[])=>{
        console.log(JSON.stringify(strokeTypeValue))
        editor?.changeStrokeType(value)
    }

    return(
        <aside 
            className={`
                ${activeTool==="stroke-width" ? "visible":"hidden"}
                w-64 bg-white border-r
            `}
        >
            <ToolSidebarHeader onClose={onClose} title="Stroke Options" description="Modify the stroke of your element" />
            <ScrollArea className=" ">
                <div className="border-b mb-2 p-1">
                    <div className="m-1 pb-2">
                        <Label>
                            Stroke width
                        </Label>
                    </div>
                    <div className="m-1 pb-2  ">
                        <Slider 
                            onValueChange={(values)=>onChangeStrokeWidth(values[0])}
                            value={[strokeWidthValue]}
                        />
                    </div>
                </div>
                <div className="p-1 flex flex-col gap-2">
                    <Button 
                        onClick={()=>onChangeStrokeType([])}
                        variant="secondary"
                        className={`
                            w-full
                            ${JSON.stringify(strokeTypeValue) === '[]'? "border border-blue-300": "border-none"}
                        `}
                        >
                        <div className="border-2 rounded-full border-black w-full " />
                    </Button>
                    <Button 
                        onClick={()=>onChangeStrokeType([3,3])}
                        variant="secondary"
                        className={`
                            w-full
                            ${JSON.stringify(strokeTypeValue) === '[3,3]' ? "border border-blue-300": "border-none"}
                        `}
                    >
                        <div className="border-2 border-dashed rounded-full border-black w-full " />
                    </Button>
                </div>
            </ScrollArea>
        </aside>
    )
}

export default StrokeWidthSidebar

