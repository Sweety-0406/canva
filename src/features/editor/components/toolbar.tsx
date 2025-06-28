"use client";

import { ActiveTool, Editor } from "../types";
import { Button } from "@/components/ui/button";
import Hint from "./hint";
import { AiOutlineAlibaba } from "react-icons/ai";
import { BsBorderWidth } from "react-icons/bs";
import { IoIosArrowRoundUp, IoIosArrowRoundDown  } from "react-icons/io";
import { RiBrushAiFill } from "react-icons/ri";
// import { isTextType } from "../utils";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa6";
import { CiTextAlignCenter, CiTextAlignJustify, CiTextAlignLeft, CiTextAlignRight  } from "react-icons/ci";
import OpacitySidebar from "./opacity-sidebar";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiColorFilterAiLine } from "react-icons/ri";
import { RxShadowOuter } from "react-icons/rx";
import { IoCopyOutline } from "react-icons/io5";
import { PiSelectionBackgroundDuotone } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";
import BlurSidebar from "./blur-sidebar";
import { PiFlipHorizontalFill,PiFlipVerticalFill  } from "react-icons/pi";
import StrokeWidthSidebar from "./stroke-width-sidebar";
import TextAlignSidebar from "./text-align-sidebar";

interface  ToolBarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool:(tool:ActiveTool)=>void
}

const Toolbar=({
    editor, 
    activeTool,
    onChangeActiveTool
}:ToolBarProps)=>{

    if(editor?.selectedObjects.length === 0){
        return(
            <div className=" p-1 py-4 "/>
        )
    }
    const strokeColor = editor?.selectedObjects[0].stroke
    const fillColor = editor?.selectedObjects[0].fill
    const font = editor?.font
    const f = editor?.selectedObjects
    // const shadowColor = typeof fillColor === "string" ? fillColor : "black"
   


    //@ts-expect-error typescript error
    const fontWeight = editor?.selectedObjects[0].get("fontWeight")
    //@ts-expect-error typescript error
    const fontStyle = editor?.selectedObjects[0].get("fontStyle")
    //@ts-expect-error typescript error
    const underline = editor?.selectedObjects[0].get("underline")
    //@ts-expect-error typescript error
    const lineThrough = editor?.selectedObjects[0].get("linethrough")
    //@ts-expect-error typescript error
    const textAlign = editor?.selectedObjects[0].get("textAlign")
    //@ts-expect-error typescript error
    const fontSize = editor?.selectedObjects[0].get("fontSize")
    // const textShadow = editor?.selectedObjects[0].get("shadow")

    const selectedObject = editor?.selectedObjects[0]
    const selectedObjectType = editor?.selectedObjects[0].type;
    // const isTextTypeObject = isTextType(selectedObjectType) 
    console.log( editor?.selectedObjects[0])

    const flipImageHorizontally = () => {
        onChangeActiveTool("flip-horizontally")
        const activeObject = editor?.selectedObjects[0];
        if (activeObject && activeObject.type === "image") {
            activeObject.set("flipX", !activeObject.flipX);
            editor.canvas.renderAll();
        }
    };

    const flipImageVertically = () => {
        onChangeActiveTool("flip-vertically")
        const activeObject = editor?.selectedObjects[0];
        if (activeObject && activeObject.type === "image") {
            activeObject.set("flipY", !activeObject.flipY);
            editor.canvas.renderAll();
        }
    };

    return( 
        <AnimatePresence>
            <div className="flex  relative justify-center py-4  ">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-white z-50 absolute rounded-2xl  shadow-lg flex gap-2 border-b p-1 h-10"
                >
                    {!(selectedObjectType==="line"  || selectedObjectType==="image"|| selectedObjectType==="svg") && (
                        <div className="flex items-center  h-full my-auto">
                            <Hint 
                                label="Fill Color"
                                side="bottom"
                                >
                                <Button 
                                    onClick={()=>onChangeActiveTool("fill")}
                                    size="sm" 
                                    variant="ghost"
                                    className={`
                                        items-center hover:bg-muted h-full rounded-sm  flex justify-center p-1 px-2
                                        ${activeTool==="fill"? "bg-[#a570ff33]":"bg-none"}
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
                    {/* {selectedObject.objectType } */}
                    <div className="flex items-center  h-full my-auto">
                        <Hint 
                            label="Stroke color"
                            side="bottom"
                            >
                            <Button 
                                onClick={()=>onChangeActiveTool("stroke-color")}
                                size="sm" 
                                variant="ghost"
                                className={`
                                    items-center h-full rounded-sm hover:bg-muted flex justify-center p-1 px-2
                                    ${activeTool==="stroke-color"? "bg-[#a570ff33]":"bg-none"}
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
                    {selectedObjectType === "textbox"  && (
                        <div className="flex items-center  h-full my-auto">
                            <Hint 
                                label="Shadow color"
                                side="bottom"
                                >
                                <Button 
                                    onClick={()=>onChangeActiveTool("shadow")}
                                    size="sm" 
                                    variant="ghost"
                                    className={`
                                        items-center h-full rounded-sm hover:bg-muted flex justify-center p-1 px-2
                                        ${activeTool==="shadow"? "bg-[#a570ff33]":"bg-none"}
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
                                    onClick={()=>onChangeActiveTool("font")}
                                    size="sm" 
                                    variant="ghost"
                                    style={{
                                        fontFamily: font
                                    }}
                                    className={`
                                        items-center w-full hover:bg-muted flex-wrap border h-full rounded-sm  flex justify-center p-1 px-2
                                        ${activeTool==="font"? "bg-[#a570ff33]":"bg-none"}
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
                                        items-center  h-full rounded-sm hover:bg-muted flex justify-center p-1 px-2
                                        ${fontWeight===700 ? "bg-[#a570ff33] text-[#612dae]":"bg-none text-black"}
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
                                        items-center  h-full rounded-sm hover:bg-muted flex justify-center p-1 px-2
                                        ${fontStyle==="italic" ? "bg-[#a570ff33] text-[#612dae]":"bg-none text-black"}
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
                                        items-center  h-full rounded-sm hover:bg-muted flex justify-center p-1 px-2
                                        ${underline===true ? "bg-[#a570ff33] text-[#612dae]":"bg-none text-black"}
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
                                        items-center  h-full rounded-sm hover:bg-muted flex justify-center p-1 px-2
                                        ${lineThrough===true ? "bg-[#a570ff33] text-[#612dae]":"bg-none text-black"}
                                    `}
                                >
                                    <FaStrikethrough />
                                </Button>
                            </Hint>
                        </div>
                    )}
                    {selectedObjectType === "textbox" && (
                        <div className="flex items-center   h-full my-auto">
                            {/* <Hint 
                                label="Align"
                                side="bottom"
                                >
                                <Button 
                                    onClick={()=>onChangeActiveTool("textAlign")}
                                    size="sm" 
                                    variant="ghost"
                                    className={`
                                        items-center h-full rounded-sm hover:bg-muted flex justify-center p-1 px-2
                                        ${activeTool==="textAlign"? "bg-[#a570ff33]":"bg-none"}
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
                            </Hint> */}
                            <TextAlignSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool}/>
                        </div>
                    )}
                    {!(selectedObjectType==="textbox"  )  && (
                        // <div className={`
                        //     flex items-center  h-full my-auto
                        // `}>
                        //     <Hint 
                        //         label="Stroke Width"
                        //         side="bottom"
                        //     >
                        //         <Button 
                        //             onClick={()=>onChangeActiveTool("stroke-width")}
                        //             size="sm" 
                        //             variant="ghost"
                        //             className={`
                        //                 items-center h-full rounded-sm hover:bg-muted flex justify-center p-1 px-2
                        //                 ${activeTool==="stroke-width"? "bg-[#a570ff33]":"bg-none"}
                        //             `}
                        //         >
                        //             <BsBorderWidth 
                        //                 className="size-4 rounded-sm "
                        //             />    
                        //         </Button>
                        //     </Hint>
                        // </div>
                        <div className={`flex items-center hover:bg-muted px-2 rounded-sm  h-full my-auto ${activeTool==="stroke-width"?"bg-[#a570ff33]":"bg-transparent"}`}>
                        {/* <OpacitySidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool}/> */}
                            <StrokeWidthSidebar editor={editor} activeTool={activeTool} />
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
                                    onClick={()=>onChangeActiveTool("remove-bg")}
                                    size="sm" 
                                    variant="ghost"
                                    className={`
                                        items-center h-full rounded-sm hover:bg-muted flex justify-center p-1 px-2
                                        ${activeTool==="remove-bg"? "bg-[#a570ff33]":"bg-none"}
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
                        <div className={`flex items-center hover:bg-muted px-2 rounded-sm  h-full my-auto ${activeTool==="blur"?"bg-[#a570ff33]":"bg-transparent"}`}>
                            <BlurSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool}/>
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
                                    onClick={()=>onChangeActiveTool("filter")}
                                    size="sm" 
                                    variant="ghost"
                                    className={`
                                        items-center h-full rounded-sm hover:bg-muted flex justify-center p-1 px-2
                                        ${activeTool==="filter"? "bg-[#a570ff33]":"bg-none"}
                                    `}
                                >
                                    <RiColorFilterAiLine 
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
                                label="Flip horizontally"
                                side="bottom"
                            >
                                <Button 
                                    onClick={()=>flipImageHorizontally()}
                                    size="sm" 
                                    variant="ghost"
                                    className={`
                                        items-center h-full rounded-sm hover:bg-muted flex justify-center p-1 px-2
                                        ${activeTool==="flip-horizontally"? "bg-[#a570ff33]":"bg-none"}
                                    `}
                                >
                                    <PiFlipHorizontalFill 
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
                                label="Flip vertically"
                                side="bottom"
                            >
                                <Button 
                                    onClick={()=>flipImageVertically()}
                                    size="sm" 
                                    variant="ghost"
                                    className={`
                                        items-center h-full rounded-sm hover:bg-muted flex justify-center p-1 px-2
                                        ${activeTool==="flip-vertically"? "bg-[#a570ff33]":"bg-none"}
                                    `}
                                >
                                    <PiFlipVerticalFill  
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
                                    items-center h-full rounded-sm hover:bg-muted flex justify-center p-1 px-2
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
                                    items-center h-full rounded-sm hover:bg-muted flex justify-center p-1 px-2
                                `}
                            >
                                <IoIosArrowRoundDown  
                                    className="size-4 rounded-sm "
                                />    
                            </Button>
                        </Hint>
                    </div>
                    <div className={`flex items-center hover:bg-muted px-2 rounded-sm  h-full my-auto ${activeTool==="opacity"?"bg-[#a570ff33]":"bg-transparent"}`}>
                        {/* <OpacitySidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool}/> */}
                        <OpacitySidebar editor={editor} activeTool={activeTool} />
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
                                className="hover:bg-muted"
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
                                className="hover:bg-muted"
                            >
                                <RiDeleteBin6Line  />
                            </Button>
                        </Hint>
                    </div>
                </motion.div> 
            </div> 
        </AnimatePresence>
    )
}

export default Toolbar