"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import ColorPicker from "./color-picker" 
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface DrawSidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const DrawSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool
}:DrawSidebarProps)=>{
    const strokeColorvalue = editor?.strokeColor || "#00000"
    const opacityValue = editor?.selectedObjects[0]?.opacity || 1
    const strokeTypeValue = editor?.strokeType || []

    const strokeWidthValue = editor?.strokeWidth || 5
    // const strokeTypeValue = editor?.strokeType || []

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
        console.log(JSON.stringify(strokeTypeValue))
        editor?.changeStrokeType(value)
    }

    const onChangeOpacity=(value:number)=>{
        editor?.changeOpacity(value)
    }

    return(
        <aside 
            className={`
                ${activeTool==="draw" ? "visible":"hidden"}
                w-64 bg-white border-r
            `}
        >
            <ToolSidebarHeader onClose={onClose} title="Draw" description="Change the brush attributes" />
            <ScrollArea className="p-1 h-[85vh]">
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
                    {/* <div className="m-1 pb-2  ">
                        <Slider 
                            onValueChange={(values)=>onChangeOpacity(values[0])}
                            value={[opacityValue]}
                            max={1}
                            min={0}
                            step={0.01}
                            className="cursor-pointer"
                        />
                    </div> */}
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
        </aside>
    )
}

export default DrawSidebar

