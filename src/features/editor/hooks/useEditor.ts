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
    strokeType,
    setStrokeType,
    opacity,
    setOpacity,
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
        changeStrokeType:(value:number[])=>{
            setStrokeType(value)
            canvas.getActiveObjects().forEach(element=>{
                element.set({strokeDashArray: value})
            })
            canvas.renderAll()
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
            // const object = new fabric.Polygon([
            //     { x: 150, y: 50 },  // Top point
            //     { x: 170, y: 150 }, // Bottom right
            //     { x: 250, y: 150 }, // Top right
            //     { x: 190, y: 190 }, // Inner bottom right
            //     { x: 210, y: 290 }, // Bottom center
            //     { x: 150, y: 220 }, // Inner bottom left
            //     { x: 90, y: 290 },  // Bottom left
            //     { x: 110, y: 190 }, // Inner top left
            //     { x: 50, y: 150 },  // Top left
            //     { x: 130, y: 150 } 
            //  ], {
            //     fill: fillColor,
            //     stroke: strokeColor,
            //     strokeWidth: strokeWidth,
            //     strokeDashArray: strokeType,
            //     opacity:1,
            //  })
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
        opacity
         
    }
}

export const useEditor=()=>{
    const[canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const [container, setContainer] = useState<HTMLDivElement | null>(null)
    const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([])
    const [fillColor, setFillColor] = useState("#000000")
    const [strokeColor, setStrokeColor] = useState("#000000")
    const [strokeWidth, setStrokeWidth] = useState(5)
    const [strokeType, setStrokeType] = useState<number[]>([])
    const [opacity, setOpacity] = useState<number>(1)
 
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
                strokeType,
                setStrokeType,
                opacity,
                setOpacity,
                selectedObjects
            })
        }
        return undefined
    },[
        canvas,
        fillColor,
        strokeColor,
        strokeWidth,
        strokeType,
        selectedObjects,
        opacity
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