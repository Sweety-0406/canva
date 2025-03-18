"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import ColorPicker from "./color-picker" 

interface ShadowColorSidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const ShadowColorSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool
}:ShadowColorSidebarProps)=>{
    const textShadow = editor?.selectedObjects[0]?.get("shadow")    
    const onClose = ()=>{
        onChangeActiveTool("select")
    }

    const onChange=(value:string)=>{
        console.log(typeof value)
        editor?.changeTextShadow( value)
    }
    const value = typeof textShadow ==="object"? textShadow?.color:"black" 
    console.log(textShadow)
    return(
        <aside 
            className={`
                ${activeTool==="shadow" ? "visible":"hidden"}
                w-64 bg-white border-r
            `}
        >
            <ToolSidebarHeader onClose={onClose} title="Shadow color" description="Add shadow color to your element" />
            <ScrollArea className="p-1">
                <div className="m-1">
                    <ColorPicker  value={value} onChange={onChange} />
                </div>
            </ScrollArea>
        </aside>
    )
}

export default ShadowColorSidebar

