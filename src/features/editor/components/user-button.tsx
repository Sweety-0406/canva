"use client";

import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { Loader } from "lucide-react";
import { FaCrown } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaRegCreditCard } from "react-icons/fa";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import usePaywall from "../hooks/usePaywall";
import { useBilling } from "../hooks/useBilling";
import { useRouter } from "next/navigation";

const UserButton = () => {
  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();
  const mutation = useBilling();
  const session = useSession();
  const router = useRouter()

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }

    mutation.mutate();
  };

  if (session.status === "loading") {
    return <Loader className="size-4 animate-spin text-muted-foreground" />
  }

  if (session.status === "unauthenticated" || !session.data) {
    return null;
  }

  const name = session.data?.user?.name ?? "User";
  const imageUrl = session.data?.user?.image ?? "";
  
  const logoutHandler = ()=>{
    signOut()
    router.push("/landingPage")
  }
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        {!shouldBlock && !isLoading && (
          <div className="absolute -top-1 -left-1 z-10 flex items-center justify-center">
            <div className="rounded-full bg-white flex p-1 items-center justify-center p- drop-shadow-2xl">
              <FaCrown className="size-4  text-yellow-500 fill-yellow-500" />
            </div>
          </div>
        )}
        <Avatar className="size-10 hover:opcaity-75 transition">
          <AvatarImage alt={name} src={imageUrl || ""} />
          <AvatarFallback className="bg-[#9d3aed] font-medium text-white flex items-center justify-center">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent asChild align="end" className="w-60">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <DropdownMenuItem
            disabled={mutation.isPending}
            onClick={onClick}
            className="h-10"
          >
            <FaRegCreditCard className="size-4 mr-2" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="h-10" onClick={logoutHandler}>
            <FiLogOut  className="size-5 mr-2" />
            Log out
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton
