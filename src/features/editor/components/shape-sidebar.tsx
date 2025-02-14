"use client"

import { motion } from "motion/react"
import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import ShapeTool from "./shape-tool"
import { FaCircle, FaSquare, FaSquareFull  } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { IoStar } from "react-icons/io5";
import { PiPentagonFill } from "react-icons/pi";
import { BsHexagonFill } from "react-icons/bs";
import { VscHeartFilled } from "react-icons/vsc";
import { FaArrowRight, FaArrowsUpDown  } from "react-icons/fa6";
import { TbOvalFilled, TbOvalVerticalFilled, TbArrowNarrowRightDashed, TbArrowDownCircleFilled, TbArrowDownSquareFilled   } from "react-icons/tb";
 

interface ShapeSidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const ShapeSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool
}:ShapeSidebarProps)=>{
    const onClose = ()=>{
        onChangeActiveTool("select")
    }
    return(
        <aside 
            className={`
                ${activeTool==="shapes" ? "visible":"hidden"}
                w-64 bg-white border-r
            `}
        >
            <ToolSidebarHeader onClose={onClose} title="Shapes" description="Add shapes to your canvas" />
            <ScrollArea className="p-1 h-[85vh]">
                <div>
                    <div className="text-sm p1-2">
                        Shapes
                    </div>
                    <div className="grid border-t pt-2 grid-cols-3 gap-2">
                        <ShapeTool icon={FaCircle} onClick={()=>editor?.addCircle()} />
                        <ShapeTool icon={TbOvalFilled} onClick={()=>editor?.addHorizontalEllipse()} iconClassName="size-16 "/>
                        <ShapeTool icon={TbOvalVerticalFilled} onClick={()=>editor?.addVerticalEllipse()} iconClassName="size-16 "/>
                        <ShapeTool icon={FaSquare} onClick={()=>editor?.addRoundedRectangle()} />
                        <ShapeTool icon={FaSquareFull} onClick={()=>editor?.addRectangle()} />
                        <ShapeTool icon={FaDiamond} onClick={()=>editor?.addDiamond()} />
                        <ShapeTool icon={IoTriangle} onClick={()=>editor?.addTriangle()} />
                        <ShapeTool icon={IoTriangle} onClick={()=>editor?.addReverseTriangle()} iconClassName="rotate-180" />
                        <ShapeTool icon={IoStar} onClick={()=>editor?.addStar()}  />
                        <ShapeTool icon={PiPentagonFill} onClick={()=>editor?.addPentagon()}  />
                        <ShapeTool icon={BsHexagonFill} onClick={()=>editor?.addHexagon()}  />
                        <ShapeTool icon={VscHeartFilled} onClick={()=>editor?.addHeart()}  />
                    </div>
                </div>
                <div className="mt-6">
                    <div className="text-sm pb-1">
                        Lines
                    </div>
                    <div className="grid border-t pt-2 grid-cols-3 gap-2">
                        <ShapeTool icon={TfiLayoutLineSolid} onClick={()=>editor?.addLine()} iconClassName="rotate-45 size-16"  />
                        <ShapeTool icon={FaArrowRight} onClick={()=>editor?.addSingleHeadArrow()} iconClassName="size-16 " />
                        <ShapeTool icon={TbArrowNarrowRightDashed} onClick={()=>editor?.addDashedSingleHeadArrow()} iconClassName="size-16 " />
                        <ShapeTool icon={FaArrowsUpDown } onClick={()=>editor?.addDoubleHeadArrow()} iconClassName="rotate-90" />
                        <ShapeTool icon={FaArrowsUpDown } onClick={()=>editor?.addDashedDoubleHeadArrow()} iconClassName="rotate-90" />
                        <ShapeTool icon={TbArrowDownCircleFilled } onClick={()=>editor?.addArrowWithCircle()} iconClassName="-rotate-90" />
                        <ShapeTool icon={TbArrowDownSquareFilled  } onClick={()=>editor?.addArrowWithRectangle()} iconClassName="-rotate-90" />
                        
                    </div>
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
