"use client"

import Logo from "./logo"
import Hint from "./hint";
import {useFilePicker} from "use-file-picker"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaRegFileAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button"
import { ChevronDown, Download, File } from "lucide-react";
import { MousePointerClick } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Redo } from 'lucide-react';
import { Undo } from 'lucide-react';
import { MdOutlineCloudDone } from "react-icons/md";
import { ActiveTool, Editor } from "../types";
import { cn } from "@/lib/utils";
import UserButton from "./user-button";
  
interface NavbarProps{
    editor: Editor | undefined
    activeTool: ActiveTool,
    onChangeActiveTool:(tool:ActiveTool)=>void
}  

const Navbar = ({
    editor,
    activeTool,
    onChangeActiveTool
}:NavbarProps)=>{ 
    const {openFilePicker} = useFilePicker({
        accept: ".json",
        onFilesSuccessfullySelected:({plainFiles}: any)=>{
            if(plainFiles && plainFiles.length >0){
                const file = plainFiles[0]
                const reader = new FileReader();
                reader.readAsText(file, "UTF-8")
                reader.onload=()=>{
                    editor?.loadFromJSON(reader.result as string)
                }
            }
        }
    })
    return(
        <div className="bg-white flex items-center gap-3 h-12 border-b p-2 ">
            <Logo />
            <div >
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild className="flex  ">
                        <Button size={"sm"} variant="ghost">
                            File
                            <ChevronDown className="size-20" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className=" flex  w-56 gap-2">
                        <DropdownMenuItem onClick={()=> openFilePicker()}>
                                <FaRegFileAlt />
                            <div >
                                <h1>Open</h1>
                                <p className="text-xs  text-gray-500">Open a JSON file</p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
            <Separator orientation="vertical" />
            <Hint label="select" sideOffset={8}>
                <Button  
                    variant="ghost" 
                    size={"sm"}
                    onClick={()=>onChangeActiveTool("select")}
                    className={cn(
                        activeTool==='select' && "bg-gray-100"
                    )}
                >
                    <MousePointerClick />
                </Button>
            </Hint>
            <Hint label="Undo" sideOffset={8}>
                <Button 
                    variant="ghost" 
                    size={"sm"}
                    disabled={!editor?.canUndo()}
                    onClick={(()=>editor?.onUndo())}
                >
                    <Undo/>
                </Button>
            </Hint>
            <Hint label="Redo" sideOffset={8}>
                <Button
                    variant="ghost" 
                    size={"sm"}
                    disabled={!editor?.canRedo()}
                    onClick={(()=>editor?.onRedo())}
                >
                    <Redo />
                </Button>
            </Hint>
            <Separator orientation="vertical" />
            <div className="flex gap-2 text-gray-500 ">
                <MdOutlineCloudDone size={20} />
                <div className="text-sm capitalize">
                    saved
                </div>
            </div>
            <div className="ml-auto flex items-center">
                <DropdownMenu modal={false} >
                    <DropdownMenuTrigger asChild className="flex  ">
                        <Button size={"sm"} variant="ghost">
                            Export
                            <Download  />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent  align="start" className=" flex flex-col w-60 mr-2">
                        <DropdownMenuItem onClick={()=> editor?.saveJson()} className="flex items-center w-full">
                            <File />
                            <div >
                                <h1>JSON</h1>
                                <p className="text-xs  text-gray-500">Save for later editing</p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={()=> editor?.savePng()} className="flex items-center w-full">
                            <File />
                            <div >
                                <h1>PNG</h1>
                                <p className="text-xs  text-gray-500">Best for sharing on web</p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={()=> editor?.saveJpg()} className="flex items-center w-full">
                                <File />
                            <div >
                                <h1>JPEG</h1>
                                <p className="text-xs  text-gray-500">Best for printing</p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={()=> editor?.saveSvg()} className="flex items-center w-full">
                                <File />
                            <div >
                                <h1>SVG</h1>
                                <p className="text-xs  text-gray-500">Best for editing in vector software</p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <UserButton />
            </div>
        </div>
    )
}

export default Navbar