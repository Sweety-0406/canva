"use client";


import { useState } from "react";
import { ActiveTool, Editor } from "../types";
import { Button } from "@/components/ui/button";
import Hint from "./hint";

interface  ToolBarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChanveActiveTool:(tool:ActiveTool)=>void
}

const Toolbar=({
    editor, 
    activeTool,
    onChanveActiveTool
}:ToolBarProps)=>{
    // const selectedActiveObject = editor?.canvas.getActiveObject()
    // const getProperty = (property: any)=>{
    //     if(!selectedActiveObject){
    //         return null
    //     }
    //     return selectedActiveObject.get(property)
    // } 

    const fillColor = editor?.fillColor
    if(editor?.selectedObjects.length === 0){
        return(
            <div className="bg-white border-b p-1 h-10"/>
        )
    }

 
    console.log(fillColor,"hi")
    return( 
        <div className="bg-white border-b p-1 h-10">
            <div className="flex items-center  h-full my-auto">
                <Hint 
                    label="Color"
                    side="bottom"
                    >
                    <Button 
                        onClick={()=>onChanveActiveTool("fill")}
                        size="sm" 
                        variant="ghost"
                        className={`
                            items-center h-full rounded-sm  flex justify-center p-1 px-2
                            ${activeTool==="fill"? "bg-gray-100":"bg-none"}
                        `}
                          
                    >
                        <div 
                            className="size-4 rounded-sm"
                            style={{
                                backgroundColor: fillColor
                                // backgroundColor: typeof fillColor2 === "string" ? fillColor2 : "black"
                            }}
                        />
                    </Button>
                </Hint>
            </div>
        </div> 
    )
}

export default Toolbar