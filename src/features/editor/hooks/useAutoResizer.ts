import { useCallback, useEffect } from "react"
import { fabric } from "fabric"
import { debounce } from "lodash";
// import {debounce} from "lodash"

interface useAutoResizerProps{
    canvas: fabric.Canvas | null,
    container: HTMLDivElement | null
}

export const useAutoResizer=({
    canvas,
    container
}:useAutoResizerProps)=>{
    const autoZoom = useCallback(()=>{
        if(!canvas || !container){
            return;
        }
        const width = container.offsetWidth
        const height = container.offsetHeight
        // if (canvas.width === width && canvas.height === height) {
        //     return; 
        // }
        canvas.setHeight(height)
        canvas.setWidth(width)
        const center = canvas.getCenter()
        const zoonRatio = 0.85
        
        const localWorkSpace = canvas.getObjects().find((obj)=>obj.name === 'clip')
        
        //@ts-ignore
        const scale = fabric.util.findScaleToFit(localWorkSpace,{
            width,
            height
        })
        const zoom = zoonRatio * scale
        canvas.setViewportTransform(fabric.iMatrix.concat());
        canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom)

        if(!localWorkSpace){
            return;
        }
        const workspaceCenter = localWorkSpace.getCenterPoint();
        const viewPortTransform = canvas.viewportTransform

        if(canvas.width === undefined || canvas.height === undefined || !viewPortTransform){
            return;
        }
        viewPortTransform[4] = canvas.width/2 - workspaceCenter.x * viewPortTransform[0];
        viewPortTransform[5] = canvas.height/2 - workspaceCenter.y * viewPortTransform[3];
        canvas.setViewportTransform(viewPortTransform)

        localWorkSpace.clone((cloned: fabric.Rect)=>{
            canvas.clipPath = cloned
            canvas.requestRenderAll()
        })

    },[canvas, container])
    
    useEffect(()=>{
        let resizeObserver: ResizeObserver | null = null
        const debouncedAutoZoom = debounce(autoZoom, 100);

        if(canvas && container){
            resizeObserver = new ResizeObserver(()=>{
                debouncedAutoZoom();
            })
            resizeObserver.observe(container)
        }
    
        return()=>{
            if(resizeObserver){
                resizeObserver.disconnect()
            }
            debouncedAutoZoom.cancel();
        }
    },[canvas, container, autoZoom])

    return {autoZoom}
}