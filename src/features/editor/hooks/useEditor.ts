import { useCallback, useMemo, useState } from "react"
import  {fabric}  from "fabric"
import { useAutoResizer } from "./useAutoResizer"
import { buildEditorProps, Editor } from "../types"


const buildEditor =({canvas}:buildEditorProps):Editor=>{
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
        addCircle:()=>{
            const object=new fabric.Circle({
                height:100,
                width:100,
                fill:"#00000",
                stroke:"#00000",
                radius:60
            })
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
        addRoundedRectangle:()=>{
            const object=new fabric.Rect({
                height:100,
                width:100,
                fill:"#00000",
                stroke:"#00000",
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
                fill:"#00000",
                stroke:"#00000",
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
                    fill:"#00000",
                    stroke:"#00000",
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
                fill:"#00000",
                stroke:"#00000",
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
                    fill:"#00000",
                    stroke:"#00000",
                    
                }
            )
            center(object)
            canvas.add(object)
            canvas.setActiveObject(object)
        },
         
    }
}

export const useEditor=()=>{
    const[canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const [container, setContainer] = useState<HTMLDivElement | null>(null)
 
    useAutoResizer({canvas,container})

    const editor=useMemo(()=>{
        if(canvas){
            return buildEditor({canvas})
        }
        return undefined
    },[canvas])

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