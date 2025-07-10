"use client"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SideBarItemsProps{
    label:string,
    icon:LucideIcon,
    isActive: boolean,
    onClick:()=>void,
    customCss?:string,
    textColor:string
}

const SideBarItems = ({
    label,
    icon: Icon,
    isActive,
    onClick,
    customCss,
    textColor
}:SideBarItemsProps)=>{
    const getHoverTextColor = (textColor: string) => {
        switch (textColor) {
            case "text-[#ff643d]": return "group-hover:text-[#ff643d]";
            case "text-[#50ff3d]": return "group-hover:text-[#50ff3d]";
            case "text-[#3ddbff]": return "group-hover:text-[#3ddbff]";
            case "text-[#a570ff]": return "group-hover:text-[#a570ff]";
            case "text-[#ffef3d]": return "group-hover:text-[#ffef3d]";
            case "text-[#63ad08]": return "group-hover:text-[#63ad08]";
            case "text-[#ff3dd2]": return "group-hover:text-[#ff3dd2]";
            case "text-[#4d3dff]": return "group-hover:text-[#4d3dff]";
            default: return "";
        }
    };
    return(
        <Button 
            variant="none"
            onClick={onClick}
            className={cn(
                " w-full group h-full rounded-none flex flex-col",
                !isActive && `bg-transparent text-[#180e15b2] `                   
            )}  
        >
            <div className={`group-hover:bg-white group-hover:shadow-md  group-hover:rounded-md p-2 ${isActive && "bg-white shadow-md rounded-md "}`}>
                <Icon className={cn(
                isActive && `${textColor} ${customCss}`,
                getHoverTextColor(textColor)
                )} />
            </div>
            <span className={cn(
                "text-sm -mt-2 group-hover:font-semibold",
                isActive && `font-semibold ${textColor}`,
                getHoverTextColor(textColor)
            )}>
                {label}
            </span> 
        </Button>
    )
}

export default SideBarItems