
"use client"

import { ActiveTool, Editor } from "../types"
import ShapeTool from "./shape-tool";
import { CiTextAlignCenter, CiTextAlignJustify, CiTextAlignLeft, CiTextAlignRight  } from "react-icons/ci";
import { motion } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Hint from "./hint";
import { Button } from "@/components/ui/button";
import AlignTool from "./align-tool";

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
    //@ts-expect-error typescript error
    const value = editor?.selectedObjects[0]?.get("textAlign") 

    return(
        <DropdownMenu >
                <DropdownMenuTrigger >
                    <div className={`mt-2 ${activeTool==="textAlign"?"bg-muted":"bg-transparent"}`}>
                        <Hint 
                            label="Align"
                            side="bottom"
                            >
                            <Button 
                                onClick={()=>onChangeActiveTool("textAlign")}
                                size="sm" 
                                variant="none"
                                className={`
                                    items-center -mt-2 h-full rounded-sm hover:bg-muted flex justify-center p-1 py-2 px-2
                                    ${activeTool==="textAlign"? "bg-[#a570ff33]":"bg-none"}
                                `}
                                
                            >
                                {value=="center" && (
                                    <CiTextAlignCenter />
                                )}
                                {value=="justify" && (
                                    <CiTextAlignJustify />
                                )}
                                {value=="left" && (
                                    <CiTextAlignLeft />
                                )}
                                {value=="right" && (
                                    <CiTextAlignRight/>
                                )}
                            </Button>
                        </Hint>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent asChild>
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        className="px-3 flex justify-center rounded-md bg-white shadow-md pb-2 mt-2"
                    >
                        {/* <ToolSidebarHeader onClose={onClose} title="Text Align" description="Align text of your element" /> */}
                        {/* <ScrollArea className="p-3"> */}
                            <div className="grid  pt-2 grid-cols-4 gap-2">
                                {value=="left" ? (
                                    <AlignTool icon={CiTextAlignLeft} onClick={()=>editor?.changeTextAlign("left")} isActive={true} />
                                ):(
                                    <AlignTool icon={CiTextAlignLeft} onClick={()=>editor?.changeTextAlign("left")} />
                                )}
                                {value=="center" ? (
                                    <AlignTool icon={CiTextAlignCenter} onClick={()=>editor?.changeTextAlign("center")} isActive={true} />
                                ):(
                                    <AlignTool icon={CiTextAlignCenter} onClick={()=>editor?.changeTextAlign("center")} />
                                )}
                                {value=="right" ? (
                                    <AlignTool icon={CiTextAlignRight} onClick={()=>editor?.changeTextAlign("right")} isActive={true} />
                                ):(
                                    <AlignTool icon={CiTextAlignRight} onClick={()=>editor?.changeTextAlign("right")} />
                                )}
                                {value=="justify" ? (
                                    <AlignTool icon={CiTextAlignJustify} onClick={()=>editor?.changeTextAlign("justify")} isActive={true} />
                                ):(
                                    <AlignTool icon={CiTextAlignJustify} onClick={()=>editor?.changeTextAlign("justify")} />
                                )}
                            </div>
                        {/* </ScrollArea> */}
                    </motion.div>
                </DropdownMenuContent>

            </DropdownMenu>

    )
}

export default TextAlignSidebar

