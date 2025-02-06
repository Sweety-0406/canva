"use client"
import SideBarItems from "./sideBar-items"
import { LayoutTemplate } from "lucide-react";
import { ImagePlus } from 'lucide-react';
import { RemoveFormatting } from 'lucide-react';
import { Type } from 'lucide-react';
import { Settings } from 'lucide-react';
import { WandSparkles } from 'lucide-react';
import { Shapes } from 'lucide-react';
import { ActiveTools } from "../types";

interface SideBarProps{
    activeTools: ActiveTools,
    onChangeActiveTools: (tool:ActiveTools)=>void
}

const SideBar = ({
    activeTools,
    onChangeActiveTools
}:SideBarProps)=>{
    return(
        <aside className=" h-full border-r  bg-white ">
            <ul className="flex flex-col">
                <SideBarItems
                    label="Design"
                    icon={LayoutTemplate}
                    onClick={()=>onChangeActiveTools("templates")}
                    isActive={activeTools==="templates"}
                />
                <SideBarItems
                    label="Image"
                    icon={ImagePlus}
                    onClick={()=>onChangeActiveTools("images")}
                    isActive={activeTools==="images"}
                />
                <SideBarItems
                    label="Text"
                    icon={RemoveFormatting}
                    onClick={()=>onChangeActiveTools("text")}
                    isActive={activeTools==="text"}
                />
                <SideBarItems
                    label="Shape"
                    icon={Shapes}
                    onClick={()=>onChangeActiveTools("shapes")}
                    isActive={activeTools==="shapes"}
                />
                <SideBarItems
                    label="AI"
                    icon={WandSparkles}
                    onClick={()=>onChangeActiveTools("ai")}
                    isActive={activeTools==="ai"}
                />
                <SideBarItems
                    label="Setting"
                    icon={Settings}
                    onClick={()=>onChangeActiveTools("settings")}
                    isActive={activeTools==="settings"}
                />
            </ul>
        </aside>
    )
}

export default SideBar 