import { protectServer } from "@/features/auth/utils"
import ProjectSection from "../projectSection"


const ProjectPage = async()=>{
    await protectServer()
    return(
        <div className="p-2">
            <ProjectSection projectNumber={5} show={true} limitParam={10} />
        </div>
    )
}

export default ProjectPage