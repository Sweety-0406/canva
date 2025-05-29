"use client"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SideBarItemsProps{
    label:string,
    icon:LucideIcon,
    isActive: boolean,
    onClick:()=>void,
    customCss?:string
}

const SideBarItems = ({
    label,
    icon: Icon,
    isActive,
    onClick,
    customCss
}:SideBarItemsProps)=>{
    return(
        <Button 
            variant="none"
            onClick={onClick}
            className={cn(
                " w-full group h-full rounded-none flex flex-col",
                isActive?" text-primary":"bg-transparent text-[#0e1318b2]"                    
            )}
        >
            <div className={`group-hover:bg-muted group-hover:shadow-md  group-hover:rounded-md p-2 ${isActive && "bg-white shadow-md  rounded-md "}`}>
                <Icon className={` ${isActive && `text-[#a570ff] ${customCss} `}`} />
            </div> 
            <span className="text-xs -mt-2  ">{label}</span>
        </Button>
    )
}

export default SideBarItems