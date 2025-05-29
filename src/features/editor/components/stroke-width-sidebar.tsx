// "use client"

// import { ActiveTool, Editor } from "../types"
// import ToolSidebarHeader from "./tool-sidebar-header"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Label } from "@/components/ui/label"
// import { Slider } from "@/components/ui/slider"
// import { Button } from "@/components/ui/button"
// import { motion } from "framer-motion"

// interface StrokeWidthSidebarProps{
//     editor: Editor | undefined,
//     onChangeActiveTool: (tool:ActiveTool)=>void    
// }

// const StrokeWidthSidebar = ({
//     editor,
//     onChangeActiveTool
// }:StrokeWidthSidebarProps)=>{
//     const strokeWidthValue = editor?.strokeWidth || 5
//     const strokeTypeValue = editor?.strokeType || []
//     const onClose = ()=>{
//         onChangeActiveTool("select")
//     }

//     const onChangeStrokeWidth=(value:number)=>{
//         editor?.changeStrokeWidth(value)
//     }

//     const onChangeStrokeType=(value: number[])=>{
//         editor?.changeStrokeType(value)
//     }

//     return(
//         <motion.div 
//             initial={{ opacity: 0, x: -240 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -240 }}
//             transition={{ duration: 0.5 }}
//             className="w-64 bg-white border-r absolute z-40 h-full left-16"
//         >
//             <ToolSidebarHeader onClose={onClose} title="Stroke Options" description="Modify the stroke of your element" />
//             <ScrollArea >
//                 <div className="border-b mb-2 p-1">
//                     <div className="m-1 pb-2">
//                         <Label>
//                             Stroke width
//                         </Label>
//                     </div>
//                     <div className="m-1 pb-2  ">
//                         <Slider 
//                             onValueChange={(values)=>onChangeStrokeWidth(values[0])}
//                             value={[strokeWidthValue]}
//                         />
//                     </div>
//                 </div>
//                 <div className="p-1 flex flex-col gap-2">
//                     <Button 
//                         onClick={()=>onChangeStrokeType([])}
//                         variant="secondary"
//                         className={`
//                             w-full
//                             ${JSON.stringify(strokeTypeValue) === '[]'? "border-2 border-[#8B3DFF]": "border-none"}
//                         `}
//                         >
//                         <div className="border-2 rounded-full border-black w-full " />
//                     </Button>
//                     <Button 
//                         onClick={()=>onChangeStrokeType([10,10])}
//                         variant="secondary"
//                         className={`
//                             w-full
//                             ${JSON.stringify(strokeTypeValue) === '[10,10]' ? "border-2 border-[#8B3DFF]": "border-none"}
//                         `}
//                     >
//                         <div className="border-2 border-dashed rounded-full border-black w-full " />
//                     </Button>
//                 </div>
//             </ScrollArea>
//         </motion.div>
//     )
// }

// export default StrokeWidthSidebar

"use client"

import { ActiveTool, Editor } from "../types"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Hint from "./hint"
import { RxTransparencyGrid } from "react-icons/rx"
import { BsBorderWidth } from "react-icons/bs"

interface StrokeWidthSidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    // onChangeActiveTool: (tool:ActiveTool)=>void    
}

const StrokeWidthSidebar = ({
    editor,
    activeTool,
    // onChangeActiveTool
}:StrokeWidthSidebarProps)=>{
    const strokeWidthValue = editor?.strokeWidth || 5
    const strokeTypeValue = editor?.strokeType || []
    // const onClose = ()=>{
    //     onChangeActiveTool("select")
    // }

    const onChangeStrokeWidth=(value:number)=>{
        editor?.changeStrokeWidth(value)
    }

    const onChangeStrokeType=(value: number[])=>{
        editor?.changeStrokeType(value)
    }

    return(
        // <div className="">
            <DropdownMenu >
                <DropdownMenuTrigger >
                    <div className={`mt-2 ${activeTool==="stroke-width"?"bg-muted":"bg-transparent"}`}>
                        <Hint 
                            label="Stroke Width"
                            side="bottom"
                            >
                            <BsBorderWidth   
                                className="size-4 -mt-1 rounded-sm"
                            /> 
                        </Hint>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent asChild>
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        className="w-56 rounded-md bg-white shadow-md p-4 mt-4"
                    >
                        {/* <ToolSidebarHeader onClose={onClose} title="Stroke Options" description="Modify the stroke of your element" /> */}
                        {/* <ScrollArea > */}
                            <div className="flex  gap-2">
                                <Button 
                                    onClick={()=>onChangeStrokeType([])}
                                    variant="secondary"
                                    className={`
                                        w-full
                                        ${JSON.stringify(strokeTypeValue) === '[]'? "border-2 border-[#8B3DFF]": "border-none"}
                                    `}
                                    >
                                    <div className="border-2 w-6 rounded-full border-black  " />
                                </Button>
                                <Button 
                                    onClick={()=>onChangeStrokeType([5,5])}
                                    variant="secondary"
                                    className={`
                                        w-full
                                        ${JSON.stringify(strokeTypeValue) === '[5,5]' ? "border-2 border-[#8B3DFF]": "border-none"}
                                    `}
                                > 
                                    <div className="border-2 w-6 border-dashed rounded-full border-black  " />
                                </Button>
                                <Button 
                                    onClick={()=>onChangeStrokeType([10,10])}
                                    variant="secondary"
                                    className={`
                                        w-full
                                        ${JSON.stringify(strokeTypeValue) === '[10,10]' ? "border-2 border-[#8B3DFF]": "border-none"}
                                    `}
                                >
                                    <div className="border-2 w-6 border-dashed rounded-full border-black " />
                                </Button>
                            </div>
                            <div className=" p-1">
                                <div className="m-1 pb-2">
                                    <Label>
                                        Stroke weight
                                    </Label>
                                </div>
                                <div className="m-1 pb-2  ">
                                    <Slider 
                                        onValueChange={(values)=>onChangeStrokeWidth(values[0])}
                                        value={[strokeWidthValue]}
                                    />
                                </div>
                            </div>
                        {/* </ScrollArea> */}
                    </motion.div>
                </DropdownMenuContent>

            </DropdownMenu>
        // </div>
        
    )
}

export default StrokeWidthSidebar

