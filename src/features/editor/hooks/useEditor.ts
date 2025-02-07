import { useCallback, useMemo, useState } from "react"
import  {fabric}  from "fabric"
import { useAutoResizer } from "./useAutoResizer"
import { buildEditorProps, Editor } from "../types"
import { useCanvasEvents } from "./useCanvasEvents"
import { isTextType } from "../utils"


const buildEditor =({
    canvas,
    fillColor,
    setFillColor,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    selectedObjects
}:buildEditorProps):Editor=>{
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
                if(isTextType(element.type)){
                    element.set({fill: value})
                }else{
                    element.set({stroke: value})
                }
            });
            canvas.renderAll()
        },
        changeStrokeWidth:(value:number)=>{
            setStrokeWidth(value)
            canvas.getActiveObjects().forEach(element => {
                element.set({strokeWidth: value})
            });
            canvas.renderAll()
        },
        addCircle:()=>{
            const object=new fabric.Circle({
                height:100,
                width:100,
                fill: fillColor,
                stroke:strokeColor,
                radius:60
            })
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addHorizontalEllipse:()=>{
            const object=new fabric.Ellipse({
                height:100,
                width:100,
                fill: fillColor,
                stroke:strokeColor,
                rx: 50,
                ry: 70
            })
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addVerticalEllipse:()=>{
            const object=new fabric.Ellipse({
                height:100,
                width:100,
                fill: fillColor,
                stroke:strokeColor,
                rx: 70,
                ry: 50
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
                }
            )
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addRoundedRectangle:()=>{
            const object=new fabric.Rect({
                height:100,
                width:100,
                fill: fillColor,
                stroke:strokeColor,
                rx: 10,
                ry: 10
            })
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addRectangle:()=>{
            const object=new fabric.Rect({
                height:100,
                width:100,
                fill: fillColor,
                stroke:strokeColor,
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
                    height:100,
                    width:100, 
                    fill: fillColor,
                    stroke:strokeColor,
                }
            )
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addTriangle:()=>{
            const object=new fabric.Triangle({
                height:100,
                width:100,
                fill: fillColor,
                stroke:strokeColor,
                // rx:10,
                // ry:10,
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
                    stroke:strokeColor,
                    
                }
            )
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        selectedObjects
         
    }
}

export const useEditor=()=>{
    const[canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const [container, setContainer] = useState<HTMLDivElement | null>(null)
    const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([])
    const [fillColor, setFillColor] = useState("#000000")
    const [strokeColor, setStrokeColor] = useState("#000000")
    const [strokeWidth, setStrokeWidth] = useState(5)
 
    useAutoResizer({canvas,container})

    useCanvasEvents({canvas, setSelectedObjects})

    const editor=useMemo(()=>{
        if(canvas){
            return buildEditor({
                canvas,
                fillColor,
                setFillColor,
                strokeColor,
                setStrokeColor,
                strokeWidth,
                setStrokeWidth,
                selectedObjects
            })
        }
        return undefined
    },[
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        selectedObjects
    ])

    const init = useCallback(({
        initialCanvas,
        initialContainer
    }:{
        initialCanvas:fabric.Canvas,
        initialContainer:HTMLDivElement
    })=>{
        console.log("hello")
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
            width: 500,
            height: 700,
            name: "clip",
            fill: "white",
            selectable: false,
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

    },[])
    return{init, editor}
}   