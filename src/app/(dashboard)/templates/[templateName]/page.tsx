"use client"

import { protectServer } from "@/features/auth/utils"
import TemplateSection from "../../templateSection"

const TemplateNamePage = async()=>{
    await protectServer()
    return(
        <div className="p-2">
            <TemplateSection page="1000"  show={true} templateNumber={12} />
        </div>
    )
}

export default TemplateNamePage