// import { useCallback, useRef, useState } from "react"
// import { KEYS } from "../types"
// import {fabric} from "fabric"

// interface useHistoryprops{
//     canvas: fabric.Canvas | null,
//     saveCallback?: (values:{
//         json: string,
//         height: number,
//         width: number
//     })=>void
// }

// export const useHistory=({canvas, saveCallback}:useHistoryprops)=>{
//     const [historyIndex, setHistoryIndex] = useState(0)
//     const canvasHistory = useRef<string []>([])
//     const skipSave = useRef(false)

//     const canUndo = useCallback(()=>{
//         return historyIndex>0;
//     },[historyIndex])

//     const canRedo = useCallback(()=>{
//         return historyIndex < canvasHistory.current.length - 1;
//     },[historyIndex])

//     const save = useCallback((skip = false)=>{
//         if(!canvas){
//             return;
//         }
//         const currentObjects = canvas.toJSON(KEYS )
//         const jsonCurrentObjects = JSON.stringify(currentObjects)

//         if(!skip && !skipSave.current){
//             canvasHistory.current.push(jsonCurrentObjects)
//             setHistoryIndex(canvasHistory.current.length - 1)
//         }  
        
//         const workspace = canvas.getObjects().find((obj)=>obj.name === "clip")
//         const height = workspace?.height || 0
//         const width  = workspace?.width || 0

//         saveCallback?.({json:jsonCurrentObjects, height, width})

//     },[canvas])

//     const undo = useCallback(()=>{
//         if(canUndo()){
//             skipSave.current = true;
//             canvas?.clear().renderAll();
 
//             const previousIndex = historyIndex - 1;
//             const previousState = JSON.parse(
//                 canvasHistory.current[previousIndex]
//             )
//             canvas?.loadFromJSON(previousState,()=>{
//                 canvas.renderAll()
//                 setHistoryIndex(previousIndex)
//                 skipSave.current = false
//             })
//         }
//     },[canUndo, historyIndex, canvas])

//     const redo = useCallback(()=>{
//         if(canRedo()){
//             skipSave.current = true;
//             canvas?.clear().renderAll();

//             const nextIndex = historyIndex + 1;
//             const nextState = JSON.parse(
//                 canvasHistory.current[nextIndex]
//             )
//             canvas?.loadFromJSON(nextState,()=>{
//                 canvas.renderAll()
//                 setHistoryIndex(nextIndex)
//                 skipSave.current = false
//             })
//         }
//     },[canRedo, historyIndex, canvas])

//     return {
//         save,
//         undo,
//         redo,
//         canRedo,
//         canUndo,
//         setHistoryIndex,
//         canvasHistory
//     }
// }



// import { useCallback, useRef, useState } from "react";
// import { KEYS } from "../types";
// import { fabric } from "fabric";

// interface useHistoryProps {
//   canvas: fabric.Canvas | null;
//   saveCallback?: (values: { json: string; height: number; width: number }) => void;
// }

// export const useHistory = ({ canvas, saveCallback }: useHistoryProps) => {
//   const [historyIndexMap, setHistoryIndexMap] = useState<Record<number, number>>({});
//   const canvasHistoryMap = useRef<Record<number, string[]>>({});
//   const skipSave = useRef(false);
//   const activePage = useRef<number>(0);
  

//   const setActivePage = (index: number) => {
//     activePage.current = index;
//     if (!canvasHistoryMap.current[index]) {
//       canvasHistoryMap.current[index] = [];
//       setHistoryIndexMap((prev) => ({ ...prev, [index]: 0 }));
//     }
//   };

//   const canUndo = useCallback(() => {
//     const index = activePage.current;
//     console.log("canredo:", index)
//     return (historyIndexMap[index] ?? 0) > 0;
//   }, [historyIndexMap]);

//   const canRedo = useCallback(() => {
//     const index = activePage.current;
//     console.log("canredo:", index)
//     return (
//       (historyIndexMap[index] ?? 0) < (canvasHistoryMap.current[index]?.length ?? 0) - 1
//     );
//   }, [historyIndexMap]);

//   const save = useCallback(
//     (skip = false) => {
//       const index = activePage.current;
//       console.log("save:", index)
//       if (!canvas) return;
//       const json = JSON.stringify(canvas.toJSON(KEYS));
//       if (!skip && !skipSave.current) {
//         if(!canvasHistoryMap.current[index]){
//           canvasHistoryMap.current[index] = [];
//         }
//         canvasHistoryMap.current[index].push(json);
//         // setHistoryIndexMap((prev) => ({ ...prev, [index]: canvasHistoryMap.current[index].length - 1 }));
//         if (canvasHistoryMap.current[index]) {
//           setHistoryIndexMap((prev) => ({
//             ...prev,
//             [index]: canvasHistoryMap.current[index].length - 1,
//           }));
//         }

//       }
//       console.log("canvas",canvasHistoryMap);
//       console.log("history",historyIndexMap);

//       const workspace = canvas.getObjects().find((obj) => obj.name === "clip");
//       const height = workspace?.height || 0;
//       const width = workspace?.width || 0;
//       saveCallback?.({ json, height, width });
//     },
//     [canvas, saveCallback]
//   );

//   const undo = useCallback(() => {
//     const index = activePage.current;
//     console.log(index)
//     if (canUndo()) {
//       skipSave.current = true;
//       const previousIndex = (historyIndexMap[index] ?? 0) - 1;
//       const state = JSON.parse(canvasHistoryMap.current[index][previousIndex]);
//       canvas?.clear().renderAll();
//       canvas?.loadFromJSON(state, () => {
//         canvas.renderAll();
//         setHistoryIndexMap((prev) => ({ ...prev, [index]: previousIndex }));
//         skipSave.current = false;
//       });
//     }
//   }, [canvas, canUndo, historyIndexMap]);

//   const redo = useCallback(() => {
//     const index = activePage.current;
//     if (canRedo()) {
//       skipSave.current = true;
//       const nextIndex = (historyIndexMap[index] ?? 0) + 1;
//       const state = JSON.parse(canvasHistoryMap.current[index][nextIndex]);
//       canvas?.clear().renderAll();
//       canvas?.loadFromJSON(state, () => {
//         canvas.renderAll();
//         setHistoryIndexMap((prev) => ({ ...prev, [index]: nextIndex }));
//         skipSave.current = false;
//       });
//     }
//   }, [canvas, canRedo, historyIndexMap]);

//   return {
//     save,
//     undo,
//     redo,
//     canUndo,
//     canRedo,
//     setActivePage,
//     canvasHistoryMap,
//     historyIndexMap,
//     setHistoryIndexMap,
//     activePage,
//     activePageIndex: activePage.current, // Needed for useLoadState
//   };

// };




import { useCallback, useRef, useState } from "react";
import { KEYS } from "../types";
import { fabric } from "fabric";

interface useHistoryProps {
  canvas: fabric.Canvas | null;
  saveCallback?: (values: { json: string; height: number; width: number }) => void;
}

export const useHistory = ({ canvas, saveCallback }: useHistoryProps) => {
  const [historyIndexMap, setHistoryIndexMap] = useState<Record<number, number>>({});
  const canvasHistoryMap = useRef<Record<number, string[]>>({});
  const skipSave = useRef(false);
  const activePage = useRef<number>(0);
  

  const setActivePage = (index: number) => {
    // Save current canvas state before switching pages if not skipping
    if (canvas && !skipSave.current && activePage.current !== index) {
      const currentPageIndex = activePage.current;
      const json = JSON.stringify(canvas.toJSON(KEYS));
      
      if (!canvasHistoryMap.current[currentPageIndex]) {
        canvasHistoryMap.current[currentPageIndex] = [];
      }
      
      // Only save if it's different from the last saved state
      const lastState = canvasHistoryMap.current[currentPageIndex][historyIndexMap[currentPageIndex] || 0];
      if (lastState !== json) {
        // Remove future history if we're not at the end
        const currentHistoryIndex = historyIndexMap[currentPageIndex] || 0;
        canvasHistoryMap.current[currentPageIndex] = canvasHistoryMap.current[currentPageIndex].slice(0, currentHistoryIndex + 1);
        
        // Add new state
        canvasHistoryMap.current[currentPageIndex].push(json);
        setHistoryIndexMap((prev) => ({ 
          ...prev, 
          [currentPageIndex]: canvasHistoryMap.current[currentPageIndex].length - 1 
        }));
      }
    }

    // Set new active page
    activePage.current = index;
    
    // Initialize history for new page if it doesn't exist
    if (!canvasHistoryMap.current[index]) {
      canvasHistoryMap.current[index] = [];
      setHistoryIndexMap((prev) => ({ ...prev, [index]: -1 }));
    }
  };

  const canUndo = useCallback(() => {
    const index = activePage.current;
    return (historyIndexMap[index] ?? -1) > 0;
  }, [historyIndexMap]);

  const canRedo = useCallback(() => {
    const index = activePage.current;
    const currentHistoryIndex = historyIndexMap[index] ?? -1;
    const historyLength = canvasHistoryMap.current[index]?.length ?? 0;
    return currentHistoryIndex < historyLength - 1;
  }, [historyIndexMap]);

  const save = useCallback(
    (skip = false) => {
      const index = activePage.current;
      if (!canvas || skip || skipSave.current) return;
      
      const json = JSON.stringify(canvas.toJSON(KEYS));
      
      // Initialize history array if it doesn't exist
      if (!canvasHistoryMap.current[index]) {
        canvasHistoryMap.current[index] = [];
      }
      
      // Check if this state is different from the current one
      const currentHistoryIndex = historyIndexMap[index] ?? -1;
      const lastState = canvasHistoryMap.current[index][currentHistoryIndex];
      
      if (lastState !== json) {
        // Remove any future history if we're not at the end
        canvasHistoryMap.current[index] = canvasHistoryMap.current[index].slice(0, currentHistoryIndex + 1);
        
        // Add new state
        canvasHistoryMap.current[index].push(json);
        const newHistoryIndex = canvasHistoryMap.current[index].length - 1;
        
        setHistoryIndexMap((prev) => ({
          ...prev,
          [index]: newHistoryIndex,
        }));
      }

      // Call external save callback
      const workspace = canvas.getObjects().find((obj) => obj.name === "clip");
      const height = workspace?.height || 0;
      const width = workspace?.width || 0;
      saveCallback?.({ json, height, width });
    },
    [canvas, saveCallback, historyIndexMap]
  );

  const undo = useCallback(() => {
    const index = activePage.current;
    if (!canvas || !canUndo()) return;
    
    skipSave.current = true;
    const currentHistoryIndex = historyIndexMap[index] ?? -1;
    const previousIndex = currentHistoryIndex - 1;
    
    if (previousIndex >= 0 && canvasHistoryMap.current[index][previousIndex]) {
      const state = JSON.parse(canvasHistoryMap.current[index][previousIndex]);
      canvas.clear().renderAll();
      canvas.loadFromJSON(state, () => {
        canvas.renderAll();
        setHistoryIndexMap((prev) => ({ ...prev, [index]: previousIndex }));
        skipSave.current = false;
      });
    } else {
      skipSave.current = false;
    }
  }, [canvas, canUndo, historyIndexMap]);

  const redo = useCallback(() => {
    const index = activePage.current;
    if (!canvas || !canRedo()) return;
    
    skipSave.current = true;
    const currentHistoryIndex = historyIndexMap[index] ?? -1;
    const nextIndex = currentHistoryIndex + 1;
    
    if (nextIndex < canvasHistoryMap.current[index].length && canvasHistoryMap.current[index][nextIndex]) {
      const state = JSON.parse(canvasHistoryMap.current[index][nextIndex]);
      canvas.clear().renderAll();
      canvas.loadFromJSON(state, () => {
        canvas.renderAll();
        setHistoryIndexMap((prev) => ({ ...prev, [index]: nextIndex }));
        skipSave.current = false;
      });
    } else {
      skipSave.current = false;
    }
  }, [canvas, canRedo, historyIndexMap]);

  // Initialize first page history when canvas is first available
  const initializeHistory = useCallback(() => {
    if (canvas && !canvasHistoryMap.current[0]) {
      const json = JSON.stringify(canvas.toJSON(KEYS));
      canvasHistoryMap.current[0] = [json];
      setHistoryIndexMap((prev) => ({ ...prev, [0]: 0 }));
    }
  }, [canvas]);

  return {
    save,
    undo,
    redo,
    canUndo,
    canRedo,
    setActivePage,
    canvasHistoryMap,
    historyIndexMap,
    setHistoryIndexMap,
    activePage,
    activePageIndex: activePage.current,
    initializeHistory,
  };
};