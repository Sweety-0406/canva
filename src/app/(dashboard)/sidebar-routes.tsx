"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Crown, Home, MessageCircleQuestion } from "lucide-react"
import SidebarItem from "./sidebar-item"
import { usePathname } from "next/navigation"
import { FaRegCreditCard } from "react-icons/fa";

const SidebarRoutes = ()=>{
    const pathname = usePathname()
    return(
        <div>
            <div className="px-2">
                <Button
                    onClick={()=>{}}
                    className="flex w-full rounded-lg hover:bg-white hover:opacity-75 transition"
                    variant="outline"
                >
                    <Crown size={10} className="fill-yellow-500 text-yellow-500" />
                    <div>Upgrade to Canva Pro</div>
                </Button>
            </div>
            <div className="py-3">
                <Separator />
            </div>
            <ul className="flex flex-col gap-y-1 px-2">
                <SidebarItem
                    href="/"
                    icon={Home}
                    label="Home"
                    isActive={pathname === "/"}
                />
            </ul>
            <div className="py-3">
                <Separator />
            </div>
            <ul className="flex flex-col gap-y-1 px-2">
                <SidebarItem
                    href={pathname}
                    icon={FaRegCreditCard}
                    label="Billing"
                    onClick={()=>{}}
                />
                <SidebarItem
                    href="mailto:kiyaranandi02@gmail.com"
                    icon={MessageCircleQuestion}
                    label="Get help "
                    onClick={()=>{}}
                />
            </ul>
        </div>
    )
}

export default SidebarRoutes