"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { filters } from "../types";
import Image from "next/image"

interface FilterSidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const FilterSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool
}:FilterSidebarProps)=>{
    const onClose = ()=>{
        onChangeActiveTool("select")
    }
    return(
        <aside 
            className={`
                ${activeTool==="filter" ? "visible":"hidden"}
                w-64 bg-white border-r
            `}
        >
            <ToolSidebarHeader onClose={onClose} title="Fonts" description="Change font of your text" />
            <ScrollArea className="p-1 h-[85vh]">
                <div className="mt-2 flex flex-col gap-3 w-full">
                    {filters.map((filter)=>(
                        <Button
                            key={filter}
                            variant="outline"
                            className={`
                                w-full rounded-xl
                            `}
                            onClick={()=>editor?.changeImageFilter(filter)}
                        >
                            {filter}
                        </Button>
                    ))}
                    
                </div>
            </ScrollArea>
        </aside>
    )
}

export default FilterSidebar

