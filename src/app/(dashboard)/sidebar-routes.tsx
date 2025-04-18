"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Crown, Home, MessageCircleQuestion } from "lucide-react"
import { FaCrown } from "react-icons/fa";
import SidebarItem from "./sidebar-item"
import { usePathname } from "next/navigation"
import { FaRegCreditCard } from "react-icons/fa";
import { RiInboxArchiveLine } from "react-icons/ri";
import { useCheckout } from "@/features/editor/hooks/useCheckout"
import { useBilling } from "@/features/editor/hooks/useBilling"
import usePaywall from "@/features/editor/hooks/usePaywall"
import { LuLayoutTemplate } from "react-icons/lu";

const SidebarRoutes = ()=>{
    const pathname = usePathname()
    const mutation = useCheckout()
    const { shouldBlock, triggerPaywall, isLoading } = usePaywall();
    const billingMutation = useBilling();

    const onClick = () => {
        if (shouldBlock) {
        triggerPaywall();
        return;
        }

        billingMutation.mutate();
    };

    return(
        <div>
            {shouldBlock && !isLoading && (
                <>
                    <div className="px-2">
                        <Button
                            onClick={()=>mutation.mutate()}
                            className="flex w-full rounded-lg hover:bg-white hover:opacity-75 transition"
                            variant="outline"
                            disabled={mutation.isPending}
                        >
                            <FaCrown size={10} className="fill-yellow-500 text-yellow-500" />
                            <div>Upgrade to PixelForge Pro</div>
                        </Button>
                    </div>
                    <div className="py-3">
                        <Separator />
                    </div>
                </>
            )}
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
                    href="/templates"
                    icon={LuLayoutTemplate}
                    label="Templates "
                />
                <SidebarItem
                    href="/archive"
                    icon={RiInboxArchiveLine}
                    label="Archive "
                />
                <SidebarItem
                    href={pathname}
                    icon={FaRegCreditCard}
                    label="Billing"
                    onClick={onClick}
                />
                <SidebarItem
                    href="mailto:kiyaranandi02@gmail.com"
                    icon={MessageCircleQuestion}
                    label="Get help "
                />
            </ul>
        </div>
    )
}

export default SidebarRoutes