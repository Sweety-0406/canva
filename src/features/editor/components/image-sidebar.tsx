"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"

import { getImages } from "@/app/api/getImages";
import { TbLoader3 } from "react-icons/tb";
import {RingLoader} from 'react-spinners'
import { LuTriangleAlert } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { UploadButton } from "@/lib/uploadthing";


interface ImageSidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const ImageSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool
}:ImageSidebarProps)=>{
    const {data, isLoading, isError} = getImages()
    // console.log(data)
    const onClose = ()=>{
        onChangeActiveTool("select")
    }
    const addImageHandler = (value: string)=>{
        editor?.addImage(value)
    }
    return(
        <aside 
            className={`
                ${activeTool==="images" ? "visible":"hidden"}
                w-64 bg-white border-r
            `}
        >
            <ToolSidebarHeader onClose={onClose} title="Images" description="Add images in  your canva" />
            <ScrollArea className="p-1 h-[85vh]">
                <div>
                <UploadButton 
                    className=""
                    appearance={{
                        button: "w-full upload-button mb-2 text-sm font-medium bg-purple-400",
                        allowedContent: "hidden"
                    }}
                    content={{
                        button: "Upload Image"
                    }}
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                    editor?.addImage(res[0].ufsUrl)
                    }}
                    onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                    }}
                />
                </div>
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
                    {data && data.map((image: any)=>{
                        return(
                            
                            <button
                                key={image.id}
                                onClick={()=>addImageHandler(image.urls.regular)}
                                className="relative w-full aspect-video group hover:opacity-75  transition bg-muted rounded-lg overflow-hidden border"
                            >
                                
                                <Image
                                    fill
                                    src={image.urls.small}
                                    alt={image.alt_description || "image"}
                                    className="object-cover"
                                />
                                <Link
                                    target="_blank"
                                    href={image.links.html}
                                    className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full text-xs truncate text-white hover:underline p-1 bg-black/50 text-left"
                                >
                                    {image.user.name}
                                </Link>
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
                        <p>Failde to load images.</p>
                    </div>
                )}
            </ScrollArea>
        </aside>
    )
}

export default ImageSidebar

