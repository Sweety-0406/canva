import { fabric } from "fabric"
import * as material from "material-colors"
import { Gradient, ITextOptions, Pattern } from "fabric/fabric-impl"

export type projectType={
    json: string,
    name: string,
    id: string,
    userId: string,
    height: number,
    width: number,
    thumbnailUrl :string | null,
    isTemplate: boolean | null,
    isPro: boolean | null,
    isPrivate: boolean ;
    createdAt: string,
    updatedAt: string

}
export type templateType = {
    data: projectType[]
}

export type projectsType = {
    data: projectType[],
    nextPage: number | null
}

export type fontStyleType="normal" | "italic" 

export const KEYS = [
    "name",
    "gradientAngle",
    "selectable",
    "hasControl",
    "linkData",
    "editable",
    "extensionType",
    "extension"
]

export const colors=[
    "#FFFFFF",
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
    "#933BFF",
    "#22E12F",
    "#000000",
    "#4deeea",
    "#74ee15",
    "#f000ff",
    "#001eff",
    material.teal["500"],
    material.cyan["500"],
    material.lightBlue["500"],
    material.blue["500"],
    material.indigo["500"],
    material.deepPurple["500"],
]



export type ActiveTool = 
    "select"
    |"shapes"
    |"text"
    |"textAlign"
    |"images"
    |"settings"
    |"ai"
    |"draw"
    |"fill"
    |"stroke-color"
    |"stroke-width"
    |"font"
    |"font-size"
    |"opacity"
    |"filter"
    |"remove-bg"
    |"templates"
    |"shadow"


export const filters = [
    "none",
    "polaroid",
    "sepia",
    "kodachrome",
    "contrast",
    "brightness",
    "grayscale",
    "brownie",
    "vintage",
    "technicolor",
    "pixelate",
    "invert",
    "blur",
    "sharpen",
    "emboss",
    "removecolor",
    "blacknwhite",
    "vibrance",
    "blendcolor",
    "huerotate",
    "saturation",
    "gamma"
]


export interface EditorHookProps{
    defaultState?: string,
    defaultHeight?: number,
    defaultWidth?: number,
    clearSelectionCallback?: ()=>void,
    saveCallback?: (values:{
        json: string,
        height: number,
        width: number
    })=>void
}
export const selectionDependentTools = [
    "fill",
    "font",
    "filter",
    "opacity",
    "remove-bg",
    "stroke-color",
    "stroke-width",
  ];

export type buildEditorProps = {
    canvas:  fabric.Canvas,
    loadFont:(fontFamily: string)=>void,
    save:(skip?:boolean)=>void,
    undo:()=>void,
    redo:()=>void,
    canUndo:()=>boolean,
    canRedo:()=>boolean,
    autoZoom:()=>void,
    copy:()=>void,
    paste:()=>void,
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
    setFontWeight:(value: number)=>void,
    fontStyle: string,
    setFontStyle:(value: string)=>void,
    lineThrough: boolean,
    setLineThrough:(value: boolean)=>void,
    underline: boolean,
    setUnderline:(value: boolean)=>void,
    textAlign: string,
    setTextAlign: (value:string) => void
    textShadow: string,
    setTextShadow: (value:string) => void
    fontSize: number,
    setFontSize: (value:number) => void
}  

export interface Editor{
    saveJson:()=>void,
    savePng:()=>void,
    saveJpg:()=>void,
    saveSvg:()=>void,
    loadFromJSON:(json: string)=>void,
    getWorkspace: ()=>fabric.Object | undefined,
    onUndo:()=>void,
    onRedo:()=>void,
    canUndo:()=>boolean,
    canRedo:()=>boolean,
    autoZoom:()=>void,
    zoomIn:()=>void,
    zoomOut:()=>void,
    changeSize:(value:{width:number, height: number})=>void,
    changeBackground:(value: string)=>void,
    enableDrawing:()=>void,
    disableDrawing:()=>void,
    onCopy:()=>void,
    onPaste:()=>void,
    addImage:(value: string)=>void,
    addVideo: (url: string) =>void,
    changeImageFilter:(value:string)=>void,
    deleteObject:()=>void,
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
    changeFontStyle:(value: string)=>void,
    changeLineThrough:(value: boolean)=>void,
    changeUnderline:(value: boolean)=>void,
    changeTextAlign:(value: string)=>void,
    changeFontSize:(value: number)=>void,
    changeTextShadow:( color: string)=>void,
    addCircle:()=>void,
    addLine:(strokeWidth: number)=>void,
    addSingleHeadArrow:(strokeWidth: number)=>void,
    addDashedSingleHeadArrow:(strokeWidth: number)=>void,
    addDoubleHeadArrow:(strokeWidth: number)=>void,
    addDashedDoubleHeadArrow:(strokeWidth: number)=>void,
    addArrowWithCircle:(strokeWidth: number)=>void,
    addArrowWithRectangle:(strokeWidth: number)=>void,
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
    addOctagon:()=>void,
    add6PointerStar:()=>void,
    add4PointerStar:()=>void,
    add8PointerStar:()=>void,
    addStarBrust1:()=>void,
    addStarBrust2:()=>void,
    addStarBrust3:()=>void,
    addStarBrust4:()=>void,
    addRightArrow:()=>void,
    addLeftArrow:()=>void,
    addUpArrow:()=>void,
    addDownArrow:()=>void,
    addArrowHorizontal:()=>void,
    addArrowBlock:()=>void,
    addArrowBlock2Right:()=>void,
    addArrowBlockConcave:()=>void,
    addArrowBlockConvex:()=>void,
    addWhiteOblongShape:()=>void,
    addSquareSpeechBubble:()=>void,
    addOvalSpeechBubble:()=>void,
    addPlusShape:()=>void,
    addCloudShape:()=>void,
    addBanner2:()=>void,
    addBanner3:()=>void,
    addBanner4:()=>void,
    addBanner5:()=>void,
    addBanner6:()=>void,
    addParallelogramRight:()=>void,
    addParallelogramLeft:()=>void,
    addTrapezoidUp:()=>void,
    addTrapezoidDown:()=>void,
    addArchDown:()=>void,
    addArchUp:()=>void,
    addHeart:()=>void,
    addSVG:(url: string, fillColor: string, strokeColor: string, strokeWidth: number)=>void,
    canvas:fabric.Canvas,
    loadFont:(fontFamily: string)=>void,
    fillColor:string,
    strokeColor:string,
    strokeWidth:number,
    strokeType: number[],
    opacity: number,
    selectedObjects: fabric.Object[],
    font: string,
    fontWeight: number,
    fontStyle: string,
    underline: boolean,
    lineThrough: boolean,
    textAlign: string,
    fontSize: number,
    textShadow: string
    
}



