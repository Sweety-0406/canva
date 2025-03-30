import { useCallback, useRef, useState } from "react"
import { KEYS } from "../types"
import {fabric} from "fabric"

interface useHistoryprops{
    canvas: fabric.Canvas | null,
    saveCallback?: (values:{
        json: string,
        height: number,
        width: number
    })=>void
}

export const useHistory=({canvas, saveCallback}:useHistoryprops)=>{
    const [historyIndex, setHistoryIndex] = useState(0)
    const canvasHistory = useRef<string []>([])
    const skipSave = useRef(false)

    const canUndo = useCallback(()=>{
        return historyIndex>0;
    },[historyIndex])

    const canRedo = useCallback(()=>{
        return historyIndex < canvasHistory.current.length - 1;
    },[historyIndex])

    const save = useCallback((skip = false)=>{
        if(!canvas){
            return;
        }
        const currentObjects = canvas.toJSON(KEYS )
        const jsonCurrentObjects = JSON.stringify(currentObjects)

        if(!skip && !skipSave.current){
            canvasHistory.current.push(jsonCurrentObjects)
            setHistoryIndex(canvasHistory.current.length - 1)
        }  
        
        const workspace = canvas.getObjects().find((obj)=>obj.name === "clip")
        const height = workspace?.height || 0
        const width  = workspace?.width || 0

        saveCallback?.({json:jsonCurrentObjects, height, width})

    },[canvas])

    const undo = useCallback(()=>{
        if(canUndo()){
            skipSave.current = true;
            canvas?.clear().renderAll();

            const previousIndex = historyIndex - 1;
            const previousState = JSON.parse(
                canvasHistory.current[previousIndex]
            )
            canvas?.loadFromJSON(previousState,()=>{
                canvas.renderAll()
                setHistoryIndex(previousIndex)
                skipSave.current = false
            })
        }
    },[canUndo, historyIndex, canvas])

    const redo = useCallback(()=>{
        if(canRedo()){
            skipSave.current = true;
            canvas?.clear().renderAll();

            const nextIndex = historyIndex + 1;
            const nextState = JSON.parse(
                canvasHistory.current[nextIndex]
            )
            canvas?.loadFromJSON(nextState,()=>{
                canvas.renderAll()
                setHistoryIndex(nextIndex)
                skipSave.current = false
            })
        }
    },[canRedo, historyIndex, canvas])

    return {
        save,
        undo,
        redo,
        canRedo,
        canUndo,
        setHistoryIndex,
        canvasHistory
    }
}


