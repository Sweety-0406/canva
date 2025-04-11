import Image from "next/image";
import { AlertTriangle } from "lucide-react";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import usePaywall from "../hooks/usePaywall";
import ToolSidebarHeader from "./tool-sidebar-header";
import axios from "axios";
import { useState } from "react";

interface RemoveBgSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

const RemoveBgSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: RemoveBgSidebarProps) => {
  const { shouldBlock, triggerPaywall } = usePaywall();
  const [isLoading, setIsLoading] = useState(false)


  const selectedObject = editor?.selectedObjects[0];

  // @ts-ignore
  const imageSrc = selectedObject?._originalElement?.currentSrc;

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onClick = async () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }
    setIsLoading(true)
    try {
        const response = await axios.post("/api/images/remove-bg", { imageUrl: imageSrc });
        editor?.addImage(response.data.image);
    } catch (error) {
        console.error("Error removing background:", error);
    }
    setIsLoading(false)
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-64 h-full flex flex-col",
        activeTool === "remove-bg" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
      onClose={onClose}
        title="Background removal"
        description="Remove background from image using AI"
      />
      {!imageSrc && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Feature not available for this object
          </p>
        </div>
      )}
      {imageSrc && (
        <ScrollArea>
          <div className="p-4 space-y-4">
            <div className={cn(
              "relative aspect-square rounded-md overflow-hidden transition bg-muted",
            )}>
              <Image
                src={imageSrc}
                fill
                alt="Image"
                className="object-cover"
              />
            </div>
            <Button
              disabled={isLoading}
              variant="purple" 
              onClick={onClick}
              className="w-full"
            >
              Remove background
            </Button>
          </div>
        </ScrollArea>
      )}
    </aside>
  );
};

export default RemoveBgSidebar
