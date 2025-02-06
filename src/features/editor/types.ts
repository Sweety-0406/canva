import { fabric } from "fabric"

export type ActiveTools = 
    "select"
    |"shapes"
    |"text"
    |"images"
    |"settings"
    |"ai"
    |"draw"
    |"fill"
    |"stroke-color"
    |"stroke-width"
    |"font"
    |"opacity"
    |"filter"
    |"remove-bg"
    |"templates"


export type buildEditorProps = {
    canvas:  fabric.Canvas
}  

export interface Editor{
    addCircle:()=>void,
    addRectangle:()=>void,
    addRoundedRectangle:()=>void,
    addDiamond:()=>void,
    addTriangle:()=>void,
    addReverseTriangle:()=>void,
    
}