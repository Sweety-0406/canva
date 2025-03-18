"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@radix-ui/react-dropdown-menu"
import { ActiveTool, Editor } from "../types"
import { Slider } from "@/components/ui/slider"
import { RxTransparencyGrid } from "react-icons/rx"
import Hint from "./hint"

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


    const onChangeOpacity=(value:number)=>{
        editor?.changeOpacity(value)
    }


    return(
        <div>
            <DropdownMenu >
                <DropdownMenuTrigger >
                    <div className={`mt-2 ${activeTool==="opacity"?"bg-muted":"bg-transparent"}`}>
                        <Hint 
                            label="Transparency"
                            side="bottom"
                            customClassName="mt-[6px]"
                            >
                            <RxTransparencyGrid  
                                className="size-4 -mt- rounded-sm"
                            /> 
                            {/* <OpacitySidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChanveActiveTool}/> */}
                        </Hint>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={`w-44 rounded-md bg-white p-4 mt-4 `}>
                    <Slider 
                        onValueChange={(values)=>onChangeOpacity(values[0])}
                        value={[value]}
                        max={1}
                        min={0}
                        step={0.01}
                        className="cursor-pointer"
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default OpacitySidebar

