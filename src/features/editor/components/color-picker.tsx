"use client"

import { ChromePicker} from "react-color"
import { colors } from "../types"
import { ColorObjectToString } from "../utils"
import { motion } from "framer-motion"
import { Gradient, Pattern } from "fabric/fabric-impl"

interface ColorPickerProps{
    value: string | undefined | Gradient | Pattern,
    onChange: (value: string)=>void,
}

const ColorPicker = ({
    value,
    onChange,
}:ColorPickerProps)=>{
    let color = value
    if(typeof(color) != "string"){
        color = "#000000"
    }
    return(
        <div className="w-full space-y-4  ">
            <ChromePicker 
                color={color}
                onChange={(color)=>{
                    const stringColor = ColorObjectToString(color.rgb)
                    onChange(stringColor)
                }}
                className="border rounded-lg chrome-picker"
            />
            <p className="text-sm text-gray-700">Solid colors</p>
            {/* <CirclePicker 
                color={value}
                colors={colors}
                onChangeComplete={(color)=>{ 
                    const stringColor = ColorObjectToString(color.rgb)
                    onChange(stringColor)
                }}
            /> */}
            <div  className="grid grid-cols-6 gap-4 justify-center">
                {colors.map((color, index) => (

                    <div
                    key={index}
                    className="flex items-center justify-center h-10 w-10 cursor-pointer"
                    >
                    <motion.div
                        key={index}
                        className={`
                            w-full h-full rounded-full border-2 hover:border-gray-500
                            ${value === color && "border-gray-500"}
                        `}
                    >
                        <motion.div
                            className="w-full h-full rounded-full"
                            animate={{ scale: value === color ? 0.85 : 1 }}
                            whileHover={{ scale: 0.85 }}
                            transition={{ duration: 0.2 }}
                            style={{
                            backgroundColor: color,
                            }}
                            onClick={() => onChange(color)}
                        />
                    </motion.div>
                    </div>
                            
                ))}
            </div>
        </div>
    )
}

export default ColorPicker