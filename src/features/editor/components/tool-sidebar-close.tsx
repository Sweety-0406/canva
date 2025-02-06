"use client"

import { ArrowLeft } from 'lucide-react';
import { PanelLeftClose } from 'lucide-react';
import { PanelBottomClose  } from 'lucide-react';


interface ToolSidebarClosePrps{
    onClose:()=>void
}

const ToolSidebarClose=({onClose}:ToolSidebarClosePrps)=>{
    return(
        <button className='relative' onClick={onClose}>
            <PanelBottomClose className='size-5 mt-1 text-gray-600'/>
            {/* <ArrowLeft className='size-5 mt- text-gray-600'/> */}
        </button>
    )
}

export default ToolSidebarClose