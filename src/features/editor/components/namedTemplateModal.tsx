// "use client";

// import Image from "next/image";
// import { CheckCircle2 } from "lucide-react";


// import {
//   Dialog,
//   DialogTitle,
//   DialogHeader,
//   DialogContent,
// } from "@/components/ui/dialog";
// import { Separator } from "@/components/ui/separator";
// import useGetTemplateModal from "../hooks/useGetTemplateModal";
// import Logo from "./logo";
// import TemplateSection from "@/app/(dashboard)/templateSection";
// import { ScrollArea } from "@/components/ui/scroll-area";

// export const NamedTemplateModal = () => {
//   const { isOpen, onClose, templateName } = useGetTemplateModal();

//   return (
//     <div className="lg:w-4/5">

//     <Dialog  open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="" >
//         <DialogHeader className="flex items-center mt-">
//           <Logo />
//           <DialogTitle className="text-center -mt-3">
//             {templateName.toWellFormed()} Templates 
//           </DialogTitle>
//         </DialogHeader>
//         <Separator />
//         <ScrollArea className="p- h-[65vh]" >
//           <TemplateSection page="1000"  show={false} templateNumber={12} templateName={templateName} />
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//     </div>

//   );
// };



"use client";

import Image from "next/image";
import { X } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import useGetTemplateModal from "../hooks/useGetTemplateModal";
import Logo from "./logo";
import TemplateSection from "@/app/(dashboard)/templateSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export const NamedTemplateModal = () => {
  const { isOpen, onClose, templateName } = useGetTemplateModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] bg-black/50 flex items-center justify-center ">
      <div
        className={cn(
          "relative w-full max-w-lg md:max-w-3xl bg-background rounded-lg shadow-lg p-6"
        )}
      >
        {/* Close Button */}
        <button
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center flex-col justify-center">
          <Logo />
          <h2 className="text-xl -mt-4 font-semibold">
            {templateName.toWellFormed()} Templates
          </h2>
        </div>

        <Separator className="my-4" />

        {/* Content */}
        <ScrollArea className="h-[65vh]">
          <TemplateSection
            page="1000"
            show={false}
            templateNumber={12}
            templateName={templateName}
          />
        </ScrollArea>
      </div>
    </div>
  );
};
