"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useEditor } from "../hooks/useEditor";
import { fabric } from "fabric";
import { debounce } from "lodash";

import SideBar from "./sideBar";
import Navbar from "./navbar";
import Toolbar from "./toolbar";
import Footer from "./footer";
import {
  ActiveTool,
  KEYS,
  projectType,
  selectionDependentTools,
} from "../types";
import ShapeSidebar from "./shape-sidebar";
import FillColorSidebar from "./fill-color-sidebar";
import StrokeColorSidebar from "./stroke-color-sidebar";
import StrokeWidthSidebar from "./stroke-width-sidebar";
import TextSidebar from "./text-sidebar";
import FontSidebar from "./font-sidebar";
import ImageSidebar from "./image-sidebar";
import RemoveBgSidebar from "./remove-bg-sidebar";
import TemplateSidebar from "./template-sidebar";
import TextAlignSidebar from "./text-align-sidebar";
import ShadowColorSidebar from "./shadow-color-sidebar";
import FilterSidebar from "./filter-sidebar";
import DrawSidebar from "./draw-sidebar";
import SettingSidebar from "./setting-sidebar";
import AiSidebar from "./ai-sidebar";
import { useUpdateProject } from "../hooks/useUpdateProject";
import MakePrivateModal from "./makePrivateModal";
import RemovePrivateModal from "./remokePrivateModal";
import ChangeFileNameModal from "./changeFileNameModal";
import { AnimatePresence } from "framer-motion";
import StickerSidebar from "./sticker-sidebar";
import { FaPlus } from "react-icons/fa";
import { projectJson } from "../types";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {PageBar} from "./pageBar";

interface EditorProps {
  initialData: projectType;
}

export const Editor = ({ initialData }: EditorProps) => {
  const projectId = initialData.id;
  const [isPrivate, setIsPrivate] = useState(initialData.isPrivate);
  const [fileName, setFileName] = useState(initialData.name);
  const [isLoading, setIsLoading] = useState(false)
  const[isDelete, setIsDelete] = useState(false)
  const [isPending, startTransition] = useTransition();

  // Normalize json data into array of strings
  const normalizedPageData = useRef<projectJson[]>(
    Array.isArray(initialData.jsons) ? initialData.jsons : [initialData.jsons]
  );
  const pageDataRef = useRef<projectJson[]>([...normalizedPageData.current]);

  const [activeTool, setActiveTool] = useState<ActiveTool>("select");
  const [activeInd, setActiveInd] = useState<number>(0);

  console.log("normalizedPageData",normalizedPageData)

  const { mutate } = useUpdateProject(projectId);

  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);
  const { 
    init, 
    editor, 
    save,
    undo,
    redo,
    canRedo,
    canUndo,
    setActivePage } = useEditor({
      defaultState: normalizedPageData.current[0].json,
      defaultWidth: initialData.width,
      defaultHeight: initialData.height,
      clearSelectionCallback: onClearSelection,
      saveCallback: () => debouncedSave(pageDataRef.current[activeInd].json),
      initialPageId: normalizedPageData.current[0].id,
    });


  const debouncedSave = useCallback(
    debounce((jsonArray: string) => {
      mutate({
        json: jsonArray,
        // height: editor?.getWorkspace()?.height || initialData.height,
        // width: editor?.getWorkspace()?.width || initialData.width,
        // height: editor?.canvas.getHeight() || initialData.height,
        // width: editor?.canvas.getWidth() || initialData.width,
        height: initialData.height,
        width: initialData.width,
        index: activeInd
      });
    }, 500),
    [mutate, editor]
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef(null);

  const addPage = async () => {
    if (!editor) return;

    setIsLoading(true);
    await save();
    const currentJson = JSON.stringify(editor.canvas.toJSON(KEYS));
    pageDataRef.current[activeInd].json = currentJson;


    const clipObject = editor.canvas.getObjects().find((obj) => obj.name === "clip");
    if (!clipObject) {
      toast.error("Workspace (clip) not found");
      return;
    }


    const blankWithClipJson = JSON.stringify({
      version: "5.3.0",
      objects: [clipObject.toObject(['name'])],
    });


    const newInd = pageDataRef.current.length + 1;
    const addedJsonData= await axios.post(
      `/api/projects/${projectId}/addJson`,
      { json: blankWithClipJson, index: newInd }
    );

    if (!addedJsonData) {
      toast.error("Something went wrong.");
      return;
    }

    console.log("added new page:", addedJsonData.data.data.id)
    pageDataRef.current.push(addedJsonData.data.data);
    setActiveInd(newInd - 1);
    setActivePage(newInd - 1, addedJsonData.data.data.id);

    editor.canvas.off("object:removed");
    editor.canvas.off("object:added");
    editor.canvas.off("object:modified");

    editor.canvas.getObjects().forEach((obj) => {
      if (obj.name !== "clip") editor.canvas.remove(obj);
    });
    editor.canvas.renderAll();

    await save();

    editor.canvas.on("object:removed", () => save());
    editor.canvas.on("object:added", () => save());
    editor.canvas.on("object:modified", () => save());
    setIsLoading(false);
  };

  const onClickPage = async (i: number, id:string) => {
    console.log(i)
    if (!editor || i === activeInd) return;
    await save()
    const currentJson = JSON.stringify(editor.canvas.toJSON(KEYS));
    pageDataRef.current[activeInd].json = JSON.stringify(currentJson);
    console.log(i)
    const targetJsonString = pageDataRef.current[i].json;

    if (targetJsonString) {
      setActiveInd(i);
      setActivePage(i,id);
      editor.canvas.off("object:removed");
      editor.canvas.off("object:added");
      editor.canvas.off("object:modified");      
      editor.canvas.clear().renderAll();

      editor.loadFromJSON(targetJsonString);
      
      editor.canvas.on("object:removed", () => save());
      editor.canvas.on("object:added", () => save());
      editor.canvas.on("object:modified", () => save());
    }
  };


  const deletePage = async (index: number) => {
    if (pageDataRef.current.length <= 1) {
      toast.error("At least one page must be present.");
      return;
    }
    const confirmDelete = confirm(`Are you sure you want to delete page ${index+1 }?`);
    if (!confirmDelete) return;
    setIsDelete(true)
    try {
      
      await axios.delete(`/api/projects/${projectId}/deleteJson`, {
        data: { pageId: pageDataRef.current[index].id },
      });

      pageDataRef.current.splice(index, 1);

      const newActiveInd = index === 0 ? 0 : index - 1;
      const newJson = pageDataRef.current[newActiveInd]?.json;
      startTransition(()=>{
        setActiveInd(newActiveInd);
        setActivePage(newActiveInd, pageDataRef.current[newActiveInd].id);
  
        if (newJson && editor) {
          editor.canvas.off("object:removed");
          editor.canvas.off("object:added");
          editor.canvas.off("object:modified");
  
          editor.canvas.clear().renderAll();
          editor.loadFromJSON(newJson);
  
          editor.canvas.on("object:removed", () => save());
          editor.canvas.on("object:added", () => save());
          editor.canvas.on("object:modified", () => save());
        }
      })

      toast.success("Page deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete page.");
    }
    setIsDelete(false)
  };


  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === "draw") editor?.enableDrawing();
      if (activeTool === "draw") editor?.disableDrawing();

      if (tool === activeTool) return setActiveTool("select");
      setActiveTool(tool);
    },
    [activeTool, editor]
  );

  useEffect(() => {
    if (editor?.selectedObjects.length === 0) {
      setActiveTool("select");
    }
  }, [editor?.selectedObjects]);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });

    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className="flex overflow-hidden flex-col w-full h-full">
      <Navbar
        name={fileName}
        isPrivate={isPrivate}
        editor={editor}
        id={projectId}
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
      />
      <div className="flex w-full top-12 absolute h-[calc(100%-48px)] bg-muted">
        <ChangeFileNameModal fileName={fileName} setFileName={setFileName} projectId={projectId} />
        <MakePrivateModal setIsPrivate={setIsPrivate} projectId={projectId} />
        <RemovePrivateModal setIsPrivate={setIsPrivate} projectId={projectId} />
        <SideBar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <AnimatePresence mode="wait">
          {activeTool === "text" && <TextSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "shadow" && <ShadowColorSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "stroke-width" && <StrokeWidthSidebar editor={editor} activeTool={activeTool} />}
          {activeTool === "stroke-color" && <StrokeColorSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "shapes" && <ShapeSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "stickers" && <StickerSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "textAlign" && <TextAlignSidebar onChangeActiveTool={onChangeActiveTool} editor={editor} activeTool={activeTool} />}
          {activeTool === "fill" && <FillColorSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "font" && <FontSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "remove-bg" && <RemoveBgSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "images" && <ImageSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "templates" && <TemplateSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "filter" && <FilterSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "draw" && <DrawSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "settings" && <SettingSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "ai" && <AiSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
        </AnimatePresence>
        <main className="flex-1 flex flex-col relative bg-muted overflow-x-auto">
          <Toolbar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
          <div className="flex-1 overflow-y-hidden h-full bg-muted" ref={containerRef}>
            <canvas ref={canvasRef} />
          </div>
          <div className="flex justify-center -mt-4 ">
            <div>
              <PageBar 
                pageData={pageDataRef.current} 
                activeInd={activeInd} 
                onClickPage={onClickPage} 
                pageDeleteHandler={deletePage}
                isDelete = {isDelete}
              />
            </div>
          </div>
          <div className="flex justify-center mb-2">
            <Button
              disabled={isLoading}
              className="rounded-md mt-1 h-10 w-72 flex font-bold text-lg justify-center items-center bg-[#8B3DFF] hover:bg-[#7731d8]"
              onClick={addPage}
            >
              <FaPlus className="text-white" /> Add Page 
            </Button>
          </div>
          <Footer editor={editor} />
        </main>
      </div>
    </div>
  );
};