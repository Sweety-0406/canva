import { useState } from "react";
import { ActiveTool, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import usePaywall from "../hooks/usePaywall";
import ToolSidebarHeader from "./tool-sidebar-header";
import toast from "react-hot-toast";
import axios from "axios";

interface AiSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

const AiSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: AiSidebarProps) => {
  const { shouldBlock, triggerPaywall } = usePaywall();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);


    try {
        const response = await axios.post("/api/ai", { prompt: value }, {
            headers: {
                "Content-Type": "application/json",
            }
        });


        editor?.addImage(response.data.image);
        console.log(response.data.image)
    } catch (err) {
        toast.error("Somethign went wrong");
        
    } finally {
        setLoading(false);
    }
  };

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "ai" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        onClose={onClose}
        title="AI"
        description="Generate an image using AI"
      />
      <ScrollArea>
        <form onSubmit={onSubmit} className="p-4 space-y-6">
          <Textarea
            disabled={loading}
            placeholder="An astronaut riding a horse on mars, hd, dramatic lighting"
            cols={30}
            rows={10}
            required
            minLength={3}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            disabled={loading}
            variant="purple"
            type="submit"
            className="w-full"
          >
            Generate
          </Button>
        </form>
      </ScrollArea>
    </aside>
  );
};


export default AiSidebar