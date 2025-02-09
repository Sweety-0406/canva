"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"

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
    const onClose = ()=>{
        onChangeActiveTool("select")
    }

    const onChangeOpacity=(value:number)=>{
        editor?.changeOpacity(value)
    }


    return(
        <aside 
            className={`
                ${activeTool==="opacity" ? "visible":"hidden"}
                w-64 bg-white border-r
            `}
        >
            <ToolSidebarHeader onClose={onClose} title="Opacity" description="Modify the opacity of your element" />
            <ScrollArea>
                <div className="border-b mb-2 p-1">
                    <div className="m-1 mt-6 pb-2  ">
                        <Slider 
                            onValueChange={(values)=>onChangeOpacity(values[0])}
                            value={[value]}
                            max={1}
                            min={0}
                            step={0.01}
                        />
                    </div>
                </div>
            </ScrollArea>
        </aside>
    )
}

export default OpacitySidebar

