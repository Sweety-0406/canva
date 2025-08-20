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

export const SubscriptionModal = () => {
  const mutation = useCheckout();
  const { isOpen, onClose, pay } = useSubscriptionModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent >
        <DialogHeader className="flex items-center space-y-4">
          <Image className="-mb-10 "
            src="/logo.png"
            alt="Logo"
            width={130}
            height={130}
          />
          <DialogTitle className="text-center">
            Upgrade to PixelForge pro
          </DialogTitle>
          <DialogDescription className="text-center">
            PixelForge Pro has all the tools you need to design graphics for any project.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <ul className="space-y-2">
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-[#8B3DFF] text-white" />
            <p className="text-sm text-muted-foreground">
              Unlimited projects
            </p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-[#8B3DFF] text-white" />
            <p className="text-sm text-muted-foreground">
              Unlimited templates
            </p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-[#8B3DFF] text-white" />
            <p className="text-sm text-muted-foreground">
              AI background remover
            </p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 fill-[#8B3DFF] text-white" />
            <p className="text-sm text-muted-foreground">
              AI image generation
            </p>
          </li>
        </ul>
        <DialogFooter className="pt-2 mt-4 gap-y-2">
          <Button
            variant="purple"
            className="w-full"
            onClick={() => mutation.mutate(pay)}
            disabled={mutation.isPending}
          >
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
