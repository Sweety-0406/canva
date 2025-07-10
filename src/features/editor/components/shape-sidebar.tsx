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
    const strokeWidth = editor?.strokeWidth || 2
    const onClose = ()=>{
        onChangeActiveTool("select")
    }
    return(
        <motion.div 
            initial={{ opacity: 0, x: -240 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -240 }}
            transition={{ duration: 0.5 }}
            className="w-72 bg-gradient-to-r from-white/80 to-white border-r absolute z-40 h-full left-[74px]"
        >
            <ToolSidebarHeader onClose={onClose} title="Shapes" description="Add shapes to your canvas" />
            <ScrollArea className="p-3 h-[84vh]">
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
                        <ShapeTool imgUrl="/images/6PointerStar.svg" onClick={()=>editor?.add6PointerStar()}/>
                        <ShapeTool imgUrl="/images/4PointerStar.svg" onClick={()=>editor?.add4PointerStar()}/>
                        <ShapeTool imgUrl="/images/8PointerStar.svg" onClick={()=>editor?.add8PointerStar()}/>
                        <ShapeTool imgUrl="/images/starBrust1.svg" onClick={()=>editor?.addStarBrust1()}/>
                        <ShapeTool imgUrl="/images/starBrust2.svg" onClick={()=>editor?.addStarBrust2()}/>
                        <ShapeTool imgUrl="/images/starBrust3.svg" onClick={()=>editor?.addStarBrust3()}/>
                        <ShapeTool imgUrl="/images/starBrust4.svg" onClick={()=>editor?.addStarBrust4()}/>
                        <ShapeTool imgUrl="/images/rightArrow.svg" onClick={()=>editor?.addRightArrow()}/>
                        <ShapeTool imgUrl="/images/leftArrow.svg" onClick={()=>editor?.addLeftArrow()}/>
                        <ShapeTool imgUrl="/images/downArrow.svg" onClick={()=>editor?.addDownArrow()}/>
                        <ShapeTool imgUrl="/images/upArrow.svg" onClick={()=>editor?.addUpArrow()}/>
                        <ShapeTool imgUrl="/images/arrowHorizontal.svg" onClick={()=>editor?.addArrowHorizontal()}/>
                        <ShapeTool imgUrl="/images/arrowBlock.svg" onClick={()=>editor?.addArrowBlock()}/>
                        <ShapeTool imgUrl="/images/arrowBlock2Right.svg" onClick={()=>editor?.addArrowBlock2Right()}/>
                        <ShapeTool imgUrl="/images/arrowBlockConcave.svg" onClick={()=>editor?.addArrowBlockConcave()}/>
                        <ShapeTool imgUrl="/images/arrowBlockConvex.svg" onClick={()=>editor?.addArrowBlockConvex()}/>
                        <ShapeTool imgUrl="/images/whiteOblongShape.svg" onClick={()=>editor?.addWhiteOblongShape()}/>
                        <ShapeTool imgUrl="/images/squareSpeechBubble.svg" onClick={()=>editor?.addSquareSpeechBubble()} iconClassName="rotate-180" />
                        <ShapeTool imgUrl="/images/ovalSpeechBubble.svg" onClick={()=>editor?.addOvalSpeechBubble()} iconClassName="rotate-180" />
                        <ShapeTool imgUrl="/images/plusShape.svg" onClick={()=>editor?.addPlusShape()}/>
                        <ShapeTool imgUrl="/images/cloudShape.svg" onClick={()=>editor?.addCloudShape()}/>
                        <ShapeTool imgUrl="/images/banner2.svg" onClick={()=>editor?.addBanner2()} iconClassName="rotate-180" />
                        <ShapeTool imgUrl="/images/banner3.svg" onClick={()=>editor?.addBanner3()} iconClassName="rotate-180" />
                        <ShapeTool imgUrl="/images/banner4.svg" onClick={()=>editor?.addBanner4()}/>
                        <ShapeTool imgUrl="/images/banner5.svg" onClick={()=>editor?.addBanner5()}/>
                        <ShapeTool imgUrl="/images/banner6.svg" onClick={()=>editor?.addBanner6()}/>
                        <ShapeTool imgUrl="/images/parallelogramRight.svg" onClick={()=>editor?.addParallelogramRight()}/>
                        <ShapeTool imgUrl="/images/parallelogramLeft.svg" onClick={()=>editor?.addParallelogramLeft()}/>
                        <ShapeTool imgUrl="/images/trapezoidalUp.svg" onClick={()=>editor?.addTrapezoidUp()} iconClassName="rotate-180" />
                        <ShapeTool imgUrl="/images/trapezoidalDown.svg" onClick={()=>editor?.addTrapezoidDown()}/>
                        <ShapeTool imgUrl="/images/archDown.svg" onClick={()=>editor?.addArchDown()}  iconClassName=" bg-white" />
                        <ShapeTool imgUrl="/images/archUp.svg" onClick={()=>editor?.addArchUp()}/>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="text-sm pb-1">
                        Lines
                    </div>
                    <div className="grid border-t pt-2 grid-cols-3 gap-2">
                        <ShapeTool imgUrl="/images/line.svg" onClick={()=>editor?.addLine(strokeWidth)} iconClassName="rotate-45 "  />
                        <ShapeTool imgUrl="/images/singleHeadArrow.svg" onClick={()=>editor?.addSingleHeadArrow(strokeWidth)}  />
                        <ShapeTool imgUrl="/images/dashedSingleHeadArrow.svg"  onClick={()=>editor?.addDashedSingleHeadArrow(strokeWidth)}  />
                        <ShapeTool imgUrl="/images/doubleHeadArrow.svg"  onClick={()=>editor?.addDoubleHeadArrow(strokeWidth)}  />
                        <ShapeTool imgUrl="/images/dashedDoubleHeadArrow.svg" onClick={()=>editor?.addDashedDoubleHeadArrow(strokeWidth)} iconClassName="size-16" />
                        <ShapeTool imgUrl="/images/arrowWithCircle.svg"   onClick={()=>editor?.addArrowWithCircle(strokeWidth)}  />
                        <ShapeTool imgUrl="/images/arrowWithRectangle.svg" onClick={()=>editor?.addArrowWithRectangle(strokeWidth)} />
                        
                    </div>
                </div>
            </ScrollArea>
        </motion.div>
    )
}

export default ShapeSidebar

