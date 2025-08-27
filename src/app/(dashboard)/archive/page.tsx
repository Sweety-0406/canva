import { protectServer } from "@/features/auth/utils"
import ArchiveSection from "../archiveSection"

const ArchivePage = async()=>{
    await protectServer()
    return(
        <div className="p-2">
            <ArchiveSection />
        </div>
    )
}

export default ArchivePage