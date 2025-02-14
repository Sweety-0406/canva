"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TfiText } from "react-icons/tfi";
import { Button } from "@/components/ui/button"
import { fonts } from "../types";

interface FontSidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const FontSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool
}:FontSidebarProps)=>{
    const value = editor?.font 
    const onClose = ()=>{
        onChangeActiveTool("select")
    }
    console.log(value)
    return(
        <aside 
            className={`
                ${activeTool==="font" ? "visible":"hidden"}
                w-64 bg-white border-r
            `}
        >
            <ToolSidebarHeader onClose={onClose} title="Fonts" description="Change font of your text" />
            <ScrollArea className="p-1 h-[85vh]">
                <div className="mt-2 flex flex-col gap-3 w-full">
                    {fonts.map((font)=>(
                    <Button
                        key={font}
                        style={{
                            fontFamily:font
                        }}
                        variant="outline"
                        className={`
                            w-full rounded-xl
                            ${value == font && "bg-muted"}
                        `}
                        onClick={()=>editor?.changeFont(font)}>
                        {font}
                    </Button>

                    ))}
                    
                </div>
            </ScrollArea>
        </aside>
    )
}

export default FontSidebar

