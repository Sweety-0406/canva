// import { fabric } from "fabric"
// import { RGBColor } from "react-color"

// export const transformText = (objects:any)=>{
//     if(!objects){
//         return;
//     }
//     objects.forEach((item: any)=>{
//         if(item.objects){
//             transformText(item.objects)
//         }else{
//             item.type === "text" && (item.type === "textbox")
//         }
//     })
// }

// export const downloadCanvasImage = (dataUrl:string, type:string)=>{
//     const anchorElement = document.createElement("a")
//     anchorElement.href=dataUrl,
//     anchorElement.download = `${uuid}.${type}`
//     document.body.appendChild(anchorElement)
//     anchorElement.click()
//     anchorElement.remove()
// }

// export const isTextType=(type: string | undefined)=>{
//     return type ==="text" || type==="i-text" || type==="textbox"
// }

// export const ColorObjectToString = (rgba: RGBColor | "transparent")=>{
//     if(rgba === "transparent"){
//         return `rgba(0,0,0,0)`
//     }
//     const alpha = rgba.a === undefined ? 1 : rgba.a
//     return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`
// }

// export const createFilter = (value: string)=>{
//     let effect;
//     switch (value) {
//         case "polaroid":
//             //@ts-expect-error typescript error
//             effect = new fabric.Image.filters.Polaroid();
//             break;    
//         case "sepia":
            
//             effect = new fabric.Image.filters.Sepia();
//             break;
//         case "kodachrome":
//             //@ts-expect-error typescript error
//             effect = new fabric.Image.filters.Kodachrome();
//             break;
//         case "contrast":
//             effect = new fabric.Image.filters.Contrast();
//             break;
//         case "brightness":
//             effect = new fabric.Image.filters.Brightness({
//                 brightness:0.2
//             });
//             break;
//         case "grayscale":
//             effect = new fabric.Image.filters.Grayscale();
//             break;
//         case "brownie":
//             //@ts-expect-error typescript error
//             effect = new fabric.Image.filters.Brownie();
//             break;
//         case "vintage":
//             //@ts-expect-error typescript error
//             effect = new fabric.Image.filters.Vintage();
//             break;
//         case "technicolor":
//             //@ts-expect-error typescript error
//             effect = new fabric.Image.filters.Technicolor();
//             break;
//         case "pixelate":
//             effect = new fabric.Image.filters.Pixelate();
//             break;
//         case "invert":
//             effect = new fabric.Image.filters.Invert();
//             break;
//         case "blur":
//             effect = new fabric.Image.filters.Blur({
//                 blur:0.3
//             });
//             break;
//         case "sharpen":
//             effect = new fabric.Image.filters.Convolute({
//                 matrix: [0,-1,0,-1,5,-1,0,-1,0]
//             });
//             break;
//         case "emboss":
//             effect = new fabric.Image.filters.Convolute({
//                 matrix: [1,1,1,1,0.7,-1,-1,-1,-1]
//             });
//             break;
//         case "removecolor":
//             //@ts-expect-error typescript error
//             effect = new fabric.Image.filters.RemoveColor({
//                 thresold: 0.2,
//                 distance: 0.5
//             });
//             break;
//         case "blacknwhite":
//             //@ts-expect-error typescript error
//             effect = new fabric.Image.filters.BlackWhite();
//             break;
//         case "vibrance":
//             //@ts-expect-error typescript error
//             effect = new fabric.Image.filters.Vibrance({
//                 vibrance:1
//             });
//             break;
//         case "blendcolor":
//             effect = new fabric.Image.filters.BlendColor({
//                 color: "#00ff00",
//                 mode: "multiply"
//             });
//             break;
//         case "huerotate":
//             effect = new fabric.Image.filters.HueRotation({
//                 rotation: 0.5
//             });
//             break;
//         case "saturation":
//             effect = new fabric.Image.filters.Saturation({
//                 saturation:1
//             });
//             break;
//         case "gamma":
//             //@ts-expect-error typescript error
//             effect = new fabric.Image.filters.Gamma({
//                 gamma: [1,0.5,2.1]
//             });
//             break;
    
//         default:
//             effect = null
//             return;
//     }
//     return effect
// }


// function uuid() {
//     throw new Error("Function not implemented.")
// }



import { fabric } from "fabric";
import { RGBColor } from "react-color";
import { v4 as uuidv4 } from "uuid"; // Make sure to install: npm install uuid

// Recursively transform text objects if needed
export const transformText = (objects: fabric.Object[] | undefined): void => {
    if (!objects) return;

    objects.forEach((item) => {
        const group = item as fabric.Group;

        if ("objects" in group && Array.isArray(group.objects)) {
            transformText(group.objects);
        } else if (isTextType(item.type)) {
            // Perform transformations here if needed
        }
    });
};

// Trigger download of canvas image
export const downloadCanvasImage = (dataUrl: string, type: string): void => {
    const anchorElement = document.createElement("a");
    anchorElement.href = dataUrl;
    anchorElement.download = `${uuidv4()}.${type}`;
    document.body.appendChild(anchorElement);
    anchorElement.click();
    anchorElement.remove();
};

// Check if the object is of text type
export const isTextType = (type: string | undefined): boolean => {
    return type === "text" || type === "i-text" || type === "textbox";
};

// Convert color object to rgba string
export const ColorObjectToString = (rgba: RGBColor | "transparent"): string => {
    if (rgba === "transparent") return `rgba(0,0,0,0)`;
    const alpha = rgba.a === undefined ? 1 : rgba.a;
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
};

// Create a fabric.js filter based on a string key
export const createFilter = (value: string): fabric.IBaseFilter | null => {
    switch (value) {
        case "polaroid":
            // @ts-expect-error - custom filter
            return new fabric.Image.filters.Polaroid();
        case "sepia":
            return new fabric.Image.filters.Sepia();
        case "kodachrome":
            // @ts-expect-error - custom filter
            return new fabric.Image.filters.Kodachrome();
        case "contrast":
            return new fabric.Image.filters.Contrast();
        case "brightness":
            return new fabric.Image.filters.Brightness({ brightness: 0.2 });
        case "grayscale":
            return new fabric.Image.filters.Grayscale();
        case "brownie":
            // @ts-expect-error - custom filter
            return new fabric.Image.filters.Brownie();
        case "vintage":
            // @ts-expect-error - custom filter
            return new fabric.Image.filters.Vintage();
        case "technicolor":
            // @ts-expect-error - custom filter
            return new fabric.Image.filters.Technicolor();
        case "pixelate":
            return new fabric.Image.filters.Pixelate();
        case "invert":
            return new fabric.Image.filters.Invert();
        case "blur":
            return new fabric.Image.filters.Blur({ blur: 0.3 });
        case "sharpen":
            return new fabric.Image.filters.Convolute({
                matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
            });
        case "emboss":
            return new fabric.Image.filters.Convolute({
                matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
            });
        case "removecolor":
            // @ts-expect-error - custom filter
            return new fabric.Image.filters.RemoveColor({
                thresold: 0.2,
                distance: 0.5,
            });
        case "blacknwhite":
            // @ts-expect-error - custom filter
            return new fabric.Image.filters.BlackWhite();
        case "vibrance":
            // @ts-expect-error - custom filter
            return new fabric.Image.filters.Vibrance({
                vibrance: 1,
            });
        case "blendcolor":
            return new fabric.Image.filters.BlendColor({
                color: "#00ff00",
                mode: "multiply",
            });
        case "huerotate":
            return new fabric.Image.filters.HueRotation({
                rotation: 0.5,
            });
        case "saturation":
            return new fabric.Image.filters.Saturation({
                saturation: 1,
            });
        case "gamma":
            // @ts-expect-error - custom filter
            return new fabric.Image.filters.Gamma({
                gamma: [1, 0.5, 2.1],
            });
        default:
            return null;
    }
};
