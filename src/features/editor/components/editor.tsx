"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "../hooks/useEditor";
import  {fabric}  from "fabric";

import SideBar from "./sideBar"; 
import Navbar from "./navbar";
import Toolbar from "./toolbar";
import Footer from "./footer";
import { ActiveTools } from "../types";
import ShapeSidebar from "./shape-sidebar";


export const Editor = () => {
  const [activeTools, setActiveTools] = useState<ActiveTools>("select")

  const onChangeActiveTools = useCallback((tool: ActiveTools)=>{
    if(tool === activeTools){
      return setActiveTools("select")
    }
    setActiveTools(tool)
  },[activeTools])
  const { init,editor  } = useEditor();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef(null);

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
      <Navbar activeTools={activeTools} onChangeActiveTools={onChangeActiveTools} />
      <div className="flex w-full top-12 absolute h-[calc(100%-48px)] bg-muted" >
        <SideBar activeTools={activeTools} onChangeActiveTools={onChangeActiveTools} />
        <ShapeSidebar editor={editor} activeTools={activeTools} onChangeActiveTools={onChangeActiveTools} />
        <main className="flex-1  flex flex-col relative bg-muted overflow-x-auto">
          <Toolbar />
          <div className="flex-1 overflow-y-hidden h-full bg-muted" ref={containerRef}>
            <canvas ref={canvasRef}/>
          </div> 
          <Footer />
        </main>
      </div> 
    </div> 
  );
};
 