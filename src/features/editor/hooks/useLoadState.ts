import { fabric } from "fabric";
import React, { useEffect, useRef } from "react";
import { KEYS } from "../types";
import { Cannabis } from "lucide-react";

interface useLoadStateProps{
    autoZoom: ()=>void;
    canvas: fabric.Canvas | null;
    initialState: React.MutableRefObject<string | undefined>;
    canvasHistory: React.MutableRefObject<string[]>;
    setHistoryIndex: React.Dispatch<React.SetStateAction<number>>;
}

const useLoadState=({
    autoZoom,
    canvas,
    initialState,
    canvasHistory,
    setHistoryIndex
}: useLoadStateProps)=>{
    const initialized = useRef(false);
    useEffect(()=>{
        if(!initialized.current && initialState?.current && canvas){
            canvas.loadFromJSON(JSON.parse(initialState.current),()=>{
                const currentState = JSON.stringify(canvas.toJSON(KEYS))

                canvasHistory.current = [currentState]
                setHistoryIndex(0);
                autoZoom() 
            })
            initialized.current=true
        }
    },[
        canvas,
        autoZoom,
        initialState,
        canvasHistory,
        setHistoryIndex
    ])
}


export default useLoadState