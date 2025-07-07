

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
