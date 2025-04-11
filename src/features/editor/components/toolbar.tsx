"use client";

import { ActiveTool, Editor } from "../types";
import { Button } from "@/components/ui/button";
import Hint from "./hint";
import { AiOutlineAlibaba } from "react-icons/ai";
import { BsBorderWidth } from "react-icons/bs";
import { IoIosArrowRoundUp, IoIosArrowRoundDown  } from "react-icons/io";
import { RiBrushAiFill } from "react-icons/ri";
import { isTextType } from "../utils";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa6";
import { CiTextAlignCenter, CiTextAlignJustify, CiTextAlignLeft, CiTextAlignRight  } from "react-icons/ci";
import OpacitySidebar from "./opacity-sidebar";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiColorFilterAiLine } from "react-icons/ri";
import { RxShadowOuter } from "react-icons/rx";
import { IoCopyOutline } from "react-icons/io5";
import { PiSelectionBackgroundDuotone } from "react-icons/pi";



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
    const shadowColor = typeof fillColor === "string" ? fillColor : "black"
   
    console.log(editor?.selectedObjects[0])

    //@ts-ignore
    const fontWeight = editor?.selectedObjects[0].get("fontWeight")
    //@ts-ignore
    const fontStyle = editor?.selectedObjects[0].get("fontStyle")
    //@ts-ignore
    const underline = editor?.selectedObjects[0].get("underline")
    //@ts-ignore
    const lineThrough = editor?.selectedObjects[0].get("linethrough")
    //@ts-ignore
    const textAlign = editor?.selectedObjects[0].get("textAlign")
    //@ts-ignore
    const fontSize = editor?.selectedObjects[0].get("fontSize")
    const textShadow = editor?.selectedObjects[0].get("shadow")

    
    const selectedObjectType = editor?.selectedObjects[0].type;
    const isTextTypeObject = isTextType(selectedObjectType) 
    return( 
        <div className="bg-white flex gap-2 border-b p-1 h-10">
            {!(selectedObjectType==="line" || selectedObjectType==="image" || selectedObjectType==="group") && (
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
            {selectedObjectType === "textbox"  && (
                <div className="flex items-center  h-full my-auto">
                    <Hint 
                        label="Shadow color"
                        side="bottom"
                        >
                        <Button 
                            onClick={()=>onChanveActiveTool("shadow")}
                            size="sm" 
                            variant="ghost"
                            className={`
                                items-center h-full rounded-sm  flex justify-center p-1 px-2
                                ${activeTool==="shadow"? "bg-gray-100":"bg-none"}
                            `}
                            
                        >
                            <RxShadowOuter 
                                className="size-4  rounded-full shadow-2xl"
                                style={{ boxShadow: "4px 4px 4px gray" }}
                            />
                        </Button>
                    </Hint>
                </div>
            )}
            {selectedObjectType === "textbox" && (
                <div className="flex items-center  w-20 h-full my-auto">
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
                                items-center w-full flex-wrap border h-full rounded-sm  flex justify-center p-1 px-2
                                ${activeTool==="font"? "bg-gray-100":"bg-none"}
                            `}
                            
                        >
                            <span className="truncate text-xs w-full text-center">{font}</span>
                        </Button>
                    </Hint>
                </div>
            )}
            {selectedObjectType === "textbox" && (
                <div className="flex border items-center hover:bg-muted rounded-md px-2  h-full my-auto">
                    <Hint 
                        label="Font Size"
                        side="bottom"
                        customClassName="mt-1"
                    >
                        <input 
                            type="number"
                            min={10}
                            max={100} 
                            value={fontSize} 
                            onChange={(e)=>{
                                editor?.changeFontSize(parseInt(e.target.value))
                            }}
                            className=" text-center"
                        />
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
                            className={`
                                items-center  h-full rounded-sm  flex justify-center p-1 px-2
                                ${fontWeight===700 ? "bg-gray-100":"bg-none"}
                            `}
                        >
                            <FaBold />
                        </Button>
                    </Hint>
                </div>
            )}
            {selectedObjectType === "textbox" && (
                <div className="flex items-center  h-full my-auto">
                    <Hint 
                        label="Italic"
                        side="bottom"
                    >
                        <Button 
                            onClick = {()=>{
                                editor?.changeFontStyle(fontStyle)
                            }}
                            size="sm" 
                            variant="ghost"
                            className={`
                                items-center  h-full rounded-sm  flex justify-center p-1 px-2
                                ${fontStyle==="italic" ? "bg-gray-100":"bg-none"}
                            `}
                        >
                            <FaItalic />
                        </Button>
                    </Hint>
                </div>
            )}
            {selectedObjectType === "textbox" && (
                <div className="flex items-center  h-full my-auto">
                    <Hint 
                        label="Underline"
                        side="bottom"
                    >
                        <Button 
                            onClick = {()=>{
                                editor?.changeUnderline(underline)
                            }}
                            size="sm" 
                            variant="ghost"
                            className={`
                                items-center  h-full rounded-sm  flex justify-center p-1 px-2
                                ${underline===true ? "bg-gray-100":"bg-none"}
                            `}
                        >
                            <FaUnderline />
                        </Button>
                    </Hint>
                </div>
            )}
            {selectedObjectType === "textbox" && (
                <div className="flex items-center  h-full my-auto">
                    <Hint 
                        label="Line Through"
                        side="bottom"
                    >
                        <Button 
                            onClick = {()=>{
                                editor?.changeLineThrough(lineThrough)
                            }}
                            size="sm" 
                            variant="ghost"
                            className={`
                                items-center  h-full rounded-sm  flex justify-center p-1 px-2
                                ${lineThrough===true ? "bg-gray-100":"bg-none"}
                            `}
                        >
                            <FaStrikethrough />
                        </Button>
                    </Hint>
                </div>
            )}
            {selectedObjectType === "textbox" && (
                <div className="flex items-center   h-full my-auto">
                    <Hint 
                        label="Align"
                        side="bottom"
                        >
                        <Button 
                            onClick={()=>onChanveActiveTool("textAlign")}
                            size="sm" 
                            variant="ghost"
                            className={`
                                items-center h-full rounded-sm  flex justify-center p-1 px-2
                                ${activeTool==="textAlign"? "bg-gray-100":"bg-none"}
                            `}
                            
                        >
                            {textAlign=="center" && (
                                <CiTextAlignCenter />
                            )}
                            {textAlign=="justify" && (
                                <CiTextAlignJustify />
                            )}
                            {textAlign=="left" && (
                                <CiTextAlignLeft />
                            )}
                            {textAlign=="right" && (
                                <CiTextAlignRight/>
                            )}
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
            {!(selectedObjectType==="textbox"  )  && (
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
            {selectedObjectType==="image"  && (
                <div className={`
                    flex items-center  h-full my-auto
                `}>
                    <Hint 
                        label="Background remover"
                        side="bottom"
                    >
                        <Button 
                            onClick={()=>onChanveActiveTool("remove-bg")}
                            size="sm" 
                            variant="ghost"
                            className={`
                                items-center h-full rounded-sm  flex justify-center p-1 px-2
                                ${activeTool==="remove-bg"? "bg-gray-100":"bg-none"}
                            `}
                        >
                            <PiSelectionBackgroundDuotone 
                                className="size-4 rounded-sm "
                            />    
                        </Button>
                    </Hint>
                </div>
            )}
            {selectedObjectType==="image"  && (
                <div className={`
                    flex items-center  h-full my-auto
                `}>
                    <Hint 
                        label="Filters"
                        side="bottom"
                    >
                        <Button 
                            onClick={()=>onChanveActiveTool("filter")}
                            size="sm" 
                            variant="ghost"
                            className={`
                                items-center h-full rounded-sm  flex justify-center p-1 px-2
                                ${activeTool==="filter"? "bg-gray-100":"bg-none"}
                            `}
                        >
                            <RiColorFilterAiLine 
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
            <div className={`flex items-center hover:bg-muted px-2 rounded-sm  h-full my-auto ${activeTool==="opacity"?"bg-muted":"bg-transparent"}`}>
                <OpacitySidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChanveActiveTool}/>
            </div>
            <div className="flex items-center  h-full my-auto">
                <Hint 
                    label="copy style"
                    side="bottom"
                >
                    <Button 
                        onClick = {()=>{
                            editor?.onCopy()
                            editor?.onPaste()
                        }}
                        size="sm" 
                        variant="ghost"
                    >
                        <IoCopyOutline  />
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center  h-full my-auto">
                <Hint 
                    label="Delete"
                    side="bottom"
                >
                    <Button 
                        onClick = {()=>{
                            editor?.deleteObject()
                        }}
                        size="sm" 
                        variant="ghost"
                    >
                        <RiDeleteBin6Line  />
                    </Button>
                </Hint>
            </div>
        </div> 
    )
}

export default Toolbar