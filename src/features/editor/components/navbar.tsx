// "use client"

// import Logo from "./logo"
// import Hint from "./hint";
// import {useFilePicker} from "use-file-picker"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { FaRegFileAlt } from "react-icons/fa";
// import { Button } from "@/components/ui/button"
// import { ChevronDown, Download, File } from "lucide-react";
// import { MousePointerClick } from 'lucide-react';
// import { Separator } from "@/components/ui/separator";
// import { Redo } from 'lucide-react';
// import { Undo } from 'lucide-react';
// import { MdOutlineCloudDone } from "react-icons/md";
// import { ActiveTool, Editor } from "../types";
// import { cn } from "@/lib/utils";
// import UserButton from "./user-button";
// import {useMutationState } from "@tanstack/react-query";
// import { BsCloudSlash } from "react-icons/bs";
// import { CiUnlock } from "react-icons/ci";
// import { CiLock } from "react-icons/ci";
// // import { useGetProject } from "../hooks/useGetProject";
// import useMakePrivateModal from "../hooks/useMakePrivateModal";
// import useRemovePrivateModal from "../hooks/useRemovePrivateModal";
// import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
// import useChangeFileNameModal from "../hooks/useChangeFileName";
// import { motion } from "framer-motion";
// import { TbLoader3 } from "react-icons/tb";
// import { useEffect } from "react";
// import { useHistory } from "../hooks/useHistory";

// interface NavbarProps{
//     name: string,
//     isPrivate:boolean,
//     editor: Editor | undefined,
//     id: string,
//     activeTool: ActiveTool,
//     onChangeActiveTool:(tool:ActiveTool)=>void,
//     canUndo: () => boolean,
//     canRedo: () => boolean,
//     onUndo: () => void,
//     onRedo: () => void,
// }  

// const Navbar = ({
//     name,
//     isPrivate,
//     editor,
//     id,
//     activeTool,
//     onChangeActiveTool,
//     canUndo,
//     canRedo,
//     onUndo,
//     onRedo
// }:NavbarProps)=>{ 
//     // const query = useGetProject(id)
//     const makePrivateModal = useMakePrivateModal()
//     const removePrivateModal =  useRemovePrivateModal()
//     const changeFileName = useChangeFileNameModal()
//     // const {activePage} = useHistory()
//     useEffect(()=>{
//         editor?.canRedo()
//         editor?.canUndo()
//     },[])
//     const data = useMutationState({
//         filters:{
//             mutationKey: ["project", { projectId:id }],
//             exact: true
//         },
//         select: (mutation)=> mutation.state.status
//     })
//     const currentState = data[data.length - 1]
//     const isError = currentState === "error"
//     const isPending = currentState === "pending"
//     const {openFilePicker} = useFilePicker({
//         accept: ".json",
//         onFilesSuccessfullySelected:({plainFiles}: { plainFiles: File[] })=>{
//             if(plainFiles && plainFiles.length >0){
//                 const file = plainFiles[0]
//                 const reader = new FileReader();
//                 reader.readAsText(file, "UTF-8")
//                 reader.onload=()=>{
//                     editor?.loadFromJSON(reader.result as string)
//                 }
//             }
//         }
//     })
    
//     return(
//         <div className="bg-gradient-to-r from-[#25ebf2]  to-[#7a21ee] z-[60] flex items-center gap-3 h-12 border-b p-2 ">
//             <Logo />
//             <div className="flex items-center ml-3  w-20 h-full my-auto">
//                 <Hint 
//                     label={name}
//                     side="bottom"
//                     // sideOffset={8}
//                     >
//                     <Button 
//                         size="sm" 
//                         variant="ghost"
//                         className={`
//                             items-center w-full flex-wrap border h-full rounded-sm  flex justify-center p-1 px-2
//                         `}
//                     >
//                         <span className="truncate  w-full text-center">{name}</span>
//                     </Button>
//                 </Hint>
//             </div>
//             <div >
//                 <DropdownMenu modal={false}>
//                     <DropdownMenuTrigger asChild className="flex  ">
//                         <Button size={"sm"} variant="ghost">
//                             File
//                             <ChevronDown className="size-20" />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent asChild align="start" className=" flex flex-col w-56 gap-2">
//                         <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: 20 }}
//                             transition={{ duration: 0.5 }}
//                         >
//                             <DropdownMenuItem className="hover:cursor-pointer" onClick={()=> openFilePicker()}>
//                                     <FaRegFileAlt />
//                                 <div >
//                                     <h1>Open</h1>
//                                     <p className="text-xs  text-gray-500">Open a JSON file</p>
//                                 </div>
//                             </DropdownMenuItem>
//                             <DropdownMenuItem className="hover:cursor-pointer" onClick={()=>changeFileName.onOpen()}>
//                                     <MdOutlineDriveFileRenameOutline />
//                                 <div >
//                                     <h1>Rename</h1>
//                                     <p className="text-xs  text-gray-500">Change the file name</p>
//                                 </div>
//                             </DropdownMenuItem>
//                         </motion.div>
//                     </DropdownMenuContent>
//                 </DropdownMenu>

//             </div>
//             <Separator orientation="vertical" />
//             <Hint label="select" sideOffset={8}>
//                 <Button  
//                     variant="ghost" 
//                     size={"sm"}
//                     onClick={()=>onChangeActiveTool("select")}
//                     className={cn(
//                         activeTool==='select' && "bg-gray-100"
//                     )}
//                 >
//                     <MousePointerClick />
//                 </Button>
//             </Hint>
//             <Hint label="Undo" sideOffset={8}>
//                 <Button 
//                     variant="ghost" 
//                     size={"sm"}
//                     // disabled={!canUndo()}
//                     // onClick={onUndo}
//                     disabled={!editor?.canUndo()}
//                     onClick={(()=>editor?.onUndo())}
//                 >
//                     <Undo/>
//                 </Button>
//             </Hint>
//             <Hint label="Redo" sideOffset={8}>
//                 <Button
//                     variant="ghost"  
//                     size={"sm"}
//                     // disabled={!canRedo()}
//                     // onClick={onRedo}
//                     disabled={!editor?.canRedo()}
//                     onClick={(()=>editor?.onRedo())}
//                 >
//                     <Redo />
//                 </Button>
//             </Hint>
//             <Separator orientation="vertical" />
//             {isPending && (
//                 <div className="flex gap-2 text-gray-500 ">
//                     <TbLoader3 className="animate-spin" size={20} />
//                 </div>
//             )}
//             {!isPending && isError && (
//                 <div className="flex gap-2 text-gray-500 ">
//                     <BsCloudSlash size={20} />
//                 </div>
//             )}
//             {!isPending && !isError && (
//                 <Hint label="All changes saved" sideOffset={8}>
//                     <div className="flex gap-2 text-gray-500 ">
//                         <MdOutlineCloudDone size={20} />
//                     </div>
//                 </Hint>
//             )}
//             <div>
//                 {isPrivate ?(
//                     <Hint label="Private file" sideOffset={6}>
//                         <Button variant="ghost" 
//                             onClick={()=>{ 
//                                 removePrivateModal.onOpen()
//                             }}
//                         >
//                             <CiLock />
//                         </Button>
//                     </Hint>
//                 ):(
//                     <Hint label="Not a private file" sideOffset={6}>

//                         <Button variant="ghost" 
//                             onClick={()=>{ 
//                                 makePrivateModal.onOpen()
//                             }}
//                         >
//                             <CiUnlock  />
//                         </Button>
//                     </Hint>
//                 )}
//             </div>
//             <div className="ml-auto flex items-center">
//                 <DropdownMenu modal={false} >
//                     <DropdownMenuTrigger asChild className="flex mr-2 ">
//                         <Button size={"sm"} variant="ghost">
//                             Export
//                             <Download  />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent asChild align="start" className=" flex flex-col w-60 mr-2 mt-1">
//                         <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: 20 }}
//                             transition={{ duration: 0.5 }}
//                         >
//                             <DropdownMenuItem  onClick={()=> editor?.savePdf()} className="flex items-center hover:cursor-pointer  w-full">
//                                 <File />
//                                 <div >
//                                     <h1>PDF</h1>
//                                     <p className="text-xs  text-gray-500">Save your design as a PDF </p>
//                                 </div>
//                             </DropdownMenuItem>
//                             <DropdownMenuItem  onClick={()=> editor?.saveJson()} className="flex items-center hover:cursor-pointer  w-full">
//                                 <File />
//                                 <div >
//                                     <h1>JSON</h1>
//                                     <p className="text-xs  text-gray-500">Save for later editing</p>
//                                 </div>
//                             </DropdownMenuItem>
//                             <DropdownMenuItem  onClick={()=> editor?.savePng()} className="flex items-center  hover:cursor-pointer w-full">
//                                 <File />
//                                 <div >
//                                     <h1>PNG</h1>
//                                     <p className="text-xs  text-gray-500">Best for sharing on web</p>
//                                 </div>
//                             </DropdownMenuItem>
//                             <DropdownMenuItem  onClick={()=> editor?.saveJpg()} className="flex items-center  hover:cursor-pointer w-full">
//                                     <File />
//                                 <div >
//                                     <h1>JPEG</h1>
//                                     <p className="text-xs  text-gray-500">Best for printing</p>
//                                 </div>
//                             </DropdownMenuItem>
//                             <DropdownMenuItem  onClick={()=> editor?.saveSvg()} className="flex items-center  hover:cursor-pointer w-full">
//                                     <File />
//                                 <div >
//                                     <h1>SVG</h1>
//                                     <p className="text-xs  text-gray-500">Best for editing in vector software</p>
//                                 </div>
//                             </DropdownMenuItem>
//                         </motion.div>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//                 <UserButton />
//             </div>
//         </div>
//     )
// }

// export default Navbar



"use client"

import { useEffect, useRef, useState } from "react";
import Logo from "./logo"
import Hint from "./hint";
import {useFilePicker} from "use-file-picker"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
import { ActiveTool, Editor, projectJson } from "../types";
import { cn } from "@/lib/utils";
import UserButton from "./user-button";
import {useMutationState } from "@tanstack/react-query";
import { BsCloudSlash } from "react-icons/bs";
import { CiUnlock } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
// import { useGetProject } from "../hooks/useGetProject";
import useMakePrivateModal from "../hooks/useMakePrivateModal";
import useRemovePrivateModal from "../hooks/useRemovePrivateModal";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { TbLoader3 } from "react-icons/tb";
import { useHistory } from "../hooks/useHistory";
import axios from "axios";
import toast from "react-hot-toast";

interface NavbarProps{
    projectId: string,
    name: string,
    isPrivate:boolean,
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool:(tool:ActiveTool)=>void,
    saveAsPdf:()=>void
}  

const Navbar = ({
    projectId,
    name,
    isPrivate,
    editor,
    activeTool,
    onChangeActiveTool,
    saveAsPdf
}:NavbarProps)=>{ 
    // const query = useGetProject(id)
    const [fileName, setFileName] = useState(name)
    const [showFileName, setShowFileName] = useState(name)
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const makePrivateModal = useMakePrivateModal()
    const removePrivateModal =  useRemovePrivateModal()

    useEffect(()=>{
        editor?.canRedo()
        editor?.canUndo()
    },[])
    const data = useMutationState({
        filters:{
            mutationKey: ["project", { projectId:projectId }],
            exact: true
        },
        select: (mutation)=> mutation.state.status
    })
    const currentState = data[data.length - 1]
    const isError = currentState === "error"
    const isPending = currentState === "pending"
    const {openFilePicker} = useFilePicker({
        accept: ".json",
        onFilesSuccessfullySelected:({plainFiles}: { plainFiles: File[] })=>{
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


    const submitHandler = async () => {
    setIsLoading(true);
    try {
        const response = await axios.patch(`/api/projects/${projectId}/changeFileName`, { name:fileName });
        if (response.status === 200) {
        toast.success("File name changed successfully.");
        setFileName(response.data.data.name);
        setShowFileName(response.data.data.name)
        } else {
        toast.error("Something went wrong. Please try again.");
        setFileName(showFileName);
        }
    } catch{
        toast.error("Error updating file name.");
        setFileName(showFileName);
    } finally {
        setIsEditing(false);
        setIsLoading(false);
    }
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
        inputRef.current.focus();
        }
    }, [isEditing]);
    
    return(
        <div className="bg-gradient-to-r from-[#25ebf2]  to-[#7a21ee] z-[60] flex items-center gap-3 h-12 border-b p-2 ">
            <Logo />
            <Hint label="select" sideOffset={8}>
                <Button  
                    variant="white" 
                    size={"sm"}
                    onClick={()=>onChangeActiveTool("select")}
                    className={cn(
                        "ml-4",
                        activeTool==='select' && "bg-white/10 text-white"
                    )}
                >
                    <MousePointerClick />
                </Button>
            </Hint>
            <Hint label="Undo" sideOffset={8}>
                <Button 
                    variant="white" 
                    size={"sm"}
                    disabled={!editor?.canUndo()}
                    onClick={(()=>editor?.onUndo())}
                >
                    <Undo/>
                </Button>
            </Hint>
            <Hint label="Redo" sideOffset={8}>
                <Button
                    variant="white"  
                    size={"sm"}
                    // disabled={!canRedo()}
                    // onClick={onRedo}
                    disabled={!editor?.canRedo()}
                    onClick={(()=>editor?.onRedo())}
                >
                    <Redo />
                </Button>
            </Hint>
            {isPending && (
                <div className="flex gap-2 text-white ">
                    <TbLoader3 className="animate-spin" size={20} />
                </div>
            )}
            {!isPending && isError && (
                <div className="flex gap-2 text-white ">
                    <BsCloudSlash size={20} />
                </div>
            )}
            {!isPending && !isError && (
                <Hint label="All changes saved" sideOffset={8}>
                    <div className="flex gap-2 text-white">
                        <MdOutlineCloudDone size={20} />
                    </div>
                </Hint>
            )}
            <div>
                {isPrivate ?(
                    <Hint label="Private file" sideOffset={6}>
                        <Button variant="white" 
                            onClick={()=>{ 
                                removePrivateModal.onOpen()
                            }}
                        >
                            <CiLock />
                        </Button>
                    </Hint>
                ):(
                    <Hint label="Not a private file" sideOffset={6}>

                        <Button variant="white" 
                            onClick={()=>{ 
                                makePrivateModal.onOpen()
                            }}
                        >
                            <CiUnlock  />
                        </Button>
                    </Hint>
                )}
            </div>
            <div className="ml-auto flex gap-1 items-center">
                <div className="flex items-center mr-2 max-w-80 h-full">
                    <Hint label={showFileName} side="bottom">
                        <Button
                        size="sm"
                        variant="transparent"
                        disabled={isLoading}
                        className="items-center w-full flex-wrap group h-full rounded-sm flex justify-center p-1 px-2"
                        onClick={() => setIsEditing(true)}
                        >
                        {isEditing ? (
                            <input
                            ref={inputRef}
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            onBlur={submitHandler}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                inputRef.current?.blur();
                                }
                            }}
                            className="w-full bg-transparent text-white  text-center outline-none"
                            />
                        ) : (
                            <span className="truncate text-white  w-full text-center">
                            {showFileName}
                            </span>
                        )}
                        </Button>
                    </Hint>
                </div>
                <div >
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild className="flex  ">
                            <Button size={"sm"} variant="transparent">
                                File
                                <ChevronDown className="size-20" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent asChild align="start" className=" flex flex-col w-56 gap-2 mt-1">
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <DropdownMenuItem className="hover:cursor-pointer" onClick={()=> openFilePicker()}>
                                        <FaRegFileAlt />
                                    <div >
                                        <h1>Open</h1>
                                        <p className="text-xs  text-gray-500">Open a JSON file</p>
                                    </div>
                                </DropdownMenuItem>
                            </motion.div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>               
                <DropdownMenu modal={false} >
                    <DropdownMenuTrigger asChild className="flex mr-2 ">
                        <Button size={"sm"} variant="transparent">
                            Export
                            <Download  />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent asChild align="start" className=" flex flex-col w-60 mr-2 mt-1">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <DropdownMenuItem  onClick={saveAsPdf} className="flex items-center hover:cursor-pointer  w-full">
                                <File />
                                <div >
                                    <h1>PDF</h1>
                                    <p className="text-xs  text-gray-500">Save your design as a PDF </p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem  onClick={()=> editor?.saveJson()} className="flex items-center hover:cursor-pointer  w-full">
                                <File />
                                <div >
                                    <h1>JSON</h1>
                                    <p className="text-xs  text-gray-500">Save for later editing</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem  onClick={()=> editor?.savePng()} className="flex items-center  hover:cursor-pointer w-full">
                                <File />
                                <div >
                                    <h1>PNG</h1>
                                    <p className="text-xs  text-gray-500">Best for sharing on web</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem  onClick={()=> editor?.saveJpg()} className="flex items-center  hover:cursor-pointer w-full">
                                    <File />
                                <div >
                                    <h1>JPEG</h1>
                                    <p className="text-xs  text-gray-500">Best for printing</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem  onClick={()=> editor?.saveSvg()} className="flex items-center  hover:cursor-pointer w-full">
                                    <File />
                                <div >
                                    <h1>SVG</h1>
                                    <p className="text-xs  text-gray-500">Best for editing in vector software</p>
                                </div>
                            </DropdownMenuItem>
                        </motion.div>
                    </DropdownMenuContent>
                </DropdownMenu>
                <UserButton />
            </div>
        </div>
    )
}

export default Navbar



