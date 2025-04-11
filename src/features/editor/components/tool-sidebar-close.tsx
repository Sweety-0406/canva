"use client"

import { ArrowLeft } from 'lucide-react';
import { PanelLeftClose } from 'lucide-react';
import { PanelBottomClose  } from 'lucide-react';


interface ToolSidebarCloseProps{
    onClose:()=>void
}

const ToolSidebarClose=({onClose}:ToolSidebarCloseProps)=>{
    return(
        <button className='relative' onClick={onClose}>
            <PanelBottomClose className='size-5 mt-1 text-gray-600'/>
        </button>
    )
}

export default ToolSidebarClose