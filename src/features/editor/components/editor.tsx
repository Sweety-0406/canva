"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "../hooks/useEditor";
import  {fabric}  from "fabric";
import { debounce } from "lodash";

import SideBar from "./sideBar"; 
import Navbar from "./navbar";
import Toolbar from "./toolbar";
import Footer from "./footer";
import { ActiveTool, projectType, selectionDependentTools } from "../types";
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

interface EditorProps{
  initialData: projectType
}

export const Editor = ({initialData}: EditorProps) => {
  const projectId = initialData.id
  const [isPrivate, setIsPrivate] = useState(initialData.isPrivate);
  const [fileName, setFileName] = useState(initialData.name)
  const {mutate} = useUpdateProject(projectId)
  const debouncedSave = useCallback(debounce((values: {
    json: string,
    height: number,
    width: number
  })=>{
    console.log("save")
    mutate(values)
  }, 500),[mutate])

  const [activeTool, setActiveTool] = useState<ActiveTool>("select")
  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);
  // const { init, editor, loadFont } = useEditor({
  const { init, editor } = useEditor({
    defaultState: initialData.json,
    defaultWidth: initialData.width,
    defaultHeight: initialData.height,
    clearSelectionCallback: onClearSelection,
    saveCallback: debouncedSave
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef(null);

  const onChangeActiveTool = useCallback((tool: ActiveTool)=>{
    if(tool==="draw"){
      console.log("draw")
      editor?.enableDrawing()
    }
    if(activeTool==="draw"){
      editor?.disableDrawing()
    }
    if(tool === activeTool){
      return setActiveTool("select")
    }
    setActiveTool(tool)
  },[activeTool, editor])



  useEffect(()=>{
    if(editor?.selectedObjects.length == 0){
      return setActiveTool("select")
    }
  },[editor?.selectedObjects])

  useEffect(() => {
      const canvas = new fabric.Canvas(canvasRef.current, {
        controlsAboveOverlay: true,
        preserveObjectStacking: true,
      });

      init({
        initialCanvas: canvas,
        initialContainer: containerRef.current!,
      });
      return()=>{
        canvas.dispose()
      }
  }, [init]); 

  return (
    <div className="flex overflow-hidden  flex-col w-full h-full">
      <Navbar name={fileName} isPrivate={isPrivate} editor={editor} id={projectId} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className="flex w-full top-12 absolute h-[calc(100%-48px)] bg-muted" >
        <ChangeFileNameModal fileName={fileName} setFileName={setFileName} projectId={projectId}/>
        <MakePrivateModal setIsPrivate={setIsPrivate} projectId={projectId}/>
        <RemovePrivateModal setIsPrivate={setIsPrivate} projectId={projectId}/>
        <SideBar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <AnimatePresence mode="wait">
          {activeTool === "text" && (
            <TextSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
          )}
          {activeTool === "shadow" && (
            <ShadowColorSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
          )}
          {activeTool === "stroke-width" && (
            <StrokeWidthSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
          )}
          {activeTool === "stroke-color" && (
            <StrokeColorSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
          )}
          {activeTool === "shapes" && (
            <ShapeSidebar key="shape-sidebar" editor={editor} onChangeActiveTool={onChangeActiveTool} />
          )}
          {activeTool === "textAlign" && (
            <TextAlignSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
          )}
          {activeTool === "fill" && (
            <FillColorSidebar editor={editor}  onChangeActiveTool={onChangeActiveTool} />
          )}
          {activeTool === "font" && (
            <FontSidebar editor={editor}  onChangeActiveTool={onChangeActiveTool} />
            // <FontSidebar editor={editor}  onChangeActiveTool={onChangeActiveTool} loadFont={loadFont}/>
          )}
          {activeTool === "remove-bg" && (
            <RemoveBgSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
          )}
          {activeTool === "images" && (
            <ImageSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
          )}
          {activeTool === "templates" && (
            <TemplateSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
          )}
          {activeTool === "filter" && (
            <FilterSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
          )}
          {activeTool === "draw" && (
            <DrawSidebar editor={editor}  onChangeActiveTool={onChangeActiveTool} />
          )}
          {activeTool === "settings" && (
            <SettingSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
          )}
          {activeTool === "ai" && (
            <AiSidebar editor={editor}  onChangeActiveTool={onChangeActiveTool} />
          )}
        </AnimatePresence>
        <main className="flex-1  flex flex-col relative bg-muted overflow-x-auto">
          <Toolbar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
          <div className="flex-1 overflow-y-hidden h-full bg-muted" ref={containerRef}>
            <canvas ref={canvasRef}/>
          </div> 
          <Footer editor={editor}/>
        </main>
      </div> 
    </div> 
  );
};
 
