
"use client"

import { useEffect, useState } from "react"
import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { filters } from "../types"
import { motion } from "framer-motion"
import { fabric } from "fabric"
import { createFilter } from "../utils"

interface FilterSidebarProps {
  editor: Editor | undefined
  onChangeActiveTool: (tool: ActiveTool) => void
}

const PREVIEW_WIDTH = 150
const PREVIEW_HEIGHT = 80

const FilterSidebar = ({
  editor,
  onChangeActiveTool,
}: FilterSidebarProps) => {
  const [previews, setPreviews] = useState<{ name: string; src: string }[]>([])

  // const selectedObject = editor?.selectedObjects[0]
  // const BASE_IMAGE_URL = (selectedObject as any)?.getSrc?.() || (selectedObject as any)?.src
  const selectedObject = editor?.selectedObjects[0] as fabric.Image | undefined;
  // const BASE_IMAGE_URL = selectedObject?.getSrc?.() || selectedObject?.src;
  const BASE_IMAGE_URL = selectedObject?.getSrc?.() ;


  const onClose = () => {
    onChangeActiveTool("select")
  }

  useEffect(() => {
    if (!BASE_IMAGE_URL) return

    const loadPreviews = () => {
      fabric.Image.fromURL(
        BASE_IMAGE_URL,
        (img) => {
          const canvas = new fabric.StaticCanvas(null, {
            width: PREVIEW_WIDTH,
            height: PREVIEW_HEIGHT,
          })

          canvas.getContext().imageSmoothingEnabled = true

          const result: { name: string; src: string }[] = []

          filters.forEach((filterName) => {
            const clone = fabric.util.object.clone(img)
            const filter = createFilter(filterName)
            clone.filters = filter ? [filter] : []
            clone.applyFilters()

            // Compute scale for cover behavior
            const scale = Math.max(
              PREVIEW_WIDTH / clone.width!,
              PREVIEW_HEIGHT / clone.height!
            )
            clone.scale(scale)

            // Center and crop the image to fit
            clone.set({
              left: (PREVIEW_WIDTH - clone.getScaledWidth()) / 2,
              top: (PREVIEW_HEIGHT - clone.getScaledHeight()) / 2,
              originX: 'left',
              originY: 'top',
            })

            canvas.clear()
            canvas.add(clone)
            canvas.renderAll()

            const dataURL = canvas.toDataURL({ format: "png" })
            result.push({ name: filterName, src: dataURL })

            if (result.length === filters.length) {
              setPreviews(result)
            }
          })
        },
        { crossOrigin: "anonymous" }
      )
    }

    loadPreviews()
  }, [BASE_IMAGE_URL])

  return (
    <motion.div
      initial={{ opacity: 0, x: -240 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -240 }}
      transition={{ duration: 0.5 }}
      className="w-72  bg-gradient-to-r from-white/80 to-white border-r absolute z-40 h-full left-[74px]"
    >
      <ToolSidebarHeader
        onClose={onClose}
        title="Filters"
        description="Apply filters to your image"
      />

      <ScrollArea className="p-3 h-[84vh]">
        <div className="grid grid-cols-2 gap-3">
          {previews.map((preview) => (
            <div
              key={preview.name}
              className="cursor-pointer flex flex-col items-center"
              onClick={() => editor?.changeImageFilter(preview.name)}
            >
              <img
                src={preview.src}
                alt={preview.name}
                className="rounded shadow w-[150px] h-[80px] object-cover"
              />
              <span className="text-xs text-center mt-1 text-gray-600">
                {preview.name}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  )
}

export default FilterSidebar
