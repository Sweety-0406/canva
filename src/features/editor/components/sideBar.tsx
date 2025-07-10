"use client"
import SideBarItems from "./sideBar-items"
import { LayoutTemplate, PencilLine } from "lucide-react";
import { ImagePlus } from 'lucide-react';
import { RemoveFormatting } from 'lucide-react';
import { Settings } from 'lucide-react';
import { WandSparkles } from 'lucide-react';
import { Shapes } from 'lucide-react';
import { ActiveTool} from "../types";
import { Sticker } from 'lucide-react';

interface SideBarProps{
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void
}

const SideBar = ({
    activeTool,
    onChangeActiveTool
}:SideBarProps)=>{
    return(
        <aside className= {`
            h-full  z-50 
            ${(
                activeTool==="templates" || 
                activeTool==="images" || 
                activeTool==="text" || 
                activeTool==="shapes" || 
                activeTool==="stickers" || 
                activeTool==="draw" || 
                activeTool==="ai" || 
                activeTool==="settings" ||
                activeTool==="fill" ||
                activeTool==="filter" ||
                activeTool==="font" ||
                activeTool==="shadow" ||
                activeTool==="stroke-color" ||
                activeTool==="remove-bg" 
            ) ? "bg-white/80 border-r":"bg-muted"} 
        `}>
            <ul className="flex flex-col gap-1"> 
                <SideBarItems
                    label="Design"
                    icon={LayoutTemplate}
                    onClick={()=>onChangeActiveTool("templates")}
                    isActive={activeTool==="templates"}
                    textColor="text-[#ff643d]"
                />
                <SideBarItems
                    label="Image"
                    icon={ImagePlus}
                    onClick={()=>onChangeActiveTool("images")}
                    isActive={activeTool==="images"}
                    textColor="text-[#50ff3d]"
                />
                <SideBarItems
                    label="Text"
                    icon={RemoveFormatting}
                    onClick={()=>onChangeActiveTool("text")}
                    isActive={activeTool==="text"}
                    textColor="text-[#3ddbff]"
                />
                <SideBarItems
                    label="Shape"
                    icon={Shapes}
                    onClick={()=>onChangeActiveTool("shapes")}
                    isActive={activeTool==="shapes"}
                    textColor="text-[#a570ff]"
                />
                <SideBarItems
                    label="Sticker"
                    icon={Sticker}
                    onClick={()=>onChangeActiveTool("stickers")}
                    isActive={activeTool==="stickers"}
                    textColor="text-[#ffef3d]"
                />
                <SideBarItems
                    label="Draw"
                    icon={PencilLine }
                    onClick={()=>onChangeActiveTool("draw")}
                    isActive={activeTool==="draw"}
                    textColor="text-[#63ad08]"
                />
                <SideBarItems
                    label="AI"
                    icon={WandSparkles}
                    onClick={()=>onChangeActiveTool("ai")}
                    isActive={activeTool==="ai"}
                    textColor="text-[#ff3dd2]"
                />
                <SideBarItems
                    label="Setting"
                    icon={Settings}
                    onClick={()=>onChangeActiveTool("settings")}
                    isActive={activeTool==="settings"}
                    customCss="transform rotate-180 duration-700"
                    textColor="text-[#4d3dff]"
                />
            </ul>
        </aside>
    )
}

export default SideBar 