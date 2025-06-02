// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { useEditor } from "../hooks/useEditor";
// import  {fabric}  from "fabric";
// import { debounce } from "lodash";

// import SideBar from "./sideBar"; 
// import Navbar from "./navbar";
// import Toolbar from "./toolbar";
// import Footer from "./footer";
// import { ActiveTool, projectType, selectionDependentTools } from "../types";
// import ShapeSidebar from "./shape-sidebar";
// import FillColorSidebar from "./fill-color-sidebar";
// import StrokeColorSidebar from "./stroke-color-sidebar";
// import StrokeWidthSidebar from "./stroke-width-sidebar";
// import TextSidebar from "./text-sidebar";
// import FontSidebar from "./font-sidebar";
// import ImageSidebar from "./image-sidebar";
// import RemoveBgSidebar from "./remove-bg-sidebar";
// import TemplateSidebar from "./template-sidebar";
// import TextAlignSidebar from "./text-align-sidebar";
// import ShadowColorSidebar from "./shadow-color-sidebar";
// import FilterSidebar from "./filter-sidebar";
// import DrawSidebar from "./draw-sidebar";
// import SettingSidebar from "./setting-sidebar";
// import AiSidebar from "./ai-sidebar";
// import { useUpdateProject } from "../hooks/useUpdateProject";
// import MakePrivateModal from "./makePrivateModal";
// import RemovePrivateModal from "./remokePrivateModal";
// import ChangeFileNameModal from "./changeFileNameModal";
// import { AnimatePresence } from "framer-motion";
// import StickerSidebar from "./sticker-sidebar";

// interface EditorProps{
//   initialData: projectType
// }

// export const Editor = ({initialData}: EditorProps) => {
//   const projectId = initialData.id
//   const [isPrivate, setIsPrivate] = useState(initialData.isPrivate);
//   const [fileName, setFileName] = useState(initialData.name)
//   const {mutate} = useUpdateProject(projectId)
//   const debouncedSave = useCallback(debounce((values: {
//     json: string,
//     height: number,
//     width: number
//   })=>{
//     mutate(values)
//   }, 500),[mutate])

//   const [activeTool, setActiveTool] = useState<ActiveTool>("select")
//   const onClearSelection = useCallback(() => {
//     if (selectionDependentTools.includes(activeTool)) {
//       setActiveTool("select");
//     }
//   }, [activeTool]);
  
//   const { init, editor } = useEditor({
//     defaultState: initialData.json,
//     defaultWidth: initialData.width,
//     defaultHeight: initialData.height,
//     clearSelectionCallback: onClearSelection,
//     saveCallback: debouncedSave
//   });
//   const containerRef = useRef<HTMLDivElement>(null);
//   const canvasRef = useRef(null);

//   const onChangeActiveTool = useCallback((tool: ActiveTool)=>{
//     if(tool==="draw"){
//       editor?.enableDrawing()
//     }
//     if(activeTool==="draw"){
//       editor?.disableDrawing()
//     }
//     if(tool === activeTool){
//       return setActiveTool("select")
//     }
//     setActiveTool(tool)
//   },[activeTool, editor])



//   useEffect(()=>{
//     if(editor?.selectedObjects.length == 0){
//       return setActiveTool("select")
//     }
//   },[editor?.selectedObjects])

//   useEffect(() => {
//       const canvas = new fabric.Canvas(canvasRef.current, {
//         controlsAboveOverlay: true,
//         preserveObjectStacking: true,
//       });

//       init({
//         initialCanvas: canvas,
//         initialContainer: containerRef.current!,
//       });
//       return()=>{
//         canvas.dispose()
//       }
//   }, [init]); 

//   return (
//     <div className="flex overflow-hidden  flex-col w-full h-full">
//       <Navbar name={fileName} isPrivate={isPrivate} editor={editor} id={projectId} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
//       <div className="flex w-full top-12 absolute h-[calc(100%-48px)] bg-muted" >
//         <ChangeFileNameModal fileName={fileName} setFileName={setFileName} projectId={projectId}/>
//         <MakePrivateModal setIsPrivate={setIsPrivate} projectId={projectId}/>
//         <RemovePrivateModal setIsPrivate={setIsPrivate} projectId={projectId}/>
//         <SideBar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
//         <AnimatePresence mode="wait">
//           {activeTool === "text" && (
//             <TextSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
//           )}
//           {activeTool === "shadow" && (
//             <ShadowColorSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
//           )}
//           {activeTool === "stroke-width" && (
//             <StrokeWidthSidebar editor={editor} activeTool={activeTool} />
//           )}
//           {activeTool === "stroke-color" && (
//             <StrokeColorSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
//           )}
//           {activeTool === "shapes" && (
//             <ShapeSidebar  editor={editor} onChangeActiveTool={onChangeActiveTool} />
//           )}
//           {activeTool === "stickers" && (
//             <StickerSidebar  editor={editor} onChangeActiveTool={onChangeActiveTool} />
//           )}
//           {activeTool === "textAlign" && (
//             <TextAlignSidebar onChangeActiveTool={onChangeActiveTool} editor={editor} activeTool={activeTool} />
//             // <TextAlignSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
//           )}
//           {activeTool === "fill" && (
//             <FillColorSidebar editor={editor}  onChangeActiveTool={onChangeActiveTool} />
//           )}
//           {activeTool === "font" && (
//             <FontSidebar editor={editor}  onChangeActiveTool={onChangeActiveTool} />
//             // <FontSidebar editor={editor}  onChangeActiveTool={onChangeActiveTool} loadFont={loadFont}/>
//           )}
//           {activeTool === "remove-bg" && (
//             <RemoveBgSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
//           )}
//           {activeTool === "images" && (
//             <ImageSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
//           )}
//           {activeTool === "templates" && (
//             <TemplateSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
//           )}
//           {activeTool === "filter" && (
//             <FilterSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
//           )}
//           {activeTool === "draw" && (
//             <DrawSidebar editor={editor}  onChangeActiveTool={onChangeActiveTool} />
//           )}
//           {activeTool === "settings" && (
//             <SettingSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
//           )}
//           {activeTool === "ai" && (
//             <AiSidebar editor={editor}  onChangeActiveTool={onChangeActiveTool} />
//           )}
//         </AnimatePresence>
//         <main className="flex-1  flex flex-col relative bg-muted overflow-x-auto">
//           <Toolbar editor={editor} activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
//           <div className="flex-1 overflow-y-hidden h-full bg-muted" ref={containerRef}>
//             <canvas ref={canvasRef}/>
//           </div> 
//           <Footer editor={editor}/>
//         </main>
//       </div> 
//     </div> 
//   );
// };
 


"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "../hooks/useEditor";
import  {fabric}  from "fabric";
import { debounce } from "lodash";

import SideBar from "./sideBar"; 
import Navbar from "./navbar";
import Toolbar from "./toolbar";
import Footer from "./footer";
import { ActiveTool, KEYS, projectType, selectionDependentTools } from "../types";
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
    mutate(values)
  }, 500),[mutate])

  const [activeTool, setActiveTool] = useState<ActiveTool>("select")
  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);
  const { init, editor } = useEditor({
    defaultState: initialData.json,
    defaultWidth: initialData.width,
    defaultHeight: initialData.height,
    clearSelectionCallback: onClearSelection,
    saveCallback: debouncedSave
  });
  // const [pageData, setPageData] =  useState([])

  
  
  let containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef(null);
  
  
  
  
  const pageDataRef = useRef<any[]>([]);
  const [ind, setInd] =  useState(1)
  const [activeInd, setActiveInd] = useState<number>(ind);
  const addPage = () => {
    const json = editor?.canvas.toJSON(KEYS);
    console.log(json)
    if (json) {
      editor?.canvas.getObjects().forEach((obj) => {
      const isClip = obj.name === 'clip';
        if (!isClip) {
          editor?.canvas.remove(obj);
        }
      });
      editor?.canvas.renderAll();
      console.log("before data", pageDataRef.current)
      pageDataRef.current.push(json);
      setInd((prev) => prev + 1);
      setActiveInd(ind)
      console.log("data", pageDataRef.current)
    }
  };
  
  const onClickPage = (i: number)=>{
    const json = editor?.canvas.toJSON(KEYS);
    if(i==activeInd || !json){
      return
    }
    if(activeInd>pageDataRef.current.length){
      if (json) {
        editor?.canvas.getObjects().forEach((obj) => {
        const isClip = obj.name === 'clip';
          if (!isClip) {
            editor?.canvas.remove(obj);
          }
        });
        editor?.canvas.renderAll();
        pageDataRef.current.push(json);
        setInd((prev) => prev + 1);
      }
    }else{
      pageDataRef.current[activeInd] = json
      if (json) {
        editor?.canvas.getObjects().forEach((obj) => {
        const isClip = obj.name === 'clip';
          if (!isClip) {
            editor?.canvas.remove(obj);
          }
        });
        editor?.canvas.renderAll();
        // pageDataRef.current.push(json);
        // setInd((prev) => prev + 1);
      }
    }
    setActiveInd(i)
    const jsonString = pageDataRef.current[i]
    console.log("json", jsonString)
    editor?.loadFromJSON(JSON.stringify(jsonString))
  }
  
  

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
      return()=>{
        canvas.dispose()
      }
  }, [init, ind]); 

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
            <StrokeWidthSidebar editor={editor} activeTool={activeTool} />
          )}
          {activeTool === "stroke-color" && (
            <StrokeColorSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
          )}
          {activeTool === "shapes" && (
            <ShapeSidebar  editor={editor} onChangeActiveTool={onChangeActiveTool} />
          )}
          {activeTool === "stickers" && (
            <StickerSidebar  editor={editor} onChangeActiveTool={onChangeActiveTool} />
          )}
          {activeTool === "textAlign" && (
            <TextAlignSidebar onChangeActiveTool={onChangeActiveTool} editor={editor} activeTool={activeTool} />
            // <TextAlignSidebar editor={editor} onChangeActiveTool={onChangeActiveTool} />
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
            <div className="flex justify-center -mt-4 mb-4">
              <div className="flex gap-2">
                {Array.from({ length: ind }, (_, i) => (
                  <div key={i} onClick={()=>onClickPage(i)} className={`h-8 w-8  bg-white hover:border cursor-pointer rounded-sm ${activeInd==i? "border border-gray-400 shadow ":""}`} />
                ))}
                <button className="rounded-full h-8 w-8  flex justify-center text-center bg-[#8B3DFF]  hover:bg-[#7731d8]" onClick={addPage}><FaPlus className="text-white mt-2" /></button>
              </div>
            </div>
          <Footer editor={editor}/>
        </main>
      </div> 
    </div> 
  );
};
 
