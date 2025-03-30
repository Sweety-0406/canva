import { useCallback, useMemo, useRef, useState } from "react"
import  {fabric}  from "fabric"
import { useAutoResizer } from "./useAutoResizer"
import { buildEditorProps, Editor, EditorHookProps, fonts, fontStyleType, KEYS } from "../types"
import { useCanvasEvents } from "./useCanvasEvents"
import { isTextType, createFilter, downloadCanvasImage, transformText } from "../utils"
import { useClipboard } from "./useClipboard"
import { useHistory } from "./useHistory"
import { useShortcutKeys } from "./useShortcutKeys"
import { useWindowEvents } from "./useWindowEvents"
import useLoadState from "./useLoadState"


const buildEditor =({
    canvas,
    save,
    undo,
    redo,
    canUndo,
    canRedo,
    autoZoom,
    copy,
    paste,
    fillColor,
    setFillColor,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    strokeType,
    setStrokeType,
    opacity,
    setOpacity,
    selectedObjects,
    font,
    setFont,
    fontWeight,
    setFontWeight,
    fontStyle,
    setFontStyle,
    lineThrough,
    setLineThrough,
    underline,
    setUnderline,
    textAlign,
    setTextAlign,
    fontSize,
    setFontSize,
    textShadow,
    setTextShadow

}:buildEditorProps):Editor=>{
    const generateSaveOptions = ()=>{
        const{width, height, left, top} = getWorkspace() as fabric.Rect;
        return{
            name:"Image",
            format:"png",
            quality: 1,
            width,
            height,
            left,
            top
        }
    }

    const savePng = ()=>{
        const options = generateSaveOptions()
        canvas.setViewportTransform([1,0,0,1,0,0])
        const dataUrl = canvas.toDataURL(options)
        downloadCanvasImage(dataUrl,"png")
        autoZoom()
    }
    const saveSvg = ()=>{
        const options = generateSaveOptions()
        canvas.setViewportTransform([1,0,0,1,0,0])
        const dataUrl = canvas.toDataURL(options)
        downloadCanvasImage(dataUrl,"svg")
        autoZoom()
    }
    const saveJpg = ()=>{
        const options = generateSaveOptions()
        canvas.setViewportTransform([1,0,0,1,0,0])
        const dataUrl = canvas.toDataURL(options)
        downloadCanvasImage(dataUrl,"jpg")
        autoZoom()
    }
    const saveJson = async()=>{
        const dataUrl = canvas.toJSON(KEYS)
        await transformText(dataUrl.objects)
        const fileString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(dataUrl, null, "\t")
        )}`
        downloadCanvasImage(fileString,"json")
    }
    const loadFromJSON = (json: string)=>{
        const data = JSON.parse(json);
        canvas.loadFromJSON(data, ()=>{
            autoZoom()
        })
    }

    const getWorkspace = ()=>{
        return canvas.getObjects().find((obj)=>obj.name === 'clip')
    }

    const center = (object: fabric.Object )=>{
        const workspace = getWorkspace();
        const center = workspace?.getCenterPoint();
        //@ts-ignore
        canvas._centerObject(object, center)
    }
    return{
        saveJpg,
        savePng,
        saveJson,
        saveSvg,
        loadFromJSON,
        getWorkspace,
        canUndo,
        canRedo, 
        autoZoom:()=>autoZoom(),
        zoomIn:()=>{
            let zoomRatio = canvas.getZoom();
            zoomRatio += 0.05
            const center = canvas.getCenter()
            canvas.zoomToPoint(
                new fabric.Point(center.left, center.top),
                zoomRatio
            )
        },
        zoomOut:()=>{
            let zoomRatio = canvas.getZoom();
            zoomRatio -= 0.05
            const center = canvas.getCenter()
            canvas.zoomToPoint(
                new fabric.Point(center.left, center.top),
                zoomRatio < 0.2 ?  0.2 : zoomRatio
            )
        },
        changeSize:(value:{width:number, height: number})=>{
            const workspace = getWorkspace();
            workspace?.set(value)
            autoZoom()
            save()
        },
        changeBackground:(value:string)=>{
            const workspace = getWorkspace()
            workspace?.set({fill: value})
            canvas.renderAll()
            save()
        },
        enableDrawing:()=>{
            canvas.discardActiveObject()
            canvas.renderAll()
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush.width = strokeWidth
            canvas.freeDrawingBrush.color = strokeColor
            canvas.freeDrawingBrush.strokeDashArray = strokeType
            
        },
        disableDrawing:()=>{
            canvas.isDrawingMode = false;
        },
        onUndo:()=>undo(),
        onRedo:()=>redo(),
        onCopy:()=>copy(),
        onPaste:()=>paste(),
        addImage : (value:string)=>{
            fabric.Image.fromURL(
                value,
                (image)=>{
                    const workspace = getWorkspace();
                    image.scaleToWidth(workspace?.width || 0)
                    image.scaleToHeight(workspace?.height || 0)

                    center(image)
                    canvas.add(image)
                    canvas.setActiveObject(image)
                },
                {
                    crossOrigin: "anonymous"
                }
            )
        },
        changeImageFilter: (value: string)=>{
            const objects = canvas.getActiveObjects()
            objects.forEach((object)=>{
                if(object.type==="image"){
                    const imageObject = object as fabric.Image;
                    const effect = createFilter(value);

                    imageObject.filters = effect? [effect]:[]
                    imageObject.applyFilters();
                    canvas.renderAll()
                }
            })
        },
        deleteObject:()=>{
            canvas.getActiveObjects().forEach(element => {
                canvas.remove(element)
            });
            canvas.discardActiveObject()
            canvas.renderAll()
        },
        changeOpacity:(value:number)=>{
            setOpacity(value)
            canvas.getActiveObjects().forEach(element => {
                element.set({opacity: value})
            });
            canvas.renderAll()
        },
        bringForward:()=>{
            canvas.getActiveObjects().forEach(element=>{
                canvas.bringForward(element)
            })
            canvas.renderAll()
            const workspace = getWorkspace()
            workspace?.sendToBack()
        },
        sendBackward:()=>{
            canvas.getActiveObjects().forEach(element=>{
                canvas.sendBackwards(element)
            })
            canvas.renderAll()
            const workspace = getWorkspace()
            workspace?.sendToBack()
        },
        changeFillColor:(value:string)=>{
            setFillColor(value)
            canvas.getActiveObjects().forEach(element => {
                element.set({fill: value})
            });
            canvas.renderAll()
        },
        changeStrokeColor:(value:string)=>{
            setStrokeColor(value)
            canvas.getActiveObjects().forEach(element => {
                if (element instanceof fabric.Group) {
                    // Iterate over objects in the group
                    element.getObjects().forEach(obj => {
                        if (isTextType(obj.type)) {
                            obj.set({ fill: value });
                        } else {
                            obj.set({ stroke: value, fill:value });
                        }
                    });
                }
                else if(isTextType(element.type)){
                    element.set({fill: value})
                }else{
                    element.set({stroke: value})
                }
            });
            canvas.freeDrawingBrush.color = value
            canvas.renderAll()
        },
        changeStrokeWidth:(value:number)=>{
            setStrokeWidth(value)
            canvas.getActiveObjects().forEach(element => {
                element.set({strokeWidth: value})
            });
            canvas.freeDrawingBrush.width = value
            canvas.renderAll()
        },
        changeStrokeType:(value:number[])=>{
            setStrokeType(value)
            canvas.getActiveObjects().forEach(element=>{
                element.set({strokeDashArray: value})
            })
            canvas.freeDrawingBrush.strokeDashArray = value
            canvas.renderAll()
        },
        changeFont:(value:string)=>{
            setFont(value)
            canvas.getActiveObjects().forEach(element => {
                if(isTextType(element.type)){
                    //@ts-ignore
                    element.set({fontFamily: value})
                    // element._set("fontFamily", value)
                }
            });
            canvas.renderAll()
        },
        changeFontWeight:(value:number)=>{
            canvas.getActiveObjects().forEach(element => {
                if(isTextType(element.type)){
                    if(value==700){
                        setFontWeight(300)
                        //@ts-ignore
                        element.set({fontWeight: 300})
                    }else{
                        setFontWeight(700)
                        //@ts-ignore
                        element.set({fontWeight: 700})
                    }
                }
            });
            canvas.renderAll()
        },
        changeFontStyle:(value:string)=>{
            canvas.getActiveObjects().forEach(element => {
                if(isTextType(element.type)){
                    if(value=="normal"){
                        setFontStyle("italic")
                        //@ts-ignore
                        element.set({fontStyle: "italic"})
                    }else{
                        setFontStyle("normal")
                        //@ts-ignore
                        element.set({fontStyle: "normal"})
                    }
                }
            });
            canvas.renderAll()
        },
        changeFontSize:(value:number)=>{
            canvas.getActiveObjects().forEach(element => {
                if(isTextType(element.type)){
                    if(value>100){
                        value=100;
                    }else if(value<10){
                        value=10
                    }
                    setFontSize(value)
                    //@ts-ignore
                    element.set({fontSize: value})
                }
            });
            canvas.renderAll()
        },
        changeUnderline:(value:boolean)=>{
            canvas.getActiveObjects().forEach(element => {
                if(isTextType(element.type)){
                    setUnderline(!value)
                    //@ts-ignore
                    element.set({underline: !value})
                }
            });
            canvas.renderAll()
        },
        changeLineThrough:(value:boolean)=>{
            canvas.getActiveObjects().forEach(element => {
                if(isTextType(element.type)){
                    setLineThrough(!value)
                    //@ts-ignore
                    element.set({linethrough: !value})
                }
            });
            canvas.renderAll()
        },
        changeTextAlign:(value:string)=>{
            console.log(value)
            canvas.getActiveObjects().forEach(element => {
                if(isTextType(element.type)){
                    setTextAlign(value)
                    //@ts-ignore
                    element.set({textAlign: value})
                }
            });
            canvas.renderAll()
        },
        changeTextShadow:(color: string)=>{
            const shadow = new fabric.Shadow({
                color: color, 
                blur: 30, 
                offsetX: 0,
                offsetY: 0
            })
            canvas.getActiveObjects().forEach(element => {
                if(isTextType(element.type)){
                    setTextShadow((color))
                    element.set({shadow: shadow})

                }
            });
            canvas.renderAll()
        },
        addText:(value, option)=>{
            var shadow = new fabric.Shadow({
                color: fillColor,
                blur: 20,
            });
            const object = new fabric.Textbox(value,{
                fill: fillColor,
                fontFamily:font,
                fontStyle: "normal",
                textAlign:"left",
                fontSize: fontSize,
                height: 100,
                fontWeight: fontWeight,
                linethrough: false,
                underline: false,
                width: 260,
                shadow: textShadow,
                ...option
            })
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addCircle:()=>{
            const object=new fabric.Circle({
                height: 100,
                width: 100,
                radius: 60,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeType,
                opacity:1,
            })
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addHorizontalEllipse:()=>{
            const object=new fabric.Ellipse({
                height: 100,
                width:100,
                rx: 50,
                ry: 70,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeType,
                opacity:1,
            })
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addVerticalEllipse:()=>{
            const object=new fabric.Ellipse({
                height: 100,
                width: 100,
                rx: 70,
                ry: 50,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeType,
                opacity:1,
            })
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addLine:()=>{
            const object=new fabric.Line(
                [50, 100, 200, 200],
                {
                    fill: fillColor,
                    stroke:strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity:1,
                }
            )
            
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
            
        },
        addSingleHeadArrow:()=>{
            var triangle = new fabric.Triangle({
                width: 10, 
                height: 15, 
                fill: strokeColor, 
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                opacity: 1,
                left: 235, 
                top: 65,
                angle: 90
            });
            
            var line = new fabric.Line([50, 100, 200, 100], {
                left: 75,
                top: 70,
                stroke: strokeColor,  
                strokeDashArray: [5,5],
                strokeWidth: strokeWidth,
                opacity: 1
            });
            
            triangle.set({
                fill: strokeColor,
                stroke: strokeColor
            });
            
            line.set({
                stroke: strokeColor,
            });
            
            var objs = [line, triangle];
            
            var alltogetherObj = new fabric.Group(objs);
            
            alltogetherObj.forEachObject(obj => {
                obj.set({
                    fill: strokeColor,
                    stroke: strokeColor,
                });
            });
            alltogetherObj.setCoords();
            
            center(alltogetherObj);
            canvas.add(alltogetherObj);
            canvas.setActiveObject(alltogetherObj);
            
        },
        addDashedSingleHeadArrow:()=>{
            var triangle = new fabric.Triangle({
                width: 10, 
                height: 15, 
                fill: strokeColor, 
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                opacity: 1,
                left: 235, 
                top: 65,
                angle: 90
            });
            
            var line = new fabric.Line([50, 100, 200, 100], {
                left: 75,
                top: 70,
                stroke: strokeColor,  
                strokeDashArray: [5,5],
                strokeWidth: strokeWidth,
                opacity: 1
            });
            
            triangle.set({
                fill: strokeColor,
                stroke: strokeColor
            });
            
            line.set({
                stroke: strokeColor,
            });
            
            var objs = [line, triangle];
            
            var alltogetherObj = new fabric.Group(objs);
            
            alltogetherObj.forEachObject(obj => {
                obj.set({
                    fill: strokeColor,
                    stroke: strokeColor,
                });
            });
            alltogetherObj.setCoords();
            
            center(alltogetherObj);
            canvas.add(alltogetherObj);
            canvas.setActiveObject(alltogetherObj);
            
        },
        addDoubleHeadArrow: () => {
            var line = new fabric.Line([50, 100, 200, 100], {
                stroke: strokeColor,  
                strokeDashArray: strokeType , 
                strokeWidth: strokeWidth,
                opacity: 1
            });
        
            var leftTriangle = new fabric.Triangle({
                width: 10,
                height: 15,
                fill: strokeColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                opacity: 1,
                left: 50, 
                top: 110,
                angle: -90 
            });
        
            var rightTriangle = new fabric.Triangle({
                width: 10,
                height: 15,
                fill: strokeColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                opacity: 1,
                left: 200, 
                top: 95,
                angle: 90 
            });
        
            var objs = [line, leftTriangle, rightTriangle];
        
            
            var alltogetherObj = new fabric.Group(objs);
        
            // Ensure bounding box and positioning is correct
            alltogetherObj.setCoords();
        
            center(alltogetherObj);
            canvas.add(alltogetherObj);
            canvas.setActiveObject(alltogetherObj);
        },        
        addDashedDoubleHeadArrow: () => {
            var line = new fabric.Line([50, 100, 200, 100], {
                stroke: strokeColor,  
                strokeDashArray: [5,5] , 
                strokeWidth: strokeWidth,
                opacity: 1
            });
        
            var leftTriangle = new fabric.Triangle({
                width: 10,
                height: 15,
                fill: strokeColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                opacity: 1,
                left: 48, 
                top: 110,
                angle: -90 
            });
        
            var rightTriangle = new fabric.Triangle({
                width: 10,
                height: 15,
                fill: strokeColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                opacity: 1,
                left: 200, 
                top: 95,
                angle: 90 
            });
        
            var objs = [line, leftTriangle, rightTriangle];
        
            
            var alltogetherObj = new fabric.Group(objs);
        
            // Ensure bounding box and positioning is correct
            alltogetherObj.setCoords();
        
            center(alltogetherObj);
            canvas.add(alltogetherObj);
            canvas.setActiveObject(alltogetherObj);
        }, 
        addArrowWithCircle: () => {
            var line = new fabric.Line([50, 100, 200, 100], {
                stroke: strokeColor,  
                strokeDashArray: strokeType || [],
                strokeWidth: strokeWidth,
                opacity: 1
            });
        
            var arrowhead = new fabric.Triangle({
                width: 10,
                height: 15,
                fill: strokeColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                opacity: 1,
                left: 200, 
                top: 95,
                angle: 90 
            });
        
            var LeftCircle = new fabric.Circle({
                radius: 5,
                fill: strokeColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                opacity: 1,
                left: 50, 
                top: 102,
                originX: "center",
                originY: "center"
            });
        
            var objs = [line, LeftCircle, arrowhead];
        
            var alltogetherObj = new fabric.Group(objs);
        
            alltogetherObj.setCoords();
        
            center(alltogetherObj);
            canvas.add(alltogetherObj);
            canvas.setActiveObject(alltogetherObj);
        },
        addArrowWithRectangle: () => {
            var line = new fabric.Line([50, 100, 200, 100], {
                stroke: strokeColor,  
                strokeDashArray: strokeType || [],
                strokeWidth: strokeWidth,
                opacity: 1
            });
        
            var arrowhead = new fabric.Triangle({
                width: 10,
                height: 15,
                fill: strokeColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                opacity: 1,
                left: 200, 
                top: 95,
                angle: 90 
            });
        
            var LeftRectangle = new fabric.Rect({
                width: 10,
                height: 10,
                fill: strokeColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                opacity: 1,
                left: 50, 
                top: 102, 
                originX: "center",
                originY: "center"
            });
        
            var objs = [line, LeftRectangle, arrowhead];
        
            var alltogetherObj = new fabric.Group(objs);
        
            alltogetherObj.setCoords();
        
            center(alltogetherObj);
            canvas.add(alltogetherObj);
            canvas.setActiveObject(alltogetherObj);
        },              
        addRoundedRectangle:()=>{
            const object=new fabric.Rect({
                height: 100,
                width: 100,
                rx: 10,
                ry: 10,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeType,
                opacity:1,
            })
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addRectangle:()=>{
            const object=new fabric.Rect({
                height: 100,
                width: 100,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeType,
                opacity:1,
            })
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addDiamond:()=>{
            const WIDTH= 140;
            const HEIGHT=140;
            const object=new fabric.Polygon(
                [
                    {x:WIDTH/2, y:0},
                    {x:WIDTH, y:HEIGHT/2},
                    {x:WIDTH/2, y:HEIGHT},
                    {x:0, y:HEIGHT/2},
                ],
                {
                    height: 100,
                    width: 100, 
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity:1,
                }
            )
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addTriangle:()=>{
            const object=new fabric.Triangle({
                height: 100,
                width: 100,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeType,
                opacity:1,
            })
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addReverseTriangle:()=>{
            const WIDTH= 100;
            const HEIGHT=100;
            const object=new fabric.Polygon(
                [
                    {x:0, y:0},
                    {x:WIDTH, y:0},
                    {x:WIDTH/2, y:HEIGHT},
                ],
                {
                    height:100,
                    width:100,
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity:1,
                }
            )
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addStar:()=>{
            const createStarPoints=(centerX:number, centerY:number, outerRadius:number, innerRadius:number)=> {
                const points = [];
                const totalPoints = 5;
                const step = Math.PI / totalPoints;
                
                for (let i = 0; i < 2 * totalPoints; i++) {
                    const radius = i % 2 === 0 ? outerRadius : innerRadius;
                    const x = centerX + radius * Math.cos(i * step - Math.PI / 2);
                    const y = centerY + radius * Math.sin(i * step - Math.PI / 2);
                    points.push({ x, y });
                }
                
                return points;
            }
            
            const starPoints = createStarPoints(150, 150, 50, 20);
            const object = new fabric.Polygon(starPoints, {
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeType,
                opacity:1,
            })
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addPentagon:()=>{
            const object = new fabric.Polygon([
                { x: 150, y: 100 }, 
                { x: 185, y: 130 }, 
                { x: 170, y: 170 }, 
                { x: 130, y: 170 }, 
                { x: 115, y: 130 } 
             ], {
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeType,
                opacity:1,
             })
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addHexagon:()=>{
            const object = new fabric.Polygon([
                { x: 150, y: 100 },
                { x: 185, y: 125 },  
                { x: 185, y: 165 },  
                { x: 150, y: 190 },
                { x: 115, y: 165 },  
                { x: 115, y: 125 }  
             ], {
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeType,
                opacity:1,
             })
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addHeart:()=>{
            const object = new fabric.Path( `
                    M 150 200
                    C 50 100, 50 20, 150 80
                    C 250 20, 250 100, 150 200
                    Z
                `, {
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeType,
                opacity:1,
             })
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        strokeType,
        selectedObjects,
        opacity,
        font,
        fontWeight,   
        fontStyle,
        lineThrough,
        underline,
        textAlign,
        fontSize,
        textShadow 
    }
}

export const useEditor=({
    defaultState,
    defaultHeight,
    defaultWidth,
    clearSelectionCallback, 
    saveCallback
}: EditorHookProps)=>{
    const initialState = useRef(defaultState)
    const initialHeight = useRef(defaultHeight)
    const initialWidth = useRef(defaultWidth)
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const [container, setContainer] = useState<HTMLDivElement | null>(null)
    const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([])
    const [fillColor, setFillColor] = useState("#000000")
    const [strokeColor, setStrokeColor] = useState("#000000")
    const [strokeWidth, setStrokeWidth] = useState(5)
    const [strokeType, setStrokeType] = useState<number[]>([])
    const [opacity, setOpacity] = useState<number>(1)
    const [font, setFont] = useState("Arial")
    const [fontWeight, setFontWeight] = useState(700)
    const [fontStyle, setFontStyle] = useState("normal")
    const [underline, setUnderline] = useState(false)
    const [lineThrough, setLineThrough] = useState(false)
    const [textAlign, setTextAlign] = useState("left")
    const [fontSize, setFontSize] = useState(32)
    const [textShadow, setTextShadow] = useState("white")
 

    const {save, undo, redo, canRedo, canUndo, canvasHistory, setHistoryIndex} = useHistory({canvas, saveCallback})
    const {copy, paste} = useClipboard({canvas})
    const {autoZoom} = useAutoResizer({canvas,container})

    useWindowEvents()
    useCanvasEvents({canvas, setSelectedObjects, save, clearSelectionCallback})
    useShortcutKeys({canvas, undo, redo, save, copy, paste})
    useLoadState({canvas, autoZoom, initialState, canvasHistory, setHistoryIndex})
    const editor=useMemo(()=>{
        if(canvas){
            return buildEditor({
                canvas,
                save,
                undo,
                redo,
                canRedo,
                canUndo,
                autoZoom,
                copy,
                paste,
                fillColor,
                setFillColor,
                strokeColor,
                setStrokeColor,
                strokeWidth,
                setStrokeWidth,
                strokeType,
                setStrokeType,
                opacity,
                setOpacity,
                selectedObjects,
                font,
                setFont,
                fontWeight,
                setFontWeight,
                fontStyle,
                setFontStyle,
                underline,
                setUnderline,
                lineThrough,
                setLineThrough,
                textAlign,
                setTextAlign,
                fontSize,
                setFontSize,
                textShadow,
                setTextShadow
            })
        }
        return undefined
    },[
        canvas,
        save,
        undo,
        redo,
        canUndo,
        canRedo,
        autoZoom,
        copy,
        paste,
        fillColor,
        strokeColor,
        strokeWidth,
        strokeType,
        selectedObjects,
        opacity,
        font, 
        fontWeight,
        fontStyle,
        underline,
        lineThrough,
        textAlign,
        textShadow
    ])

    const init = useCallback(({
        initialCanvas,
        initialContainer
    }:{
        initialCanvas:fabric.Canvas,
        initialContainer:HTMLDivElement
    })=>{
        fabric.Object.prototype.set({
            cornerColor: "#FFF",
            cornerStyle:"circle",
            cornerSize:5.5,
            borderColor:"#3b82f6",
            borderScaleFactor:1.5,
            transparentCorners: false,
            borderOpacityWhenMoving:1,
            cornerStrokeColor:"#3b82f6", 
        })

        const initialWorkspace = new fabric.Rect({
            width: initialWidth.current,
            height: initialHeight.current,
            name: "clip",
            fill: "white",
            selectable: false,
            hasControls: false,
            shadow: new fabric.Shadow({
                color: "rgba(0,0,0,0.8)",
                blur: 5,
            })
        })
        initialCanvas.setWidth(initialContainer.offsetWidth)
        initialCanvas.setHeight(initialContainer.offsetHeight)
        initialCanvas.add(initialWorkspace)
        initialCanvas.centerObject(initialWorkspace)
        initialCanvas.clipPath = initialWorkspace 

        setCanvas(initialCanvas)
        setContainer(initialContainer)

        const currentState = JSON.stringify(initialCanvas.toJSON(KEYS))
        canvasHistory.current = [currentState]
        setHistoryIndex(0)

    },[
        setHistoryIndex,
        canvasHistory
    ])
    return{init, editor}
}   