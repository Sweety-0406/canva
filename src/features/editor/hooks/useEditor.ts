import { useCallback, useMemo, useRef, useState } from "react"
import  {fabric}  from "fabric"
import { useAutoResizer } from "./useAutoResizer"
import { buildEditorProps, Editor, EditorHookProps, KEYS, projectJson } from "../types"
import { useCanvasEvents } from "./useCanvasEvents"
import { isTextType, createFilter, downloadCanvasImage, transformText } from "../utils"
import { useClipboard } from "./useClipboard"
import { useHistory } from "./useHistory"
import { useShortcutKeys } from "./useShortcutKeys"
import { useWindowEvents } from "./useWindowEvents"
import useLoadState from "./useLoadState"
import { jsPDF } from "jspdf";
import { v4 as uuidv4 } from "uuid";
  
type FontsLoaded = {
    [fontFamily: string]: boolean;
};
const buildEditor =({
    canvas,
    loadFont,
    save,
    undo,
    redo,
    canUndo,
    canRedo,
    autoZoom,
    copy,
    copyPage,
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
    blur,
    setBlur,
    textShadow,
    setTextShadow,
    gradientColor,
    setGradientColor,
    gradientType,
    setGradientType,
    offsetX,
    setOffsetX,
    offsetY,
    setOffsetY,

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


    const savePdf = async (
        pages: projectJson[],
        canvasSize: { width: number; height: number }
    ) => {
    if (!pages || pages.length === 0) return;

    const { width, height } = canvasSize;
    const orientation = width > height ? "landscape" : "portrait";

    const pdf = new jsPDF({
        orientation,
        unit: "px",
        format: [width, height],
    });

    const tempCanvas = new fabric.StaticCanvas(null, {
        width: width,  
        height: height, 
        enableRetinaScaling: true,
    });

    const initialWorkspace = new fabric.Rect({
        width,
        height,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
            color: "rgba(0,0,0,0.8)",
            blur: 5,
        }),
    });

    // Sort by page index (optional but useful)
    const sortedPages = [...pages].sort((a, b) => a.index - b.index);

    for (let i = 0; i < sortedPages.length; i++) {
        const page = sortedPages[i];
        
        // Parse stringified JSON
        let parsedJson;
        try {
            parsedJson = JSON.parse(page.json);
        } catch (err) {
            console.error("Invalid JSON at index:", i);
            console.error("Error:", err);
            continue;
        }

        // Load and render
        tempCanvas.clear();
        tempCanvas.add(initialWorkspace);
        
        await new Promise<void>((resolve) => {
            tempCanvas.loadFromJSON(parsedJson, () => {
                tempCanvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
                tempCanvas.renderAll();
                resolve();
            });
        });
        
        const clipObject = tempCanvas.getObjects().find(obj => obj.name === "clip");
        
        let clipBounds = {
            left: 0,
            top: 0,
            width: width,
            height: height
        };
        
        if (clipObject) {
            clipBounds = {
                left: clipObject.left || 0,
                top: clipObject.top || 0,
                width: clipObject.width || width,
                height: clipObject.height || height
            };
        }
        
        const dataUrl = tempCanvas.toDataURL({
            format: "png",
            multiplier: 2,
            left: clipBounds.left,
            top: clipBounds.top,
            width: clipBounds.width,
            height: clipBounds.height,
        });

        if (i !== 0) pdf.addPage([clipBounds.width, clipBounds.height], orientation);
            pdf.addImage(dataUrl, "PNG", 0, 0, clipBounds.width, clipBounds.height);
        }

        pdf.save(`${uuidv4()}.pdf`);
    };

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
        //@ts-expect-error typescript error
        canvas._centerObject(object, center)
    }
    return{
        loadFont,
        saveJpg,
        savePng,
        saveJson,
        savePdf,
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

        changeGradientBackground: ( value: string[], gradientType: string, angle: number, object?: fabric.Object) => {
            const workspace = getWorkspace();
            if (!workspace) return;
            setGradientColor(value)
            setGradientType(gradientType)
            const target = object ?? workspace;
            const objWidth = object ? object.getScaledWidth() : workspace.width! * workspace.scaleX!;
            const objHeight = object ? object.getScaledHeight() : workspace.height! * workspace.scaleY!;

            function generateColorStops(colors: string[]): fabric.IGradientOptions['colorStops'] {
                const total = colors.length;
                return colors.map((color, index) => ({
                offset: index / (total - 1),
                color,
                }));
            }

            function createLinearGradientAtAngle(
                width: number,
                height: number,
                colors: string[],
                angleDegrees: number
            ): fabric.Gradient {
                const angleRadians = (angleDegrees * Math.PI) / 180;
                const halfDiag = Math.sqrt(width * width + height * height) / 2;

                const xCenter = width / 2;
                const yCenter = height / 2;

                const x1 = xCenter - halfDiag * Math.cos(angleRadians);
                const y1 = yCenter - halfDiag * Math.sin(angleRadians);
                const x2 = xCenter + halfDiag * Math.cos(angleRadians);
                const y2 = yCenter + halfDiag * Math.sin(angleRadians);

                return new fabric.Gradient({
                type: 'linear',
                gradientUnits: 'pixels',
                coords: { x1, y1, x2, y2 },
                colorStops: generateColorStops(colors),
                });
            }

            function createRadialGradient(
                width: number,
                height: number,
                colors: string[]
            ): fabric.Gradient {
                const xCenter = width / 2;
                const yCenter = height / 2;
                const radius = Math.max(width, height) / 2;

                return new fabric.Gradient({
                    type: 'radial',
                    gradientUnits: 'pixels',
                    coords: {
                        x1: xCenter,
                        y1: yCenter,
                        r1: 0,
                        x2: xCenter,
                        y2: yCenter,
                        r2: radius,
                    },
                    colorStops: generateColorStops(colors),
                });
            }


            const linearGradient = createLinearGradientAtAngle(
                objWidth,
                objHeight,
                value,
                angle+90 
            );
            
            const radialGradient = createRadialGradient(
                objWidth,
                objHeight,
                value,
            );
            
            target.set('fill', gradientType === 'linear' ? linearGradient : radialGradient);

            canvas.renderAll();
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
        onCopyPage: ()=>copyPage(),        
        addImage : (value:string)=>{
            fabric.Image.fromURL(
                value,
                (image)=>{
                    const workspace = getWorkspace();
                    image.scaleToWidth(workspace?.width || 0)
                    image.scaleToHeight(workspace?.height || 0)

                    const blurFilter = new fabric.Image.filters.Blur({
                        blur: blur, // Range: 0 to ~1, adjust to taste
                    });

                    image.filters = [blurFilter]; // Assign the filter(s)
                    image.applyFilters();

                    center(image)
                    canvas.add(image)
                    canvas.setActiveObject(image)
                    canvas.requestRenderAll();
                },
                {
                    crossOrigin: "anonymous"
                }
            )
        },
        addSVGImage:(url: string)=>{
            const svgString = url
            fabric.loadSVGFromString(svgString, (objects, options) => {
                const obj = fabric.util.groupSVGElements(objects, options);
                obj.scaleToWidth(400); 
                // obj.set({ type: 'svg' });
                // (obj as fabric.Object & { objectType?: string }).set({ type: 'custom-svg' });

                canvas.add(obj);
                canvas.centerObject(obj);
                canvas.renderAll();
            })

        },
        addVideo: (url: string) => {
          
            const videoEl = document.createElement("video");
            const source = document.createElement("source");
          
            // Set up the video element
            videoEl.width = 480;
            videoEl.height = 360;
            videoEl.muted = true;
            videoEl.autoplay = true;
            videoEl.loop = true;
            videoEl.playsInline = true;
            videoEl.crossOrigin = "anonymous"; 
          
            // Attach video source
            source.src = url;
            videoEl.appendChild(source);
          
            videoEl.onended = () => videoEl.play(); // Looping fallback
          
            videoEl.addEventListener("loadeddata", () => {
              videoEl.play(); // Ensure it starts playing
          
              const fabricVideo = new fabric.Image(videoEl, {
                left: 200,
                top: 200,
                originX: "center",
                originY: "center",
                objectCaching: false,
              });
          
              const workspace = getWorkspace();
              if (workspace?.width && workspace?.height) {
                fabricVideo.scaleToWidth(workspace.width);
                fabricVideo.scaleToHeight(workspace.height);
              }
          
              center(fabricVideo);
              canvas.add(fabricVideo);
              canvas.setActiveObject(fabricVideo);
          
              // Start render loop
              const render = () => {
                canvas.renderAll();
                requestAnimationFrame(render);
              };
              render();
            });
          
            videoEl.addEventListener("error", (e) => {
              console.error("Video failed to load", e);
            });
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
                        if(isTextType(obj.type)) {
                            obj.set({ stroke: value });
                        } else {
                            obj.set({ stroke: value});
                            // obj.set({ stroke: value, fill:value });
                        }
                    });
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
            loadFont(value)
            setFont(value)
            canvas.getActiveObjects().forEach(element => {
                if(isTextType(element.type)){
                    //@ts-expect-error typescript error
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
                        //@ts-expect-error typescript error
                        element.set({fontWeight: 300})
                    }else{
                        setFontWeight(700)
                        //@ts-expect-error typescript error
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
                        //@ts-expect-error typescript error
                        element.set({fontStyle: "italic"})
                    }else{
                        setFontStyle("normal")
                        //@ts-expect-error typescript error
                        element.set({fontStyle: "normal"})
                    }
                }
            });
            canvas.renderAll()
        },
        changeBlur: (value: number) => {
            setBlur(value)
            canvas.getActiveObjects().forEach((obj) => {
                if (obj instanceof fabric.Image) {
                    // Set or update the blur filter
                    const blurFilter = new fabric.Image.filters.Blur({ blur: value });

                    obj.filters = [blurFilter]; // Replace any existing filters
                    obj.applyFilters(); // Apply the filters to the image
                }
            });

            canvas.requestRenderAll();
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
                    //@ts-expect-error typescript error
                    element.set({fontSize: value})
                }
            });
            canvas.renderAll()
        },       
             
        changeUnderline:(value:boolean)=>{
            canvas.getActiveObjects().forEach(element => {
                if(isTextType(element.type)){
                    setUnderline(!value)
                    //@ts-expect-error typescript error
                    element.set({underline: !value})
                }
            });
            canvas.renderAll()
        },
        changeLineThrough:(value:boolean)=>{
            canvas.getActiveObjects().forEach(element => {
                if(isTextType(element.type)){
                    setLineThrough(!value)
                    //@ts-expect-error typescript error
                    element.set({linethrough: !value})
                }
            });
            canvas.renderAll()
        },
        changeTextAlign:(value:string)=>{
            canvas.getActiveObjects().forEach(element => {
                if(isTextType(element.type)){
                    setTextAlign(value)
                    //@ts-expect-error typescript error
                    element.set({textAlign: value})
                }
            });
            canvas.renderAll()
        },
        changeTextShadow:(color: string )=>{
            const shadow = new fabric.Shadow({
                color: color, 
                blur: 30, 
                offsetX: offsetX,
                offsetY: offsetY
            })
            canvas.getActiveObjects().forEach(element => {
                // if(isTextType(element.type)){
                    setTextShadow((color))
                    element.set({shadow: shadow})
                // }
            }); 
            canvas.renderAll()
        },
        changeOffsetX:(value:number)=>{
            setOffsetX(value)
            // canvas.getActiveObjects().forEach(element => {
            // });
            // canvas.renderAll()
        },  
        changeOffsetY:(value:number)=>{
            setOffsetY(value)
            // canvas.getActiveObjects().forEach(element => {
            // });
            // canvas.renderAll()
        },  
        addText:(value, option)=>{
            const object = new fabric.Textbox(value,{
                fill: fillColor,
                stroke: strokeColor,  
                strokeWidth: 1,  
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
        addLine:(strokeWidth: number)=>{
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
        addSingleHeadArrow: (strokeWidth) => {
            const line = new fabric.Line([50, 100, 200, 100], {
                stroke: strokeColor,  
                // strokeDashArray: [] , 
                strokeWidth: strokeWidth,
                opacity: 1
            });

        
            const rightTriangle = new fabric.Triangle({
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
        
            const objs = [line, rightTriangle];
            
            const alltogetherObj = new fabric.Group(objs);
        
            // Ensure bounding box and positioning is correct
            alltogetherObj.setCoords();
        
            center(alltogetherObj);
            canvas.add(alltogetherObj);
            canvas.setActiveObject(alltogetherObj);
        },
        addDashedSingleHeadArrow:(strokeWidth: number)=>{
            const triangle = new fabric.Triangle({
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
            
            const line = new fabric.Line([50, 100, 200, 100], {
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
            
            const objs = [line, triangle];
            
            const alltogetherObj = new fabric.Group(objs);
            
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
        addDoubleHeadArrow: (strokeWidth: number) => {
            const line = new fabric.Line([50, 100, 200, 100], {
                stroke: strokeColor,  
                // strokeDashArray: [] , 
                strokeWidth: strokeWidth,
                opacity: 1
            });
        
            const leftTriangle = new fabric.Triangle({
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
        
            const rightTriangle = new fabric.Triangle({
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
        
            const objs = [line, leftTriangle, rightTriangle];
            
            const alltogetherObj = new fabric.Group(objs);
        
            // Ensure bounding box and positioning is correct
            alltogetherObj.setCoords();
        
            center(alltogetherObj);
            canvas.add(alltogetherObj);
            canvas.setActiveObject(alltogetherObj);
        },        
        addDashedDoubleHeadArrow: (strokeWidth: number) => {
            const line = new fabric.Line([50, 100, 200, 100], {
                stroke: strokeColor,  
                strokeDashArray: [5,5] , 
                strokeWidth: strokeWidth,
                opacity: 1
            });
        
            const leftTriangle = new fabric.Triangle({
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
        
            const rightTriangle = new fabric.Triangle({
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
        
            const objs = [line, leftTriangle, rightTriangle];
            
            const alltogetherObj = new fabric.Group(objs);
        
            // Ensure bounding box and positioning is correct
            alltogetherObj.setCoords();
        
            center(alltogetherObj);
            canvas.add(alltogetherObj);
            canvas.setActiveObject(alltogetherObj);
        }, 
        addArrowWithCircle: (strokeWidth: number) => {
            const line = new fabric.Line([50, 100, 200, 100], {
                stroke: strokeColor,  
                strokeDashArray: strokeType || [],
                strokeWidth: strokeWidth,
                opacity: 1
            });
        
            const arrowhead = new fabric.Triangle({
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
        
            const LeftCircle = new fabric.Circle({
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
        
            const objs = [line, LeftCircle, arrowhead];
        
            const alltogetherObj = new fabric.Group(objs);
        
            alltogetherObj.setCoords();
        
            center(alltogetherObj);
            canvas.add(alltogetherObj);
            canvas.setActiveObject(alltogetherObj);
        },
        addArrowWithRectangle: (strokeWidth: number) => {
            const line = new fabric.Line([50, 100, 200, 100], {
                stroke: strokeColor,  
                strokeDashArray: strokeType || [],
                strokeWidth: strokeWidth,
                opacity: 1
            });
        
            const arrowhead = new fabric.Triangle({
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
        
            const LeftRectangle = new fabric.Rect({
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
        
            const objs = [line, LeftRectangle, arrowhead];
        
            const alltogetherObj = new fabric.Group(objs);
        
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
        addHeart: () => {
            const object = new fabric.Path(
                `
                M4610 7540 c-185 -23 -329 -66 -515 -154 -450 -214 -766 -558 -910
                -991 -67 -199 -79 -284 -79 -535 0 -205 2 -236 27 -351 61 -287 177 -542 358
                -784 48 -65 474 -497 1538 -1560 810 -809 1476 -1470 1481 -1470 5 0 669 659
                1475 1465 1040 1039 1488 1493 1539 1560 247 324 378 682 393 1075 14 368 -77
                695 -278 995 -118 176 -329 374 -530 496 -407 248 -817 318 -1268 218 -514
                -115 -957 -441 -1265 -931 -32 -51 -62 -93 -66 -93 -4 0 -38 48 -75 106 -330
                518 -808 847 -1365 940 -108 18 -362 26 -460 14z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.02; 
            object.scale(scaleFactor);
            object.set("angle", 180);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addOctagon: () => {
            const object = new fabric.Path(
                `
                M637 1922 l-297 -297 0 -425 0 -425 293 -293 292 -292 425 0 425 0
                293 293 292 292 0 425 0 425 -298 298 -297 297 -415 0 -415 0 -298 -298z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.05; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        add6PointerStar: () => {
            const object = new fabric.Path(
                `
                M611 1316 c-57 -63 -111 -118 -120 -120 -9 -3 -78 -17 -153 -32 -76 -15 -138 -32 -138 -38 0 -5 21 -74 47 -151 l46 -141 -48 -143 c-26 -78 -43 -146 -39 -150 5 -5 74 -21 153 -37 l144 -29 106 -118 105 -117 21 22 c12 13 60 66 107 118 l86 95 144 29 c78 16 147 32 152 37 4 4 -13 72 -39 150 l-48 143 46 141 c26 77 47 146 47 152 0 6 -65 23 -147 39 l-148 28 -75 80 c-41 44 -91 98 -110 119 l-36 39 -103 -116z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        add4PointerStar: () => {
            const object = new fabric.Path(
                `
                M551 967 l-91 -162 -167 -65 c-93 -35 -184 -70 -203 -78 l-35 -14 204 -82 203 -81 91 -162 c50 -90 93 -163 96 -163 4 0 47 73 97 163 l91 162 204 82 c196 78 203 82 174 93 -16 6 -108 41 -203 78 l-172 66 -92 163 c-50 90 -95 163 -99 163 -4 0 -48 -73 -98 -163z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        add8PointerStar: () => {
            const object = new fabric.Path(
                `
               M705 1130 l-80 -88 -129 -1 -129 -1 5 -122 5 -123 -87 -80 c-49 -44 -88 -84 -88 -90 0 -5 39 -46 88 -90 l87 -80 -5 -123 -5 -122 129 -1 129 -1 82 -88 83 -88 84 89 84 89 127 0 128 0 -7 121 -7 122 92 86 92 86 -92 86 -92 86 7 121 7 122 -128 0 -127 0 -87 89 -86 89 -80 -88z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addStarBrust1: () => {
            const object = new fabric.Path(
                `
               M586 1104 c-27 -35 -53 -67 -57 -69 -4 -3 -44 11 -90 30 -45 20 -83 34 -85 33 -1 -2 -6 -41 -11 -88 l-8 -85 -93 -9 c-50 -5 -92 -13 -92 -18 0 -5 16 -40 35 -79 20 -38 33 -74 30 -79 -3 -4 -37 -28 -75 -51 -39 -24 -70 -47 -70 -50 0 -6 26 -24 142 -100 5 -3 -9 -42 -31 -87 -40 -79 -40 -80 -18 -86 12 -3 45 -6 74 -6 28 0 63 -4 77 -10 22 -8 26 -16 27 -52 0 -24 4 -62 7 -85 l7 -42 87 39 88 39 52 -74 c29 -41 55 -75 58 -74 3 0 29 33 59 73 l53 74 87 -38 86 -37 7 36 c4 20 7 54 8 76 1 62 8 67 107 76 48 4 89 8 91 8 1 1 -16 38 -39 82 -22 45 -36 85 -31 88 116 76 142 94 142 100 0 3 -34 28 -75 54 l-74 49 39 79 c22 43 40 80 40 82 0 2 -42 7 -92 11 -51 4 -95 12 -99 17 -3 6 -9 45 -13 87 -3 41 -8 77 -10 79 -2 2 -40 -12 -85 -32 -46 -19 -87 -33 -91 -30 -5 3 -30 35 -56 70 -26 36 -50 65 -53 65 -3 0 -28 -30 -55 -66z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addStarBrust2: () => {
            const object = new fabric.Path(
                `
                M666 1105 l-37 -56 -57 41 -57 41 -17 -68 c-9 -37 -17 -69 -17 -70 -1 0 -25 5 -53 13 -82 22 -80 23 -72 -55 l6 -69 -66 -7 c-36 -4 -66 -10 -66 -13 0 -3 14 -29 30 -59 17 -29 30 -55 30 -57 0 -3 -25 -19 -55 -36 -49 -28 -69 -49 -47 -50 4 -1 26 -18 49 -38 l43 -37 -45 -55 -45 -55 59 -20 c33 -11 62 -23 65 -26 3 -3 -3 -32 -14 -64 -11 -32 -20 -60 -20 -62 0 -1 32 -3 70 -3 l70 0 0 -65 c0 -75 1 -76 79 -40 30 14 55 24 56 23 1 -2 12 -29 26 -60 13 -32 29 -58 34 -58 6 0 30 20 54 44 l43 43 45 -49 c26 -27 49 -45 53 -41 3 4 17 33 30 63 13 30 25 56 26 58 0 1 25 -9 55 -23 78 -36 79 -35 79 40 l0 65 70 0 c39 0 70 2 70 3 0 2 -9 30 -20 62 -11 32 -17 61 -14 64 3 3 32 15 65 26 l59 20 -45 55 -45 55 43 37 c23 20 45 37 50 38 21 1 1 22 -48 50 -30 17 -55 35 -55 38 0 4 14 30 30 57 16 28 30 53 30 56 0 4 -30 10 -66 14 l-66 7 6 69 c8 78 10 77 -71 55 -29 -8 -53 -13 -54 -13 0 1 -8 33 -17 70 l-17 68 -57 -41 -57 -41 -37 56 c-20 30 -40 55 -44 55 -4 0 -24 -25 -44 -55z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addStarBrust3: () => {
            const object = new fabric.Path(
                `
                M577 1193 c-38 -27 -38 -27 -82 -11 l-43 16 -26 -39 c-25 -37 -29 -39 -76 -39 l-50 0 -11 -45 c-10 -41 -14 -45 -58 -58 l-46 -13 2 -47 c1 -45 -1 -49 -38 -74 -44 -29 -45 -30 -24 -80 16 -39 18 -33 -30 -98 -13 -19 -12 -24 15 -57 29 -36 30 -37 15 -78 -8 -24 -15 -45 -15 -49 0 -3 18 -17 40 -31 40 -24 40 -25 34 -71 l-6 -47 48 -14 c46 -13 49 -16 62 -61 l13 -47 47 0 c42 0 50 -4 78 -36 l30 -37 45 15 c44 15 44 14 81 -15 l37 -30 38 30 c36 28 40 29 73 17 52 -19 56 -17 80 21 20 33 25 35 76 35 36 0 54 4 54 13 0 6 5 28 10 47 9 31 16 37 55 48 l45 12 0 49 c0 45 2 50 39 74 l40 27 -16 45 c-15 45 -15 46 11 80 14 18 26 37 26 41 0 4 -12 23 -27 42 -28 37 -28 33 4 117 2 6 -15 21 -36 35 -37 22 -40 28 -43 74 -3 49 -4 50 -46 64 -38 12 -44 18 -54 58 l-12 44 -53 0 c-29 0 -53 3 -53 8 0 4 -11 20 -23 36 -24 29 -25 29 -70 17 -43 -13 -47 -12 -80 13 -18 14 -36 26 -38 26 -2 0 -21 -12 -42 -27z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.4; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addStarBrust4: () => {
            const object = new fabric.Path(
                `
                M644 1139 c-20 -20 -23 -20 -53 -5 -31 16 -32 16 -54 -9 -19 -22 -26 -24 -54 -16 -29 8 -32 7 -43 -20 -11 -25 -18 -29 -49 -29 -33 0 -38 -3 -46 -32 -8 -27 -16 -34 -42 -36 -30 -3 -33 -6 -33 -38 0 -30 -4 -37 -31 -46 -28 -10 -30 -14 -27 -45 4 -34 -2 -42 -50 -68 -1 -1 3 -16 9 -34 10 -28 9 -35 -11 -56 -22 -23 -22 -25 -6 -50 16 -24 16 -27 -1 -55 -17 -29 -16 -30 7 -55 21 -22 22 -28 11 -52 -12 -25 -10 -29 13 -48 19 -16 26 -30 26 -57 0 -32 3 -37 30 -43 26 -6 30 -11 30 -40 0 -33 13 -45 50 -45 14 0 21 -10 26 -36 6 -35 8 -36 40 -31 30 5 36 2 50 -25 14 -27 19 -29 50 -23 30 5 38 2 55 -19 20 -25 21 -25 51 -10 28 15 31 14 53 -6 l23 -22 30 22 c28 21 31 21 60 6 29 -15 31 -15 47 10 14 22 21 25 54 19 35 -6 39 -4 51 25 11 28 16 30 46 24 32 -6 34 -4 40 26 7 32 9 34 57 44 23 5 27 12 27 39 0 27 5 35 31 44 27 11 30 15 24 45 -6 29 -3 35 24 51 31 18 31 18 15 49 -16 31 -16 32 11 54 l28 22 -21 30 -22 30 21 26 21 27 -25 27 c-19 20 -24 31 -17 42 17 26 11 50 -16 62 -22 10 -24 16 -19 49 6 35 5 37 -24 44 -26 5 -30 11 -33 43 -3 34 -6 37 -38 42 -29 4 -36 10 -40 35 -4 26 -10 30 -43 33 -29 3 -40 9 -52 32 -14 27 -17 28 -45 19 -26 -10 -32 -8 -53 16 -22 26 -24 27 -53 12 -27 -14 -31 -14 -53 4 -29 24 -32 24 -57 -2z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addRightArrow: () => {
            const object = new fabric.Path(
                `
                M670 947 l0 -127 -265 0 -265 0 0 -265 0 -265 262 -2 263 -3 5 -128 5 -127 260 260 260 260 -263 263 -262 262 0 -128z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addLeftArrow: () => {
            const object = new fabric.Path(
                `
                M377 863 l-257 -258 260 -260 260 -260 0 128 0 127 265 0 265 0 0 265 0 265 -265 0 -264 0 -3 125 -3 125 -258 -257z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addUpArrow: () => {
            const object = new fabric.Path(
                `
                M340 805 l0 -265 -132 0 -133 0 263 -262 262 -263 262 263 263 262 -133 0 -132 0 0 265 0 265 -260 0 -260 0 0 -265z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
            
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
            
            center(object);
            
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addDownArrow: () => {
            const object = new fabric.Path(
                `
                M305 970 l-260 -260 133 0 132 0 0 -260 0 -260 265 0 265 0 0 260 0 259 127 3 127 3 -258 258 c-142 141 -261 257 -265 257 -3 0 -123 -117 -266 -260z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addArrowHorizontal: () => {
            const object = new fabric.Path(
                `
                M212 577 l-173 -173 175 -168 176 -168 0 81 0 81 175 0 174 0 3 -79 3 -80 173 167 173 167 -175 175 -176 175 0 -88 0 -87 -175 0 -174 0 -3 85 -3 85 -173 -173z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addArrowBlock: () => {
            const object = new fabric.Path(
                `
                M190 415 l0 -265 393 0 392 0 133 133 132 132 -133 133 -132 132 -393 0 -392 0 0 -265z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addArrowBlock2Right: () => {
            const object = new fabric.Path(
                `
                M120 722 c0 -4 59 -66 130 -137 l130 -130 -132 -132 -133 -133 405 0 405 0 135 135 135 135 -136 135 -135 135 -402 0 c-221 0 -402 -3 -402 -8z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addArrowBlockConcave: () => {
            const object = new fabric.Path(
                `
               M127 555 l68 -135 -68 -135 -67 -135 540 0 c297 0 540 2 540 5 0 3 -29 64 -65 135 l-65 130 65 130 c36 71 65 132 65 135 0 3 -243 5 -540 5 l-540 0 67 -135z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addArrowBlockConvex: () => {
            const object = new fabric.Path(
                `
               M320 515 l-135 -135 135 -135 135 -135 270 0 270 0 135 135 135 135 -135 135 -135 135 -270 0 -270 0 -135 -135z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addWhiteOblongShape: () => {
            const object = new fabric.Path(
                `
               M375 571 c-165 -77 -207 -298 -82 -430 18 -18 55 -44 82 -57 49 -24 53 -24 385 -24 332 0 336 0 385 24 207 98 206 385 -1 486 -38 19 -61 20 -385 20 -315 0 -347 -2 -384 -19z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addSquareSpeechBubble: () => {
            const object = new fabric.Path(
                `
                M180 780 l0 -420 105 0 104 0 3 -120 3 -120 195 120 195 120 238 0 237 0 0 420 0 420 -540 0 -540 0 0 -420z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addOvalSpeechBubble: () => {
            const object = new fabric.Path(
                `
                    M492 1120 c-116 -17 -227 -103 -280 -218 -22 -48 -26 -71 -26 -142 1 -115 33 -188 115 -265 32 -29 68 -56 79 -60 19 -6 20 -15 20 -126 0 -65 3 -119 6 -119 3 0 58 44 122 99 l118 98 165 5 c159 4 168 5 231 35 85 40 137 88 179 165 33 60 34 68 34 168 0 96 -3 110 -28 158 -59 112 -155 182 -277 201 -73 12 -378 13 -458 1z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addPlusShape: () => {
            const object = new fabric.Path(
                `
                    M480 1160 l0 -170 -172 -2 -173 -3 0 -210 0 -210 173 -3 172 -2 0 -175 0 -175 213 2 212 3 3 172 2 173 170 0 170 0 0 215 0 215 -170 0 -170 0 0 170 0 170 -215 0 -215 0 0 -170z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addCloudShape: () => {
            const object = new fabric.Path(
                `
                    M795 1208 c-16 -6 -42 -20 -58 -30 -24 -17 -33 -18 -77 -9 -64 14 -140 0 -200 -37 -36 -22 -49 -39 -67 -82 -18 -46 -27 -57 -54 -64 -44 -13 -96 -68 -108 -114 -20 -73 26 -151 110 -186 28 -12 38 -23 43 -47 22 -111 173 -177 301 -132 49 18 51 17 90 -2 84 -42 221 -19 283 47 17 19 33 25 73 26 99 2 165 37 198 105 27 55 26 73 -3 131 -20 40 -22 53 -14 84 27 96 -75 201 -196 202 -24 1 -36 8 -51 33 -31 48 -95 79 -174 83 -36 2 -79 -1 -96 -8z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addBanner2: () => {
            const object = new fabric.Path(
                `
                    M260 796 l0 -484 28 -10 c15 -5 110 -40 210 -76 101 -36 189 -66 195 -66 6 0 107 34 224 77 l213 76 0 484 0 483 -435 0 -435 0 0 -484z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addBanner3: () => {
            const object = new fabric.Path(
                `
                    M140 719 c0 -445 3 -560 13 -556 6 2 121 41 254 87 l241 82 252 -86 c138 -47 253 -86 256 -86 2 0 4 252 4 560 l0 560 -510 0 -510 0 0 -561z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addBanner4: () => {
            const object = new fabric.Path(
                `
                    M234 1283 c-14 -45 -30 -64 -65 -80 l-38 -18 -1 -452 c0 -452 0 -453 21 -453 27 0 79 -52 79 -79 0 -21 1 -21 454 -21 l455 0 6 23 c11 34 56 77 82 77 l23 0 0 454 0 454 -30 7 c-32 7 -67 44 -76 82 l-6 23 -449 0 c-419 0 -450 -1 -455 -17z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addBanner5: () => {
            const object = new fabric.Path(
                `
                    M187 1162 l-107 -107 0 -350 0 -350 103 -103 102 -102 350 0 350 0 102 102 103 103 0 350 0 350 -108 108 -107 107 -340 0 -340 0 -108 -108z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addBanner6: () => {
            const object = new fabric.Path(
                `
                    M463 1057 l-243 -31 0 -422 0 -422 38 -6 c20 -3 145 -19 278 -36 l241 -30 244 30 c134 16 261 33 282 36 l37 6 -2 421 -3 422 -245 32 c-135 17 -276 31 -315 31 -38 0 -179 -14 -312 -31z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addParallelogramRight: () => {
            const object = new fabric.Path(
                `
                    M162 620 l-140 -420 421 0 422 0 138 413 c75 227 137 416 137 420 0 4 -189 7 -419 7 l-419 0 -140 -420z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addParallelogramLeft: () => {
            const object = new fabric.Path(
                `
                    M190 1043 c0 -5 61 -191 136 -415 l136 -408 423 0 423 0 -137 412 -138 413 -421 3 c-232 1 -422 -1 -422 -5z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addTrapezoidUp: () => {
            const object = new fabric.Path(
                `
                   M335 1109 c-8 -13 -275 -810 -275 -821 0 -5 250 -8 555 -8 305 0 555 3 555 7 0 4 -62 193 -137 420 l-138 413 -277 0 c-186 0 -279 -4 -283 -11z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addTrapezoidDown: () => {
            const object = new fabric.Path(
                `
                   M140 1013 c0 -5 61 -191 136 -415 l136 -408 283 0 283 0 136 408 c75 224 136 410 136 415 0 4 -250 7 -555 7 -305 0 -555 -3 -555 -7z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addArchDown: () => {
            const object = new fabric.Path(
                `
                   M192 897 l3 -393 38 -76 c57 -117 162 -206 286 -244 59 -18 171 -18 237 0 164 43 303 192 334 356 6 29 10 210 10 401 l0 349 -455 0 -456 0 3 -393z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        addArchUp: () => {
            const object = new fabric.Path(
                `
                   M582 1379 c-151 -29 -284 -146 -339 -296 -23 -63 -23 -71 -23 -438 l0 -375 455 0 455 0 0 344 c0 189 -4 368 -10 397 -16 89 -72 190 -140 252 -113 105 -250 145 -398 116z
                `,
                {
                    fill: fillColor,
                    stroke: strokeColor,
                    strokeWidth: strokeWidth,
                    strokeDashArray: strokeType,
                    opacity: 1,
                }
            );
        
            const scaleFactor = 0.1; 
            object.scale(scaleFactor);
        
            center(object);
        
            canvas.add(object);
            canvas.setActiveObject(object);
        },
        
        addSVG: (url: string, fillColor: string, strokeColor: string, strokeWidth: number) => {
            fabric.loadSVGFromURL(url, (objects, options) => {
                const group = fabric.util.groupSVGElements(objects, options);
                group.set({
                    fill: fillColor, // Change fill color dynamically
                    stroke: strokeColor, // Change stroke color dynamically
                    strokeWidth: strokeWidth,
                });
        
                center(group);
                canvas.add(group);
                canvas.setActiveObject(group);
            });
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
        blur,
        textShadow ,
        gradientColor,
        gradientType,
        offsetX,
        offsetY,
    }
}

export const useEditor = ({
  defaultState,
  defaultHeight,
  defaultWidth,
  clearSelectionCallback,
  saveCallback,
  initialPageId
}: EditorHookProps) => {
    console.log("normalizedPageData2", initialPageId)
  const initialState = useRef(defaultState);
  const initialHeight = useRef(defaultHeight);
  const initialWidth = useRef(defaultWidth);

  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);
  const [fillColor, setFillColor] = useState("#000000");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [strokeType, setStrokeType] = useState<number[]>([]);
  const [opacity, setOpacity] = useState<number>(1);
  const [font, setFont] = useState("Arial");
  const [fontWeight, setFontWeight] = useState(700);
  const [fontStyle, setFontStyle] = useState("normal");
  const [underline, setUnderline] = useState(false);
  const [lineThrough, setLineThrough] = useState(false);
  const [textAlign, setTextAlign] = useState("left");
  const [fontSize, setFontSize] = useState(32);
  const [blur, setBlur] = useState(0);
  const [textShadow, setTextShadow] = useState("white");
  const [fontsLoaded, setFontsLoaded] = useState<FontsLoaded>({});
  const [gradientType, setGradientType] = useState("linear");
  const [gradientColor, setGradientColor] = useState(["#E77777", "#77E77F", "#778DE7"]);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const {
    save,
    undo,
    redo,
    canUndo,
    canRedo,
    setActivePage,
    canvasHistoryMap,
    setHistoryIndexMap,
    activePageIndex,
  } = useHistory({ canvas, saveCallback,initialPageId });

  const { copy,copyPage, paste, canPaste } = useClipboard({ canvas });
  const { autoZoom } = useAutoResizer({ canvas, container });

  useWindowEvents();
  useCanvasEvents({ canvas, setSelectedObjects, save, clearSelectionCallback });
  useShortcutKeys({ canvas, undo, redo, save, copy, paste, copyPage });

  useLoadState({
    canvas,
    autoZoom,
    initialState,
    canvasHistoryMap,
    setHistoryIndexMap,
    activePageIndex,
  });

  const loadFont = (fontFamily: string) => {
    if (fontsLoaded[fontFamily]) return;

    const fontUrl = `/fonts/${fontFamily}/${fontFamily}.ttf`;
    const font = new FontFace(fontFamily, `url(${fontUrl})`, {
      style: "normal",
      weight: "normal",
    });

    font
      .load()
      .then(() => {
        document.fonts.add(font);
        setFontsLoaded((prev) => ({ ...prev, [fontFamily]: true }));
      })
      .catch((error) => {
        console.error(`Error loading font ${fontFamily}:`, error);
      });
  };

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        save,
        loadFont,
        undo,
        redo,
        canRedo,
        canUndo,
        autoZoom,
        copy,
        copyPage,
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
        blur,
        setBlur,
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
        setTextShadow,
        gradientType,
        setGradientType,
        gradientColor,
        setGradientColor,
        offsetX,
        setOffsetX,
        offsetY,
        setOffsetY,
      });
    }
    return undefined;
  }, [
    canvas,
    loadFont,
    save,
    undo,
    redo,
    canUndo,
    canRedo,
    autoZoom,
    copy,
    copyPage,
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
    fontSize,
    textShadow,
    gradientColor,
    gradientType,
    offsetX,
    offsetY,
  ]);

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: "#FFF",
        cornerStyle: "circle",
        cornerSize: 5.5,
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        borderOpacityWhenMoving: 1,
        cornerStrokeColor: "#3b82f6",
      });

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
        }),
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);
      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);

    },
    []
  );

  return { 
    init, 
    editor, 
    loadFont, 
    save,
    undo,
    redo,
    canRedo,
    canPaste,
    canUndo,
    setActivePage, 
    activePageIndex,
  };
};
