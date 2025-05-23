import { useState } from "react";
import { ActiveTool, Editor } from "@/features/editor/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import ToolSidebarHeader from "./tool-sidebar-header";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";

interface AiSidebarProps {
  editor: Editor | undefined;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

const AiSidebar = ({
  editor,
  onChangeActiveTool,
}: AiSidebarProps) => {
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
    } catch {
      toast.error("Somethign went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <motion.div
      // className={cn(
      //   "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
      //   activeTool === "ai" ? "visible" : "hidden",
      // )}
      initial={{ opacity: 0, x: -240 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -240 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-white border-r absolute z-40 h-full left-16"
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
    </motion.div>
  );
};


export default AiSidebar