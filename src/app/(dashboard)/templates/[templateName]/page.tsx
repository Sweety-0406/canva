"use client"

import { useParams } from "next/navigation"
import TemplateSection from "../../templateSection"

const TemplateNamePage = ()=>{
    const {templatename} = useParams()
    return(
        <div className="p-2">
            <TemplateSection page="1000"  show={true} templateNumber={12} />
        </div>
    )
}

export default TemplateNamePage