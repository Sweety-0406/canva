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
import { Button } from "@/components/ui/button";
import useFailedModal from "../hooks/useFailedModal";
import { useRouter } from "next/navigation";
import useSuccessModal from "../hooks/uesSuccessModal";

export const SuccessModal = () => {
  const router = useRouter()
  const { isOpen, onClose } = useSuccessModal();

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
            Subscription successfull !
          </DialogTitle>
          <DialogDescription className="text-center">
            You are successfully  subscribed to our service
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
