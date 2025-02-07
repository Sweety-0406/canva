"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import ColorPicker from "./color-picker" 

interface FillColorSidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const FillColorSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool
}:FillColorSidebarProps)=>{
    const value = editor?.fillColor || "#00000"
    const onClose = ()=>{
        onChangeActiveTool("select")
    }

    const onChange=(value:string)=>{
        editor?.changeFillColor(value)
    }

    return(
        <aside 
            className={`
                ${activeTool==="fill" ? "visible":"hidden"}
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

export default FillColorSidebar

