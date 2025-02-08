"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import ColorPicker from "./color-picker" 

interface StrokeColorSidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const StrokeColorSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool
}:StrokeColorSidebarProps)=>{
    const value = editor?.strokeColor || "#00000"
    const onClose = ()=>{
        onChangeActiveTool("select")
    }

    const onChange=(value:string)=>{
        editor?.changeStrokeColor(value)
    }

    return(
        <aside 
            className={`
                ${activeTool==="stroke-color" ? "visible":"hidden"}
                w-64 bg-white border-r
            `}
        >
            <ToolSidebarHeader onClose={onClose} title="Fill color" description="Add fill color to your element" />
            <ScrollArea className="p-1">
                <div className="m-1">
                    <ColorPicker value={value} onChange={onChange} />
                </div>
            </ScrollArea>
        </aside>
    )
}

export default StrokeColorSidebar

