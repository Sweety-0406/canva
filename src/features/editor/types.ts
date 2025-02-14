import { fabric } from "fabric"
import * as material from "material-colors"
import { ITextOptions } from "fabric/fabric-impl"

export const colors=[
    material.red["500"],
    material.pink["500"],
    material.purple["500"],
    material.blueGrey["500"],
    material.brown["500"],
    material.deepOrange["500"],
    material.orange["500"],
    material.amber["500"],
    material.yellow["500"],
    material.lime["500"],
    material.lightGreen["500"],
    material.green["500"],
    material.teal["500"],
    material.cyan["500"],
    material.lightBlue["500"],
    material.blue["500"],
    material.indigo["500"],
    material.deepPurple["500"],
    "transparent"
]

export const fonts = [
    "Arial",
    "Arial Black",
    "Verdana",
    "Helvetica",
    "Tahoma",
    "Trebuchet MS",
    "Time New Roman",
    "Georgia",
    "Garamond",
    "Courier New",
    "Brush Script MT",
    "Palatino",
    "Bookman",
    "Comic Sans MS",
    "Impact ",
    "Lucid Sans Unicode",
    "Geneva",
    "Lucida Console",
    "OpenType"
]

export type ActiveTool = 
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
    canvas:  fabric.Canvas,
    fillColor:string,
    setFillColor: (value: string)=>void
    strokeColor:string,
    setStrokeColor: (value: string)=>void
    strokeWidth:number,
    setStrokeWidth: (value: number)=>void,
    strokeType: number[],
    setStrokeType:(value: number[])=>void,
    opacity: number,
    setOpacity: (value: number)=>void,
    selectedObjects: fabric.Object[],
    font: string,
    setFont:(value: string)=>void,
    fontWeight: number,
    setFontWeight:(value: number)=>void
}  

export interface Editor{
    changeOpacity:(value:number)=>void
    bringForward:()=>void,
    sendBackward:()=>void,
    addText:(value: string, option?: ITextOptions)=>void,
    changeFillColor:(value: string)=>void,
    changeStrokeColor:(value: string)=>void,
    changeStrokeWidth:(value: number)=>void,
    changeStrokeType:(value: number[])=>void,
    changeFont:(value: string)=>void,
    changeFontWeight:(value: number)=>void,
    addCircle:()=>void,
    addLine:()=>void,
    addSingleHeadArrow:()=>void,
    addDashedSingleHeadArrow:()=>void,
    addDoubleHeadArrow:()=>void,
    addDashedDoubleHeadArrow:()=>void,
    addArrowWithCircle:()=>void,
    addArrowWithRectangle:()=>void,
    addHorizontalEllipse:()=>void,
    addVerticalEllipse:()=>void,
    addRectangle:()=>void,
    addRoundedRectangle:()=>void,
    addDiamond:()=>void,
    addTriangle:()=>void,
    addReverseTriangle:()=>void,
    addStar:()=>void,
    addPentagon:()=>void,
    addHexagon:()=>void,
    addHeart:()=>void,
    canvas:fabric.Canvas,
    fillColor:string,
    strokeColor:string,
    strokeWidth:number,
    strokeType: number[],
    opacity: number,
    selectedObjects: fabric.Object[],
    font: string,
    fontWeight: number,
    setFontWeight:(value:number)=>void
    
}