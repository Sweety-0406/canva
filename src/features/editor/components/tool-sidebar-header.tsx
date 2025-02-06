"use client"

import ToolSidebarClose from "./tool-sidebar-close"

interface ToolSidebarHeaderProps{
    title:string,
    description?: string
    onClose:()=>void
}

const ToolSidebarHeader = ({title, description, onClose}:ToolSidebarHeaderProps)=>{
    return(
        <div className="text-sm border-b flex flex-row-reverse justify-between  p-2 ">
            <div className="">
                <ToolSidebarClose onClose={onClose} />
            </div>
            <div>
                <div className="">
                    {title}
                </div>
                {description && (
                    <div className="text-gray-400 text-xs">
                        {description}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ToolSidebarHeader