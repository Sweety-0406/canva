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
import ChatSection from "./chatSection";
import { FaProjectDiagram } from "react-icons/fa";
import { useGetSubscription } from "@/features/editor/hooks/useGetSubscription"
import toast from "react-hot-toast"
import { useGetUser } from "@/features/editor/hooks/useGetUser"
import { useQueryClient } from "@tanstack/react-query"


const SidebarRoutes = ()=>{
    const pathname = usePathname()
    const mutation = useCreateProject();
    const { shouldBlock, triggerPaywall } = usePaywall();
    const billingMutation = useBilling();
    const router = useRouter()
    const{data: subscription, isLoading} = useGetSubscription()
    const { data: user, isLoading: isUserLoading } = useGetUser();
    const queryClient = useQueryClient();
    const maxProjects = user?.totalProjects ?? 5;
    const remaining = (5 - maxProjects);

    const onClick = () => {
        if (shouldBlock) {
        triggerPaywall();
        return;
        }

        billingMutation.mutate();
    };

    const onClickCreatHandler = async () => {
        if(!isLoading && !isUserLoading && !subscription?.status && user?.totalProjects === 5){
            toast.error("You have reached the limit. Please upgrade to continue")
            return;
        }        
        mutation.mutate(
        {
            name: "Untitled Project",
            json: "",
            width: 500,
            height: 700,
        },
        {
            onSuccess: ({ data }) => {
                queryClient.invalidateQueries({ queryKey: ["user"] });
                router.push(`/editor/${data.id}`);
            },
        }
        );
    };

    return( 
        <div>
            <div className="block lg:hidden px-1 border-t">
                <div className="my-2 hover:text-white ">
                    <Button
                        disabled={mutation.isPending ||isLoading}
                        onClick={onClickCreatHandler}
                        className="flex relative hover:text-white text-white w-full rounded-lg bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7]  hover:opacity-75  transition"
                        variant="outline"
                        title="Start New Design"
                    >
                        <div className="flex gap-2 hover:text-white"> <span><HiPlus /></span></div>
                        {!isLoading && !subscription?.status && 
                            <div className="absolute size-5 flex justify-center items-center -top-2 -left-1 bg-rose-500 rounded-full p-1 text-white">{remaining}</div>
                        }
                    </Button>
                </div>
                <ul className="flex flex-col gap-y-2">
                    <button
                        title="Home"
                    >
                        <SidebarItem
                            href="/"
                            icon={Home}
                            isActive={pathname === "/"}
                        />
                    </button>

                    <button
                        title="Templates"
                    >
                        <SidebarItem
                            href="/templates"
                            icon={LuLayoutTemplate}
                            isActive={pathname === "/templates"}
                        />
                    </button>

                    <button
                        title="My projects"
                    >
                        <SidebarItem
                            href="/projects"
                            icon={FaProjectDiagram }
                            isActive={pathname === "/projects"}
                        />
                    </button>

                    <button
                        title="Archive"
                    > 
                        <SidebarItem
                            href="/archive"
                            icon={RiInboxArchiveLine}
                            isActive={pathname === "/archive"}
                        />
                    </button>

                    <button
                        title="Billing"
                    > 
                        <SidebarItem
                            href={pathname}
                            icon={FaRegCreditCard}
                            onClick={onClick}
                        />
                    </button>

                    <button
                        title="Get help"
                    >
                        <SidebarItem
                            href="mailto:kiyaranandi02@gmail.com"
                            icon={MessageCircleQuestion}
                        />
                    </button>
                </ul>
                <ChatSection />
            </div>
            <div className="hidden lg:block">
                <div className="px-2 group ">
                    <Button
                        disabled={mutation.isPending || isLoading }
                        onClick={onClickCreatHandler}
                        className="flex  text-white hover:text-white  w-full rounded-lg bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7]  hover:opacity-75  transition"
                        variant="outline"
                    >
                        <div className="flex gap-2 group-hover:text-white"> <span><HiPlus /></span> Start new design {!isLoading && !subscription?.status && (<span className="text-rose-500 mt-[2px]">({remaining})</span>)}</div>
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
                        href="/projects"
                        icon={FaProjectDiagram }
                        label="My projects "
                        isActive={pathname === "/projects"}
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