"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import ColorPicker from "./color-picker" 
import { useEffect, useMemo, useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import GradientColorPicker from "./gradientColorPicker"

interface SettingSidebarProps{
    editor: Editor | undefined,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const SettingSidebar = ({
    editor,
    onChangeActiveTool
}:SettingSidebarProps)=>{
    const workSpace = editor?.getWorkspace();
    const initialWidth = useMemo(()=> `${workSpace?.width ?? 0}`, [workSpace])
    const initialHeight = useMemo(()=> `${workSpace?.height ?? 0}`, [workSpace])
    const initialBackground = useMemo(()=> workSpace?.fill ?? "#ffffff", [workSpace])
    const[width,setWidth] = useState(initialWidth)
    const[height,setHeight] = useState(initialHeight)
    const[background,setBackground] = useState(initialBackground)
    const [gradientColor, setGradientColor] = useState(editor?.gradientColor || ['#E77777', '#77E77F', '#778DE7'])

    
    useEffect(()=>{
        setWidth(initialWidth)
        setHeight(initialHeight)
        setBackground(initialBackground)
    },[
        initialBackground,
        initialHeight,
        initialWidth
    ])

    const onChangnBackground = (value: string)=>{
        setBackground(value)
        editor?.changeBackground(value)
    }
    const onChangnGradientBackground = (value: string[], gradientType:string, angle: number)=>{
        setGradientColor(value)
        editor?.changeGradientBackground(value, gradientType, angle)
    }
    
    const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        editor?.changeSize({
            width: parseInt(width,10),
            height: parseInt(height)
        })
        // editor?.changeGradientBackground(gradientColor,gradientType,angle)
    }

    const onClose = ()=>{
        onChangeActiveTool("select")
    }

    return(
        <motion.div 
            initial={{ opacity: 0, x: -240 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -240 }}
            transition={{ duration: 0.5 }}
            className="w-72  bg-gradient-to-r from-white/80 to-white border-r absolute z-40 h-full left-[74px]"
        >
            <ToolSidebarHeader onClose={onClose} title="Setting" description="Personalize your workspace " />
            <ScrollArea className="p-3 h-[84vh] ">
                <form  onSubmit={onSubmit} className="space-y-2 mx-1">
                    <div >
                        <Label className="text-sm">
                            Height
                        </Label>
                        <Input
                            
                            placeholder="Height"
                            value={height}
                            type="number"
                            onChange={(e)=>setHeight(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Width
                        </Label>
                        <Input
                            placeholder="Width"
                            value={width}
                            type="number"
                            onChange={(e)=>setWidth(e.target.value)}
                        />
                    </div>
                    <Button variant="purple" type="submit" className="w-full">
                        Resize
                    </Button>
                </form>
                <div className="m-1 mt-5">
                    <ColorPicker value={background as string} onChange={onChangnBackground} />
                </div>
                <div className="m-1 mt-5">
                    <p className="text-sm text-gray-700">Gradient colors</p>
                    <GradientColorPicker gradientColor={gradientColor} onChange={onChangnGradientBackground} />
                </div>
            </ScrollArea>
        </motion.div>
    )
}

export default SettingSidebar

