
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
import TextSidebar from "./text-sidebar";
import FontSidebar from "./font-sidebar";
import ImageSidebar from "./image-sidebar";
import RemoveBgSidebar from "./remove-bg-sidebar";
import TemplateSidebar from "./template-sidebar";
import ShadowColorSidebar from "./shadow-color-sidebar";
import FilterSidebar from "./filter-sidebar";
import DrawSidebar from "./draw-sidebar";
import SettingSidebar from "./setting-sidebar";
import AiSidebar from "./ai-sidebar";
import { useUpdateProject } from "../hooks/useUpdateProject";
import MakePrivateModal from "./makePrivateModal";
import RemovePrivateModal from "./remokePrivateModal";
import { AnimatePresence } from "framer-motion";
import StickerSidebar from "./sticker-sidebar";
import { FaPaintRoller, FaPlus } from "react-icons/fa";
import { CgFileAdd } from "react-icons/cg";
import { PiResizeFill } from "react-icons/pi";
import { TbCopyPlus,TbPageBreak } from "react-icons/tb";
import { RiDeleteBin2Line } from "react-icons/ri";
import { projectJson } from "../types";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {PageBar} from "./pageBar";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { MdContentCopy } from "react-icons/md";
import { useEvent } from "react-use";

interface EditorProps {
  initialData: projectType;
}

export const Editor = ({ initialData }: EditorProps) => {
  const projectId = initialData.id;
  const [isPrivate, setIsPrivate] = useState(initialData.isPrivate);
  const fileName = initialData.name
  const [isAdding, setIsAdding] = useState(false)
  const[isDelete, setIsDelete] = useState(false)
  const [, startTransition] = useTransition();

  // Normalize json data into array of strings
  const normalizedPageData = useRef<projectJson[]>(
    Array.isArray(initialData.jsons) ? initialData.jsons : [initialData.jsons]
  );
  const pageDataRef = useRef<projectJson[]>([...normalizedPageData.current]);

  const [activeTool, setActiveTool] = useState<ActiveTool>("select");
  const [activeInd, setActiveInd] = useState<number>(0);


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
    canPaste,
    setActivePage,
    activePageIndex } = useEditor({
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

    setIsAdding(true);
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
    setIsAdding(false);
  };


  const duplicatePage = async () => {
    if (!editor) return;

    setIsAdding(true);
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
    editor.loadFromJSON(currentJson)

    await save();

    editor.canvas.on("object:removed", () => save());
    editor.canvas.on("object:added", () => save());
    editor.canvas.on("object:modified", () => save());
    setIsAdding(false);
  };


  const onClickPage = async (i: number, id:string) => {
    if (!editor || i === activeInd) return;
    await save()
    const currentJson = JSON.stringify(editor.canvas.toJSON(KEYS));
    pageDataRef.current[activeInd].json = JSON.stringify(currentJson);
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
    } catch{
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


  const saveAsPdf = ()=>{
    const workSpace = editor?.getWorkspace();
    if(!editor || !workSpace) return
    // const width = workSpace.width || initialData.width 
    // const height = workSpace.height || initialData.height
    const width = workSpace.width  
    const height = workSpace.height 
    if(!width || ! height) return
    const currentJson = JSON.stringify(editor.canvas.toJSON(KEYS));
    pageDataRef.current[activeInd].json = JSON.stringify(currentJson);
    editor.savePdf(pageDataRef.current, {width: width, height:height})
  }
 
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

  useEvent("keydown", (e)=>{
    const isCtrlKey = e.ctrlKey || e.metaKey

    if(isCtrlKey && e.key === "d"){
      e.preventDefault()
      duplicatePage()
    }
    if(isCtrlKey && e.key === "A"){
      e.preventDefault()
      addPage()
    }
    if(isCtrlKey && e.key === "b"){
      e.preventDefault()
      editor?.changeBackground("#FFFFFF")
    }
    if(e.key === "Delete"){
      e.preventDefault()
      if(isDelete) return
      deletePage(activePageIndex)
    }
  })

  return (
    <div className="flex overflow-hidden flex-col w-full h-full">
      <Navbar
        projectId={projectId}
        name={fileName}
        isPrivate={isPrivate}
        editor={editor}
        activeTool={activeTool}
        onChangeActiveTool={onChangeActiveTool}
        saveAsPdf={saveAsPdf}
      />
      <div className="flex w-full top-12 absolute h-[calc(100%-48px)] bg-muted">
        <MakePrivateModal setIsPrivate={setIsPrivate} projectId={projectId} />
        <RemovePrivateModal setIsPrivate={setIsPrivate} projectId={projectId} />
        <SideBar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <AnimatePresence mode="wait">
          {activeTool === "text" && <TextSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "shadow" && <ShadowColorSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "stroke-color" && <StrokeColorSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "shapes" && <ShapeSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "stickers" && <StickerSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "fill" && <FillColorSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "font" && <FontSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "remove-bg" && <RemoveBgSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "images" && <ImageSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "templates" && <TemplateSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "filter" && <FilterSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "draw" && <DrawSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
          {activeTool === "settings" && <SettingSidebar editor={editor} onChangeActiveTool={onChangeActiveTool}  />}
          {activeTool === "ai" && <AiSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />}
        </AnimatePresence>
        <main className="flex-1 flex flex-col relative bg-muted overflow-x-auto">
          <Toolbar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
          <div className="flex-1 overflow-y-hidden overflow-x-hidden h-full bg-muted" ref={containerRef}>
            <ContextMenu>
              <ContextMenuTrigger className="flex items-center justify-center  text-sm">
                <canvas ref={canvasRef} />
              </ContextMenuTrigger>
              <ContextMenuContent className="w-52">
                <ContextMenuItem  onClick={()=>editor?.onCopyPage()} inset> 
                  <MdContentCopy className="mr-2" /> Copy
                  <ContextMenuShortcut className="bg-muted rounded-sm p-1">ctrl+C</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem disabled={!canPaste()}  onClick={()=>editor?.onPaste()} inset >
                  <FaPaintRoller  className="mr-2"/> Paste
                  <ContextMenuShortcut>ctrl+v</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={addPage} disabled={isAdding} inset>
                  <CgFileAdd  className="mr-2"/> Add page
                  <ContextMenuShortcut>ctrl+A</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={()=>setActiveTool("settings")} inset>
                  <PiResizeFill className="mr-2" /> Resize page
                  <ContextMenuShortcut>ctrl+R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={duplicatePage} inset>
                  <TbCopyPlus className="mr-2" /> Duplicate page
                  <ContextMenuShortcut>ctrl+d</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem  onClick={()=>editor?.changeBackground("#FFFFFF")} disabled={isDelete} inset>
                  <RiDeleteBin2Line className="mr-2" /> Delete bg 
                  <ContextMenuShortcut  >ctrl+b</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem onClick={()=>deletePage(activePageIndex)} disabled={isDelete} inset>
                  <TbPageBreak  className="mr-2" /> Delete page
                  <ContextMenuShortcut>DELETE</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            
          </div>
          <div className="flex w-full  justify-center -mt-4 ">
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
          <div className="flex w-full  justify-center mb-2">
            <Button
              disabled={isAdding}
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