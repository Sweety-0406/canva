"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Home, MessageCircleQuestion } from "lucide-react"
import SidebarItem from "./sidebar-item"
import { usePathname, useRouter } from "next/navigation"
import { FaRegCreditCard } from "react-icons/fa";
import { RiInboxArchiveLine } from "react-icons/ri";
import { useBilling } from "@/features/editor/hooks/useBilling"
import usePaywall from "@/features/editor/hooks/usePaywall"
import { LuLayoutTemplate } from "react-icons/lu";
import { useCreateProject } from "@/features/editor/hooks/useCreateProject";
import { HiPlus } from "react-icons/hi";
import Hint from "@/features/editor/components/hint";
import ChatSection from "./chatSection";

const SidebarRoutes = ()=>{
    const pathname = usePathname()
    // const mutation = useCheckout()
    const mutation = useCreateProject();
    const { shouldBlock, triggerPaywall } = usePaywall();
    const billingMutation = useBilling();
    const router = useRouter()

    const onClick = () => {
        if (shouldBlock) {
        triggerPaywall();
        return;
        }

        billingMutation.mutate();
    };

    const onClickCreatHandler = async () => {
        mutation.mutate(
        {
            name: "Untitled Project",
            json: "",
            width: 500,
            height: 700,
        },
        {
            onSuccess: ({ data }) => {
                router.push(`/editor/${data.id}`);
            },
        }
        );
    };

    return( 
        <div>
            <div className="block lg:hidden px-1 border-t">
                <div className="my-2 ">
                    <Hint
                        label="Start New Design"
                        side="right"
                    >
                        <Button
                            disabled={mutation.isPending}
                            onClick={onClickCreatHandler}
                            className="flex text-white w-full rounded-lg bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7]  hover:opacity-75  transition"
                            variant="outline"
                        >
                            <div className="flex gap-2 hover:text-white"> <span><HiPlus /></span></div>
                        </Button>
                    </Hint>
                </div>
                <ul className="flex flex-col gap-y-2">
                    <Hint
                        label="Home"
                        side="right"
                    >
                        <SidebarItem
                            href="/"
                            icon={Home}
                            isActive={pathname === "/"}
                        />
                    </Hint>

                    <Hint
                        label="Templates"
                        side="right"
                    >
                        <SidebarItem
                            href="/templates"
                            icon={LuLayoutTemplate}
                            isActive={pathname === "/templates"}
                        />
                    </Hint>

                    <Hint
                        label="Archive"
                        side="right"
                    >
                        <SidebarItem
                            href="/archive"
                            icon={RiInboxArchiveLine}
                            isActive={pathname === "/archive"}
                        />
                    </Hint>

                    <Hint
                        label="Billing"
                        side="right"
                    >
                        <SidebarItem
                            href={pathname}
                            icon={FaRegCreditCard}
                            onClick={onClick}
                        />
                    </Hint>

                    <Hint
                        label="Get Help"
                        side="right"
                    >
                        <SidebarItem
                            href="mailto:kiyaranandi02@gmail.com"
                            icon={MessageCircleQuestion}
                        />
                    </Hint>
                </ul>
                <ChatSection />
            </div>
            <div className="hidden lg:block">
                <div className="px-2 ">
                    <Button
                        disabled={mutation.isPending}
                        onClick={onClickCreatHandler}
                        className="flex text-white w-full rounded-lg bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7]  hover:opacity-75  transition"
                        variant="outline"
                    >
                        <div className="flex gap-2 hover:text-white"> <span><HiPlus /></span> Start new design</div>
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
                    <SidebarItem
                        href="/templates"
                        icon={LuLayoutTemplate}
                        label="Templates "
                        isActive={pathname === "/templates"}
                    />
                    <SidebarItem
                        href="/archive"
                        icon={RiInboxArchiveLine}
                        label="Archive "
                        isActive={pathname === "/archive"}
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
                <ChatSection />
            </div>
        </div>
    )
}

export default SidebarRoutes