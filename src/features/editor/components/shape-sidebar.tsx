"use client"

import { motion } from "motion/react"
import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import ShapeTool from "./shape-tool"
import { FaCircle, FaSquare, FaSquareFull  } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { PiPentagonFill } from "react-icons/pi";
import { BsHexagonFill } from "react-icons/bs";
import { VscHeartFilled } from "react-icons/vsc";
import { TbOvalFilled, TbOvalVerticalFilled} from "react-icons/tb";
import { BsOctagonFill } from "react-icons/bs"; 

interface ShapeSidebarProps{
    editor: Editor | undefined,
    onChangeActiveTool: (tool:ActiveTool)=>void    
}

const ShapeSidebar = ({
    editor,
    onChangeActiveTool
}:ShapeSidebarProps)=>{
    // const fillColor = editor?.fillColor || "#000000"
    // const strokeColor = editor?.strokeColor || "#000000"
    const strokeWidth = editor?.strokeWidth || 2
    const onClose = ()=>{
        onChangeActiveTool("select")
    }
    return(
        <motion.div 
            key="shape-sidebar"
            initial={{ opacity: 0, x: -240 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -240 }}
            transition={{ duration: 0.5 }}
            className="w-64 bg-white border-r absolute z-40 h-full left-16"
        >
            <ToolSidebarHeader onClose={onClose} title="Shapes" description="Add shapes to your canvas" />
            <ScrollArea className="p-1 h-[84vh]">
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
                        <ShapeTool icon={VscHeartFilled} onClick={()=>editor?.addHeart()}/>
                        <ShapeTool icon={BsOctagonFill} onClick={()=>editor?.addOctagon()}/>
                        <ShapeTool imgUrl="/images/6PointerStar.png" onClick={()=>editor?.add6PointerStar()}/>
                        <ShapeTool imgUrl="/images/4PointerStar.png" onClick={()=>editor?.add4PointerStar()}/>
                        <ShapeTool imgUrl="/images/8PointerStar.png" onClick={()=>editor?.add8PointerStar()}/>
                        <ShapeTool imgUrl="/images/starBrust1.png" onClick={()=>editor?.addStarBrust1()}/>
                        <ShapeTool imgUrl="/images/starBrust2.png" onClick={()=>editor?.addStarBrust2()}/>
                        <ShapeTool imgUrl="/images/starBrust3.png" onClick={()=>editor?.addStarBrust3()}/>
                        <ShapeTool imgUrl="/images/starBrust4.png" onClick={()=>editor?.addStarBrust4()}/>
                        <ShapeTool imgUrl="/images/rightArrow.png" onClick={()=>editor?.addRightArrow()}/>
                        <ShapeTool imgUrl="/images/leftArrow.png" onClick={()=>editor?.addLeftArrow()}/>
                        <ShapeTool imgUrl="/images/downArrow.png" onClick={()=>editor?.addDownArrow()}/>
                        <ShapeTool imgUrl="/images/upArrow.png" onClick={()=>editor?.addUpArrow()}/>
                        <ShapeTool imgUrl="/images/arrowHorizontal.png" onClick={()=>editor?.addArrowHorizontal()}/>
                        <ShapeTool imgUrl="/images/arrowBlock.png" onClick={()=>editor?.addArrowBlock()}/>
                        <ShapeTool imgUrl="/images/arrowBlock2Right.png" onClick={()=>editor?.addArrowBlock2Right()}/>
                        <ShapeTool imgUrl="/images/arrowBlockConcave.png" onClick={()=>editor?.addArrowBlockConcave()}/>
                        <ShapeTool imgUrl="/images/arrowBlockConvex.png" onClick={()=>editor?.addArrowBlockConvex()}/>
                        <ShapeTool imgUrl="/images/whiteOblongShape.png" onClick={()=>editor?.addWhiteOblongShape()}/>
                        <ShapeTool imgUrl="/images/squareSpeechBubble.png" onClick={()=>editor?.addSquareSpeechBubble()}/>
                        <ShapeTool imgUrl="/images/ovalSpeechBubble.png" onClick={()=>editor?.addOvalSpeechBubble()}/>
                        <ShapeTool imgUrl="/images/plusShape.png" onClick={()=>editor?.addPlusShape()}/>
                        <ShapeTool imgUrl="/images/cloudShape.png" onClick={()=>editor?.addCloudShape()}/>
                        <ShapeTool imgUrl="/images/banner2.png" onClick={()=>editor?.addBanner2()}/>
                        <ShapeTool imgUrl="/images/banner3.png" onClick={()=>editor?.addBanner3()}/>
                        <ShapeTool imgUrl="/images/banner4.png" onClick={()=>editor?.addBanner4()}/>
                        <ShapeTool imgUrl="/images/banner5.png" onClick={()=>editor?.addBanner5()}/>
                        <ShapeTool imgUrl="/images/banner6.png" onClick={()=>editor?.addBanner6()}/>
                        <ShapeTool imgUrl="/images/parallelogramRight.png" onClick={()=>editor?.addParallelogramRight()}/>
                        <ShapeTool imgUrl="/images/parallelogramLeft.png" onClick={()=>editor?.addParallelogramLeft()}/>
                        <ShapeTool imgUrl="/images/trapezoidalUp.png" onClick={()=>editor?.addTrapezoidUp()}/>
                        <ShapeTool imgUrl="/images/trapezoidalDown.png" onClick={()=>editor?.addTrapezoidDown()}/>
                        <ShapeTool imgUrl="/images/archDown.png" onClick={()=>editor?.addArchDown()}  iconClassName=" bg-white" />
                        <ShapeTool imgUrl="/images/archUp.png" onClick={()=>editor?.addArchUp()}/>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="text-sm pb-1">
                        Lines
                    </div>
                    <div className="grid border-t pt-2 grid-cols-3 gap-2">
                        <ShapeTool imgUrl="/images/line.png" onClick={()=>editor?.addLine(strokeWidth)} iconClassName="rotate-45 "  />
                        <ShapeTool imgUrl="/images/singleHeadArrow.png" onClick={()=>editor?.addSingleHeadArrow(strokeWidth)}  />
                        <ShapeTool imgUrl="/images/dashedSingleHeadArrow.png"  onClick={()=>editor?.addDashedSingleHeadArrow(strokeWidth)}  />
                        <ShapeTool imgUrl="/images/doubleHeadArrow.png"  onClick={()=>editor?.addDoubleHeadArrow(strokeWidth)}  />
                        <ShapeTool imgUrl="/images/img2.png" onClick={()=>editor?.addDashedDoubleHeadArrow(strokeWidth)} iconClassName="size-16" />
                        <ShapeTool imgUrl="/images/arrowWithCircle.png"   onClick={()=>editor?.addArrowWithCircle(strokeWidth)}  />
                        <ShapeTool imgUrl="/images/arrowWithRectangle.png" onClick={()=>editor?.addArrowWithRectangle(strokeWidth)} />
                        
                    </div>
                </div>
            </ScrollArea>
        </motion.div>
    )
}

export default ShapeSidebar

