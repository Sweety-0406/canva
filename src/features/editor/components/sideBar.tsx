"use client"
import SideBarItems from "./sideBar-items"
import { LayoutTemplate } from "lucide-react";
import { ImagePlus } from 'lucide-react';
import { RemoveFormatting } from 'lucide-react';
import { Type } from 'lucide-react';
import { Settings } from 'lucide-react';
import { WandSparkles } from 'lucide-react';
import { Shapes } from 'lucide-react';
import { ActiveTool} from "../types";

interface SideBarProps{
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void
}

const SideBar = ({
    activeTool,
    onChangeActiveTool
}:SideBarProps)=>{
    return(
        <aside className=" h-full border-r  bg-white ">
            <ul className="flex flex-col">
                <SideBarItems
                    label="Design"
                    icon={LayoutTemplate}
                    onClick={()=>onChangeActiveTool("templates")}
                    isActive={activeTool==="templates"}
                />
                <SideBarItems
                    label="Image"
                    icon={ImagePlus}
                    onClick={()=>onChangeActiveTool("images")}
                    isActive={activeTool==="images"}
                />
                <SideBarItems
                    label="Text"
                    icon={RemoveFormatting}
                    onClick={()=>onChangeActiveTool("text")}
                    isActive={activeTool==="text"}
                />
                <SideBarItems
                    label="Shape"
                    icon={Shapes}
                    onClick={()=>onChangeActiveTool("shapes")}
                    isActive={activeTool==="shapes"}
                />
                <SideBarItems
                    label="AI"
                    icon={WandSparkles}
                    onClick={()=>onChangeActiveTool("ai")}
                    isActive={activeTool==="ai"}
                />
                <SideBarItems
                    label="Setting"
                    icon={Settings}
                    onClick={()=>onChangeActiveTool("settings")}
                    isActive={activeTool==="settings"}
                />
            </ul>
        </aside>
    )
}

export default SideBar 