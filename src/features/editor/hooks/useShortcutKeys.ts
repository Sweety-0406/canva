import {fabric} from "fabric"
import {useEvent} from "react-use"

interface useShortcutKeys{
    canvas: fabric.Canvas | null
    undo: ()=> void,
    redo: ()=> void,
    save: (skip?: boolean)=> void,
    copy: ()=> void,
    copyPage:()=>void,
    paste: ()=> void,
}

export const useShortcutKeys = ({
    canvas,
    undo,
    redo,
    save,
    copy,
    copyPage,
    paste,
}:useShortcutKeys)=>{
    useEvent("keydown", (e)=>{
        const isCtrlKey = e.ctrlKey || e.metaKey
        const isBackspace = e.key === "Backspace"
        const isInput = ["INPUT", "TEXTAREA"].includes(
            (e.target as HTMLElement).tagName
        )

        if(isInput){
            return;
        }
        if(isBackspace){
            canvas?.remove(...canvas.getActiveObjects())
            canvas?.discardActiveObject()
        }
        if(isCtrlKey && e.key === "z"){
            e.preventDefault()
            undo()
        }
        if(isCtrlKey && e.key === "y"){
            e.preventDefault()
            redo()
        }
        if(isCtrlKey && e.key === "c"){
            e.preventDefault()
            copy()
        }
        if(isCtrlKey && e.key === "C"){
            e.preventDefault()
            copyPage()
        }
        if(isCtrlKey && e.key === "v"){
            e.preventDefault()
            paste()
        }
        if(isCtrlKey && e.key === "s"){
            e.preventDefault()
            save(true)
        }
        if(isCtrlKey && e.key === "a"){
            e.preventDefault()
            canvas?.discardActiveObject()
            const allObjects = canvas?.getObjects().filter((ob)=>ob.name!="clip")
            canvas?.setActiveObject(
                new fabric.ActiveSelection(allObjects, {canvas})
            )
            canvas?.renderAll()
        }
    })
}