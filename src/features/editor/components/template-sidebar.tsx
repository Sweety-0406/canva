"use client"

import { ActiveTool, Editor, projectType, templateType } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"

import {RingLoader} from 'react-spinners'
import { LuTriangleAlert } from "react-icons/lu";
import Image from "next/image";
import { useGetTemplates } from "../hooks/useGetTemplates";
import usePaywall from "../hooks/usePaywall";
import { Crown } from "lucide-react";


interface TemplateSidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const TemplateSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool
}:TemplateSidebarProps)=>{
    const {data, isLoading, isError} = useGetTemplates("1","20")
    const paywall = usePaywall()
    const onClose = ()=>{
        onChangeActiveTool("select")
    }
    const onClick = (template: projectType)=>{
        if(template.isPro && paywall.shouldBlock){
            paywall.triggerPaywall()
            return;
        }
        editor?.loadFromJSON(template.json)
    }
    return(
        <aside 
            className={`
                ${activeTool==="templates" ? "visible":"hidden"}
                w-64 bg-white border-r
            `}
        >
            <ToolSidebarHeader onClose={onClose} title="Templates" description="Choose from a variety of templates to get started" />
            <ScrollArea className="p-1 h-[85vh]">
                {isLoading && (
                    <div className="flex flex-1 h-[70vh] justify-center  items-center">
                        <div className=''>
                            <RingLoader
                                size={50}
                                color='#7721f7'
                            />
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-2 gap-1">
                    {data && data.map((template: projectType)=>{
                        return(
                            
                            <button
                                style={{ aspectRatio: `${template.width/2}/${template.height/2}` }}
                                key={template.id}
                                onClick={()=>onClick(template)}
                                className="relative w-full aspect-video group hover:opacity-75  transition bg-muted rounded-lg overflow-hidden border"
                            >
                                
                                <Image
                                    fill
                                    src={template.thumbnailUrl || ""}
                                    alt={template.name || "template"}
                                    className="object-cover"
                                />
                                {template.isPro && (
                                    <div className="absolute bottom-2 right-2 size-5 flex items-center justify-center bg-black/50 rounded-full -z[10]">
                                        <Crown className="size-3 fill-yellow-500 text-yellow-500" />
                                    </div>
                                )}
                                <div className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-xs truncate text-white  p-1 bg-black/50 text-left">
                                    {template.name}
                                </div>
                            </button>
                        )
                    })}
                </div>
                {isError && (
                    <div className="flex flex-col flex-1 h-[70vh] justify-center  items-center">
                        <LuTriangleAlert className="opacity-60 "
                            size={50}
                            color='red'
                        />
                        <p>Failde to load templates.</p>
                    </div>
                )}
            </ScrollArea>
        </aside>
    )
}

export default TemplateSidebar

