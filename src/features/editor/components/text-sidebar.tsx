"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TfiText } from "react-icons/tfi";
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion";

interface TextSidebarProps{
    editor: Editor | undefined,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const TextSidebar = ({
    editor,
    onChangeActiveTool
}:TextSidebarProps)=>{
    const value = editor?.font 
    const onClose = ()=>{
        onChangeActiveTool("select")
    }

    return(
        <motion.div 
            initial={{ opacity: 0, x: -240 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -240 }}
            transition={{ duration: 0.5 }}
            className="w-64 bg-white border-r absolute z-40 h-full left-16"
        >
            <ToolSidebarHeader onClose={onClose} title="Text" description="Add text to your element" />
            <ScrollArea className="p-1">
                <div className="mt-2 flex flex-col gap-3 w-full">
                    <Button className="w-full rounded-xl text-white bg-[#8b3dff] hover:bg-[#7731d8]" onClick={()=>editor?.addText("hii there")}>
                        <TfiText className="text-white  "/> Click To Add Text 
                    </Button>
                    <div className="text-sm pl-1 font-semibold">
                        Default text styles
                    </div>
                    <Button variant="secondary" className="w-full bg-white border rounded-xl text-black " onClick={()=>{
                        if(editor){
                            editor?.addText("Adding a heading",{
                                fontFamily:value,
                                fontSize: 65,
                            })
                        }
                    }}>
                        <span className="text-2xl font-bold ">
                            Adding a heading
                        </span> 
                    </Button>
                    <Button variant="secondary" className="w-full bg-white border rounded-xl text-black " onClick={()=>{
                        if(editor){
                            editor.addText("Adding a subheading",{
                                fontFamily:value,
                                fontSize: 40,
                            })
                        }
                    }}>
                        <span className="text-lg font-bold ">
                            Adding a subheading
                        </span> 
                    </Button>
                    <Button variant="secondary" className="w-full bg-white border rounded-xl text-black " onClick={()=>{
                        if (editor){
                            editor.addText("Add a body text", {
                              fontFamily: value,
                              fontSize: 25,
                            });
                      
                        }
                    }}>
                        <span className="text-sm  ">
                            Add little bit of body text
                        </span> 
                    </Button>
                </div>
            </ScrollArea>
        </motion.div>
    )
}

export default TextSidebar

