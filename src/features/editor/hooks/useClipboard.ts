
import { fabric } from "fabric";
import { useCallback, useRef } from "react";

interface useClipboardProps {
  canvas: fabric.Canvas | null;
}

export const useClipboard = ({ canvas }: useClipboardProps) => {
  const clipboard = useRef<fabric.Object | fabric.ActiveSelection | null>(null);

  const copy = useCallback(() => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject) {
      activeObject.clone((cloned: fabric.Object) => {
        clipboard.current = cloned;
      });
    }
  }, [canvas]);

  const copyPage= useCallback(()=>{
    if (!canvas) return;

    // const canvas = canvas;
    const clipObject = canvas.getObjects().find(obj => obj.name === "clip");

    if (!clipObject) {
    console.warn("Clip object not found");
    return;
    }

    const clipBounds = clipObject.getBoundingRect();
    const objectsInClip = canvas.getObjects().filter(obj => {
    if (obj.name === "clip") return false;
    const objBounds = obj.getBoundingRect();
    return (
        objBounds.left >= clipBounds.left &&
        objBounds.top >= clipBounds.top &&
        objBounds.left + objBounds.width <= clipBounds.left + clipBounds.width &&
        objBounds.top + objBounds.height <= clipBounds.top + clipBounds.height
    );
    });

    
    canvas.discardActiveObject();
    if (objectsInClip.length === 1) {
    canvas.setActiveObject(objectsInClip[0]);
    } else if (objectsInClip.length > 1) {
    const group = new fabric.ActiveSelection(objectsInClip, { canvas });
    canvas.setActiveObject(group);
    }
    canvas.requestRenderAll();

    // Now trigger the copy
    copy(); 
  },[canvas])   
  
  const canPaste = ()=>{
    if(clipboard.current){
      return true;
    }else{
      return false
    }
  }

  const paste = useCallback(() => {
    if (!clipboard.current) return;

    clipboard.current.clone((clonedObject: fabric.Object) => {
      if (!canvas) return;

      canvas.discardActiveObject();

      clonedObject.set({
        left: (clonedObject.left ?? 0) + 10,
        top: (clonedObject.top ?? 0) + 10,
      });

      if (clonedObject.type === "activeSelection") {
        const selection = clonedObject as fabric.ActiveSelection;
        selection.canvas = canvas;
        selection.forEachObject((obj: fabric.Object) => {
          canvas.add(obj);
        });
        selection.setCoords();
      } else {
        canvas.add(clonedObject);
      }

      clipboard.current!.top = (clipboard.current!.top ?? 0) + 10;
      clipboard.current!.left = (clipboard.current!.left ?? 0) + 10;

      canvas.setActiveObject(clonedObject);
      canvas.requestRenderAll();
    });
  }, [canvas]);

  return { copy, copyPage, paste, canPaste };
};
