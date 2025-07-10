"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"

import { useImages } from "@/app/api/getImages";
import Loader from "@/features/editor/components/loader"
import { LuTriangleAlert } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { UploadButton } from "@/lib/uploadthing";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";


interface ImageSidebarProps{
    editor: Editor | undefined,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

export interface UnsplashImage {
  id: string;
  alt_description: string | null;
  urls: {
    regular: string;
    small: string;
  };
  links: {
    html: string;
  };
  user: {
    name: string;
  };
}

const ImageSidebar = ({
    editor,
    onChangeActiveTool
}:ImageSidebarProps)=>{
    const [searchKey, setSearchKey] = useState("")
    const {data, isLoading, isError} = useImages()
    const [searchData, setSearchData] = useState<UnsplashImage[]>([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const onClose = ()=>{
        onChangeActiveTool("select")
    }
    const addImageHandler = (value: string)=>{
        editor?.addImage(value)
    }

    const fetchImages = async (search:string, pageNum = 1) => {
        try {
            const response = await axios.post("/api/images", { search, page: pageNum, per_page: 24 });
    
            if (pageNum === 1) {
                setSearchData(response.data.data.results); 
            } else {
                setSearchData((prev) => [...prev, ...response.data.data.results]); 
            }
    
            setTotalPages(response.data.data.total_pages);
            setPage(pageNum);
        } catch{
            console.error("Error fetching images", );
            
        }
    };
    
    const onClick = () => {
        if(searchKey.length===0){
            toast.error("Please write something")
            setSearchData([])
            return
        }
        setPage(1); 
        fetchImages(searchKey, 1);
    };
    
    const loadMore = () => {
        if (page < totalPages) {
            fetchImages(searchKey, page + 1);
        }
    };
    return(
        <motion.div 
            initial={{ opacity: 0, x: -240 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -240 }}
            transition={{ duration: 0.5 }}
            className="w-72  bg-gradient-to-r from-white/80 to-white border-r absolute z-40 h-full left-[74px]"
        >
            <ToolSidebarHeader onClose={onClose} title="Images" description="Add images in  your PixelForge" />
            <ScrollArea className="p-3 pr-4 h-[84vh]">
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
                        toast.error(` ${error.message}`);
                        }}
                    />
                    <div >
                        <UploadButton 
                            className=""
                            appearance={{
                                button: "w-full upload-button mb-2 text-sm font-medium bg-purple-400",
                                allowedContent: "hidden"
                            }}
                            content={{
                                button: "Upload Video"
                            }}
                            endpoint="videoUploader" 
                            onClientUploadComplete={(res) => {
                                editor?.addVideo(res[0].ufsUrl )
                            }}
                            onUploadError={(error: Error) => {
                                toast.error(`${error.message}`);
                            }}
                        />

                    </div>
                    <div className="flex gap-2 mb-2">
                        <Input 
                            className="ml-[2px]" 
                            required
                            placeholder="Search your images" 
                            onChange={(e)=>setSearchKey(e.target.value)}
                        />
                        <Button variant="purple" onClick={onClick} className=" px-2 rounded-md">
                            <CiSearch className="size-5 font-bold text-white"/>
                        </Button>
                    </div>
                </div>
                {isLoading && (
                    <div className="grid grid-cols-2  gap-1">
                        {Array.from({ length: 10 }).map((_, idx) => (
                            <div key={idx} className="bg-gray-200 rounded-lg animate-pulse overflow-hidden">
                            <div className="w-full aspect-video bg-gray-300" /> 
                            </div>
                        ))}
                    </div>
                )}
                {searchData.length==0? (
                    <div className="grid grid-cols-2 gap-1">
                        {data && data.map((image: UnsplashImage)=>{
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
                ):(
                    <div >
                        <div className="grid grid-cols-2 gap-1">
                            {searchData && searchData.map((image: UnsplashImage)=>{
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
                        {searchData.length > 0 && (
                            <Button
                                onClick={loadMore}
                                variant="purple"
                                disabled={page >= totalPages}
                                className="mt-4  px-4 py-2 rounded-md w-full"
                            >
                                {page < totalPages ? "Load More" : "No More Results"}
                            </Button>
                        )}
                    </div>

                )}
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
        </motion.div>
    )
}

export default ImageSidebar

