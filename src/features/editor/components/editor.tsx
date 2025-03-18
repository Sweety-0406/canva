"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "../hooks/useEditor";
import  {fabric}  from "fabric";

import SideBar from "./sideBar"; 
import Navbar from "./navbar";
import Toolbar from "./toolbar";
import Footer from "./footer";
import { ActiveTool } from "../types";
import ShapeSidebar from "./shape-sidebar";
import FillColorSidebar from "./fill-color-sidebar";
import StrokeColorSidebar from "./stroke-color-sidebar";
import StrokeWidthSidebar from "./stroke-width-sidebar";
import TextSidebar from "./text-sidebar";
import FontSidebar from "./font-sidebar";
import ImageSidebar from "./image-sidebar";
import TextAlignSidebar from "./text-align-sidebar";
import ShadowColorSidebar from "./shadow-color-sidebar";
import FilterSidebar from "./filter-sidebar";
import DrawSidebar from "./draw-sidebar";
import SettingSidebar from "./setting-sidebar";


export const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select")
  const { init, editor } = useEditor();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef(null);

  const onChangeActiveTool = useCallback((tool: ActiveTool)=>{
    if(tool==="draw"){
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
      // return()=>{
      //   canvas.dispose()
      // }
  }, [init]); 

  return (
    <div className="flex   flex-col w-full h-full">
      <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className="flex w-full top-12 absolute h-[calc(100%-48px)] bg-muted" >
        <SideBar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <ShapeSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <FillColorSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <StrokeColorSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <ShadowColorSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <StrokeWidthSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <TextSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <TextAlignSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <FontSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <ImageSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <FilterSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <DrawSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <SettingSidebar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
        <main className="flex-1  flex flex-col relative bg-muted overflow-x-auto">
          <Toolbar editor={editor} activeTool={activeTool} onChanveActiveTool={onChangeActiveTool} />
          <div className="flex-1 overflow-y-hidden h-full bg-muted" ref={containerRef}>
            <canvas ref={canvasRef}/>
          </div> 
          <Footer editor={editor}/>
        </main>
      </div> 
    </div> 
  );
};
 
