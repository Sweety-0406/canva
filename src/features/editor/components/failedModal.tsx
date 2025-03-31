"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import useSubscriptionModal from "../hooks/useSubscriptions";
import { useCheckout } from "../hooks/useCheckout";
import useFailedModal from "../hooks/useFailedModal";
import { useRouter } from "next/navigation";

export const FailedModal = () => {
  const router = useRouter()
  const { isOpen, onClose } = useFailedModal();

  const handleClose = ()=>{
    router.push('/')
    onClose()
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent >
        <DialogHeader className="flex items-center space-y-4">
          <Image className="-mb-10 "
            src="/logo.png"
            alt="Logo"
            width={130}
            height={130}
          />
          <DialogTitle className="text-center">
            Something went wrong
          </DialogTitle>
          <DialogDescription className="text-center">
            We could not process your payment
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2 mt-4 gap-y-2">
          <Button
            variant="purple"
            className="w-full"
            onClick={handleClose}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
