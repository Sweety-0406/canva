
import { useCallback, useRef, useState, useTransition  } from "react";
import { KEYS } from "../types";
import { fabric } from "fabric";
import axios from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

interface useHistoryProps {
  canvas: fabric.Canvas | null;
  saveCallback?: (values: { json: string; height: number; width: number }) => void;
  initialPageId:string
}

export const useHistory = ({ canvas, saveCallback,initialPageId }: useHistoryProps) => {
  const [historyIndexMap, setHistoryIndexMap] = useState<Record<number, number>>({});
  const canvasHistoryMap = useRef<Record<number, string[]>>({});
  const [, startTransition] = useTransition();
  // const [isPending, startTransition] = useTransition();

  const skipSave = useRef(false);

  const activePage = useRef<number>(0);
  const activePageId = useRef<string>(initialPageId);
  const { projectId } = useParams();

  const setActivePage = (index: number, id:string) => {
    if (canvas && !skipSave.current && activePage.current !== index) {
      const currentPageIndex = activePage.current;
      const json = JSON.stringify(canvas.toJSON(KEYS));
      
      if (!canvasHistoryMap.current[currentPageIndex]) {
        canvasHistoryMap.current[currentPageIndex] = [];
      }
      
      // Only save if it's different from the last saved state
      const currentHistoryIndex = historyIndexMap[currentPageIndex] ?? -1;
      const lastState = canvasHistoryMap.current[currentPageIndex][currentHistoryIndex];
      
      if (lastState !== json) {
        // Remove future history if we're not at the end
        canvasHistoryMap.current[currentPageIndex] = canvasHistoryMap.current[currentPageIndex].slice(0, currentHistoryIndex + 1);
        
        // Add new state
        canvasHistoryMap.current[currentPageIndex].push(json);
        setHistoryIndexMap((prev) => ({ 
          ...prev, 
          [currentPageIndex]: canvasHistoryMap.current[currentPageIndex].length - 1
        }));
      }
    }
     
    activePage.current = index;
    activePageId.current = id;
    
    // Initialize history for new page if it doesn't exist
    if (!canvasHistoryMap.current[index]) {
      console.log('history for index doesnot exist what to do');
      canvasHistoryMap.current[index] = [];
      setHistoryIndexMap((prev) => ({ ...prev, [index]: -1 }));
    }
  };
 
  const canUndo = () => {
    const index = activePage.current;
    const currentHistoryIndex = historyIndexMap[index] ?? -1;
    return currentHistoryIndex > 0;
  };

  const canRedo = () => {
    const index = activePage.current;
    const currentHistoryIndex = historyIndexMap[index] ?? -1;
    const historyLength = canvasHistoryMap.current[index]?.length ?? 0;
    return currentHistoryIndex < historyLength - 1;
  };


  const save = async (skip = false) => {
    const index = activePage.current;
    if (!canvas || skip || skipSave.current) return;

    const json = JSON.stringify(canvas.toJSON(KEYS));

    // Local history update
    if (!canvasHistoryMap.current[index]) {
      canvasHistoryMap.current[index] = [];
    }

    const currentHistoryIndex = historyIndexMap[index] ?? -1;
    const lastState = canvasHistoryMap.current[index][currentHistoryIndex];

    if (lastState !== json) {
      canvasHistoryMap.current[index] = canvasHistoryMap.current[index].slice(0, currentHistoryIndex + 1);
      canvasHistoryMap.current[index].push(json);

      const newHistoryIndex = canvasHistoryMap.current[index].length - 1;

      setHistoryIndexMap((prev) => ({
        ...prev,
        [index]: newHistoryIndex,
      }));
    }

    // Call external save callback (local)
    const workspace = canvas.getObjects().find((obj) => obj.name === "clip");
    const height = workspace?.height || 0;
    const width = workspace?.width || 0;
    saveCallback?.({ json, height, width });

    // Backend save (deferred)
    startTransition(async () => {
      try {
        const updatedJsonData = await axios.patch(`/api/projects/${projectId}/addJson`, {
          json: json,
          id: activePageId.current,
        });

        if (!updatedJsonData) {
          toast.error("Something went wrong.");
          return;
        }
      } catch (error) {
        toast.error("Failed to save changes.");
        console.error("Save error:", error);
      }
    });
  };


  const undo =() => {
    const index = activePage.current;
    if (!canvas || !canUndo()) return;
    
    skipSave.current = true;
    const currentHistoryIndex = historyIndexMap[index] ?? -1;
    const previousIndex = currentHistoryIndex - 1;
    
    if (previousIndex >= 0 && canvasHistoryMap.current[index][previousIndex]) {
      const state = JSON.parse(canvasHistoryMap.current[index][previousIndex]);
      canvas.clear();
      canvas.loadFromJSON(state, () => {
        canvas.renderAll();
        setHistoryIndexMap((prev) => ({ ...prev, [index]: previousIndex }));
        skipSave.current = false;
      });
    } else {
      skipSave.current = false;
    }
  };

  const redo =() => {
    const index = activePage.current;
    if (!canvas || !canRedo()) return;
    
    skipSave.current = true;
    const currentHistoryIndex = historyIndexMap[index] ?? -1;
    const nextIndex = currentHistoryIndex + 1;
    
    if (nextIndex < canvasHistoryMap.current[index].length && canvasHistoryMap.current[index][nextIndex]) {
      const state = JSON.parse(canvasHistoryMap.current[index][nextIndex]);
      console.log("state", state)
      canvas.clear();
      canvas.loadFromJSON(state, () => {
        canvas.renderAll();
        setHistoryIndexMap((prev) => ({ ...prev, [index]: nextIndex }));
        skipSave.current = false;
      });
    } else {
      skipSave.current = false;
    }
  };

  // Initialize first page history when canvas is first available
  const initializeHistory = useCallback(() => {
    console.log('canvas initialized');
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
    activePageIndex:activePage.current,
    // activePageIndex: activePage.current,
    initializeHistory,
  };
};