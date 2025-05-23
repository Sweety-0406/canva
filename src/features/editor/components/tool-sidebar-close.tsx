"use client"

import { PanelRightClose  } from 'lucide-react';

interface ToolSidebarCloseProps{
    onClose:()=>void
}

const ToolSidebarClose=({onClose}:ToolSidebarCloseProps)=>{
    return(
        <button className='relative' onClick={onClose}>
            <PanelRightClose  className='size-5 mt-1 text-gray-600'/>
        </button>
    )
}

export default ToolSidebarClose