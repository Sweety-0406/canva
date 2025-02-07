"use client"

import { ChromePicker, CirclePicker } from "react-color"
import { colors } from "../types"
import { ColorObjectToString } from "../utils"

interface ColorPickerProps{
    value: string,
    onChange: (value: string)=>void
}

const ColorPicker = ({
    value,
    onChange
}:ColorPickerProps)=>{
    return(
        <div className="w-full space-y-4  ">
            <ChromePicker 
                
                color={value}
                onChange={(color)=>{
                    const stringColor = ColorObjectToString(color.rgb)
                    onChange(stringColor)
                }}
                className="border rounded-lg chrome-picker"
            />
            <CirclePicker 
                color={value}
                colors={colors}
                onChangeComplete={(color)=>{ 
                    const stringColor = ColorObjectToString(color.rgb)
                    onChange(stringColor)
                }}
                />
        </div>
    )
}

export default ColorPicker