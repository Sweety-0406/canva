"use client"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SideBarItemsProps{
    label:string,
    icon:LucideIcon,
    isActive: boolean,
    onClick:()=>void
}

const SideBarItems = ({
    label,
    icon: Icon,
    isActive,
    onClick
}:SideBarItemsProps)=>{
    return(
        <Button 
            variant="ghost"
            onClick={onClick}
            className={cn(
                " w-full h-full rounded-none p-3 py-2 flex flex-col",
                isActive?"bg-muted  text-primary":"bg-transparent"                    
            )}
        >
            <Icon />
            <span className="text-xs -mt-2  ">{label}</span>
        </Button>
    )
}

export default SideBarItems