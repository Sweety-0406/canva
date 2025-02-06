"use client"

import { motion } from "motion/react"
import { ActiveTools, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import ShapeTool from "./shape-tool"
import { FaCircle, FaSquare, FaSquareFull  } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
 

interface ShapeSidebarProps{
    editor: Editor | undefined,
    activeTools: ActiveTools,
    onChangeActiveTools: (tool:ActiveTools)=>void    
}

const ShapeSidebar = ({
    editor,
    activeTools,
    onChangeActiveTools
}:ShapeSidebarProps)=>{
    const onClose = ()=>{
        onChangeActiveTools("select")
    }
    return(
        <aside 
            className={`
                ${activeTools==="shapes" ? "visible":"hidden"}
                w-60 bg-white border-r
            `}
        >
            <ToolSidebarHeader onClose={onClose} title="Shapes" description="Add shapes to your canvas" />
            <ScrollArea className="p-1">
                <div className="grid grid-cols-3 gap-2">
                    <ShapeTool icon={FaCircle} onClick={()=>editor?.addCircle()} />
                    <ShapeTool icon={FaSquare} onClick={()=>editor?.addRoundedRectangle()} />
                    <ShapeTool icon={FaSquareFull} onClick={()=>editor?.addRectangle()} />
                    <ShapeTool icon={FaDiamond} onClick={()=>editor?.addDiamond()} />
                    <ShapeTool icon={IoTriangle} onClick={()=>editor?.addTriangle()} />
                    <ShapeTool icon={IoTriangle} onClick={()=>editor?.addReverseTriangle()} iconClassName="rotate-180" />
                </div>
            </ScrollArea>
        </aside>
    )
}

export default ShapeSidebar


// "use client";

// import { motion } from "motion/react";
// import { ActiveTools } from "../types";
// import ToolSidebarHeader from "./tool-sidebar-header";

// interface ShapeSidebarProps {
//     activeTools: ActiveTools,
//     onChangeActiveTools: (tool: ActiveTools) => void    
// }

// const ShapeSidebar = ({
//     activeTools,
//     onChangeActiveTools
// }: ShapeSidebarProps) => {
//     const onClose = () => {
//         onChangeActiveTools("select")
//     }

//     return (
//         <motion.aside 
//             initial={{ y: 320, opacity: 0 }}
//             animate={activeTools === "shapes" ? { y: 0, opacity: 1 } : { y: 320, opacity: 0 }}
//             exit={{y: 320, opacity: 0}}
//             transition={{ type: "spring", stiffness: 200, damping: 30 }}
//             className={`
//                 ${activeTools === "shapes" ? "visible" : "hidden"}
//                 w-80 bg-white border-r z-100
//             `}
//         >
//             <ToolSidebarHeader onClose={onClose} title="Shapes" description="Add shapes to your canvas" />
//         </motion.aside>
//     )
// }

// export default ShapeSidebar;
