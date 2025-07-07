
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

  return { copy, paste };
};
