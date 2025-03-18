import { fabric } from "fabric";
import { useCallback, useRef } from "react";

interface useClipboardProps{
    canvas: fabric.Canvas | null;
}


export const useClipboard=({
    canvas
}:useClipboardProps)=>{
    const clipboard = useRef<any>(null)
    const copy = useCallback(()=>{
        canvas?.getActiveObject()?.clone((obj:any)=>{
            clipboard.current = obj
        })
    },[canvas])

    const paste = useCallback(()=>{
        if(!clipboard.current) return;
        clipboard.current.clone((clonedObject: any)=>{
            canvas?.discardActiveObject()
            clonedObject.set({
                left: clonedObject.left+10,
                top: clonedObject.top+10,
            })

            if(clonedObject.type === "activeSelection"){
                clonedObject.canvas = canvas;
                clonedObject.forEachObject((obj:any)=>{
                    canvas?.add(obj)
                })
                clonedObject.setCoords()
            }else{
                canvas?.add(clonedObject)
            }

            clipboard.current.top += 10;
            clipboard.current.left += 10;
            canvas?.setActiveObject(clonedObject)
            canvas?.requestRenderAll()
        })
    },[canvas])
    
    

    return {copy, paste} 
}