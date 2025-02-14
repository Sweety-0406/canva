"use client";

import { ActiveTool, Editor } from "../types";
import { Button } from "@/components/ui/button";
import Hint from "./hint";
import { Paintbrush } from 'lucide-react';
import { AiOutlineAlibaba } from "react-icons/ai";
import { BsBorderWidth } from "react-icons/bs";
import { IoIosArrowRoundUp, IoIosArrowRoundDown  } from "react-icons/io";
import { RxTransparencyGrid } from "react-icons/rx";
import { RiBrushAiFill } from "react-icons/ri";
import { isTextType } from "../utils";
import { FaBold } from "react-icons/fa";



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

    if(editor?.selectedObjects.length === 0){
        return(
            <div className="bg-white border-b p-1 h-10"/>
        )
    }
    const strokeColor = editor?.selectedObjects[0].stroke
    const fillColor = editor?.selectedObjects[0].fill
    const font = editor?.font
    const fontWeight = editor?.fontWeight || 500
    const obj = editor?.selectedObjects[0]
    
    const selectedObjectType = editor?.selectedObjects[0].type;
    const isTextTypeObject = isTextType(selectedObjectType) 
    // console.log(fontWeight) 
    return( 
        <div className="bg-white flex gap-2 border-b p-1 h-10">
            {!(selectedObjectType==="line" || selectedObjectType==="group") && (
                <div className="flex items-center  h-full my-auto">
                    <Hint 
                        label="Fill Color"
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
                            <RiBrushAiFill 
                                className="size-4 rounded-sm"
                                style={{
                                    color: typeof fillColor === "string" ? fillColor : "black"
                                }}
                            />
                        </Button>
                    </Hint>
                </div>
            )}
            {selectedObjectType === "textbox" && (
                <div className="flex items-center  h-full my-auto">
                    <Hint 
                        label="Font"
                        side="bottom"
                        >
                        <Button 
                            onClick={()=>onChanveActiveTool("font")}
                            size="sm" 
                            variant="ghost"
                            style={{
                                fontFamily: font
                            }}
                            className={`
                                items-center  h-full rounded-sm  flex justify-center p-1 px-2
                                ${activeTool==="font"? "bg-gray-100":"bg-none"}
                            `}
                            
                        >
                            {font}
                        </Button>
                    </Hint>
                </div>
            )}
            {selectedObjectType === "textbox" && (
                <div className="flex items-center  h-full my-auto">
                    <Hint 
                        label="Bold"
                        side="bottom"
                    >
                        <Button 
                            onClick = {()=>{
                                editor?.changeFontWeight(fontWeight)
                            }}
                            size="sm" 
                            variant="ghost"
                            style={{
                                fontFamily: font
                            }}
                            className={`
                                items-center  h-full rounded-sm  flex justify-center p-1 px-2
                                ${activeTool==="font"? "bg-gray-100":"bg-none"}
                            `}
                        >
                            <FaBold />
                        </Button>
                    </Hint>
                </div>
            )}
            {!isTextTypeObject && (
                <div className="flex items-center  h-full my-auto">
                    <Hint 
                        label="Stroke color"
                        side="bottom"
                        >
                        <Button 
                            onClick={()=>onChanveActiveTool("stroke-color")}
                            size="sm" 
                            variant="ghost"
                            className={`
                                items-center h-full rounded-sm  flex justify-center p-1 px-2
                                ${activeTool==="stroke-color"? "bg-gray-100":"bg-none"}
                            `}
                            
                        >
                            <AiOutlineAlibaba 
                                className="size-4 rounded-sm "
                                style={{
                                    color: typeof strokeColor === "string" ? strokeColor : "black"
                                }}
                            />
                        </Button>
                    </Hint>
                </div>
            )}
            {!(selectedObjectType==="textbox" || selectedObjectType==="line" || selectedObjectType==="group")  && (
                <div className={`
                    flex items-center  h-full my-auto
                `}>
                    <Hint 
                        label="Stroke Width"
                        side="bottom"
                    >
                        <Button 
                            onClick={()=>onChanveActiveTool("stroke-width")}
                            size="sm" 
                            variant="ghost"
                            className={`
                                items-center h-full rounded-sm  flex justify-center p-1 px-2
                                ${activeTool==="stroke-width"? "bg-gray-100":"bg-none"}
                            `}
                        >
                            <BsBorderWidth 
                                className="size-4 rounded-sm "
                            />    
                        </Button>
                    </Hint>
                </div>
            )}
            <div className="flex items-center  h-full my-auto">
                <Hint 
                    label="Send Forward"
                    side="bottom"
                >
                    <Button 
                        onClick={()=>editor?.bringForward()}
                        size="sm" 
                        variant="ghost"
                        className={`
                            items-center h-full rounded-sm  flex justify-center p-1 px-2
                        `}
                    >
                        <IoIosArrowRoundUp 
                            className="size-4 rounded-sm "
                        />    
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center  h-full my-auto">
                <Hint 
                    label="Send Backward"
                    side="bottom"
                    >
                    <Button 
                        onClick={()=>editor?.sendBackward()}
                        size="sm" 
                        variant="ghost"
                        className={`
                            items-center h-full rounded-sm  flex justify-center p-1 px-2
                        `}
                    >
                        <IoIosArrowRoundDown  
                            className="size-4 rounded-sm "
                        />    
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center  h-full my-auto">
                <Hint 
                    label="Opacity"
                    side="bottom"
                    >
                    <Button 
                        onClick={()=>onChanveActiveTool("opacity")}
                        size="sm" 
                        variant="ghost"
                        className={`
                            items-center h-full rounded-sm  flex justify-center p-1 px-2
                        `}
                    >
                        <RxTransparencyGrid  
                            className="size-4 rounded-sm"
                        />    
                    </Button>
                </Hint>
            </div>
        </div> 
    )
}

export default Toolbar