import { NamedTemplateModal } from "@/features/editor/components/namedTemplateModal"
import TemplateSection from "../templateSection"

const TemplatePage = ()=>{
    return(
        <div className="p-2">
            <TemplateSection page="1000"  show={true} templateNumber={12} />
            <NamedTemplateModal />
        </div>
    )
}

export default TemplatePage