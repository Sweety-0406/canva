"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import ShapeTool from "./shape-tool";
import { CiTextAlignCenter, CiTextAlignJustify, CiTextAlignLeft, CiTextAlignRight  } from "react-icons/ci";

interface TextAlignSidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const TextAlignSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool
}:TextAlignSidebarProps)=>{
    //@ts-ignore
    const value = editor?.selectedObjects[0]?.get("textAlign") 

    const onClose = ()=>{
        onChangeActiveTool("select")
    }

    return(
        <aside 
            className={`
                ${activeTool==="textAlign" ? "visible":"hidden"}
                w-64 bg-white border-r
            `}
        >
            <ToolSidebarHeader onClose={onClose} title="Text Align" description="Align text of your element" />
            <ScrollArea className="p-1">
                <div className="grid  pt-2 grid-cols-3 gap-2">
                    {value=="left" ? (
                        <ShapeTool icon={CiTextAlignLeft} onClick={()=>editor?.changeTextAlign("left")} isActive={true} />
                    ):(
                        <ShapeTool icon={CiTextAlignLeft} onClick={()=>editor?.changeTextAlign("left")} />
                    )}
                    {value=="center" ? (
                        <ShapeTool icon={CiTextAlignCenter} onClick={()=>editor?.changeTextAlign("center")} isActive={true} />
                    ):(
                        <ShapeTool icon={CiTextAlignCenter} onClick={()=>editor?.changeTextAlign("center")} />
                    )}
                    {value=="right" ? (
                        <ShapeTool icon={CiTextAlignRight} onClick={()=>editor?.changeTextAlign("right")} isActive={true} />
                    ):(
                        <ShapeTool icon={CiTextAlignRight} onClick={()=>editor?.changeTextAlign("right")} />
                    )}
                    {value=="justify" ? (
                        <ShapeTool icon={CiTextAlignJustify} onClick={()=>editor?.changeTextAlign("justify")} isActive={true} />
                    ):(
                        <ShapeTool icon={CiTextAlignJustify} onClick={()=>editor?.changeTextAlign("justify")} />
                    )}
                    {/* <ShapeTool icon={CiTextAlignJustify} onClick={()=>editor?.changeTextAlign("justify")}  />
                    <ShapeTool icon={CiTextAlignLeft} onClick={()=>editor?.changeTextAlign("left")}  />
                    <ShapeTool icon={CiTextAlignRight} onClick={()=>editor?.changeTextAlign("right")}  /> */}
                </div>
            </ScrollArea>
        </aside>
    )
}

export default TextAlignSidebar

