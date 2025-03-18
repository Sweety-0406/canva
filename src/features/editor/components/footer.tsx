"use client"

import { Button } from "@/components/ui/button"
import Hint from "./hint"
import { GrZoomIn, GrZoomOut } from "react-icons/gr";
import { Editor } from "../types";
import { Expand } from 'lucide-react';

interface FooterProps{
    editor: Editor | undefined
}

const Footer=({editor}: FooterProps)=>{
    return(
        <div className="bg-white gap-2 flex flex-row-reverse border-t h-10 px-2">
            <Hint label="Reset" side="top" >
                <Button
                    variant="ghost"
                    onClick={()=>{editor?.autoZoom()}}
                    size="sm" 
                >
                    <Expand />
                </Button>
            </Hint>
            <Hint label="Zoom-in" side="top">
                <Button
                    variant="ghost"
                    onClick={()=>{editor?.zoomIn()}}
                    size="sm" 
                >
                    <GrZoomIn />
                </Button>
            </Hint>
            <Hint label="Zoom-out" side="top" >
                <Button
                    variant="ghost"
                    onClick={()=>{editor?.zoomOut()}}
                    size="sm" 
                >
                    <GrZoomOut />
                </Button>
            </Hint>
        </div>
    )
}

export default Footer