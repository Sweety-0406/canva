"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface ErrorPageProps{
    isShow?:boolean
}

const ErrorPage = ({isShow=true}:ErrorPageProps)=>{
    const router = useRouter()
return(
    <div className="flex flex-col items-center justify-center">
        <Image width={240} height={240} src="/not-found-image.png" alt="data not found" />
        <h1 className="font-semibold text-xl">Can't connect to PixelForge</h1>
        <p className="text-sm text-center mt-2 text-gray-500">It seems we are having trouble reaching PixelForge. You  may be offline, or there might be a temporary issue on our side. Try refreshing the page in a moment.</p>
        <div className="mt-4 flex gap-5">
            {isShow && 
                <Button variant="outline" onClick={()=>router.push("/")}>Return Home</Button>
            }
            <Button variant="purple" className="w-[122px]" onClick={()=>window.location.reload()}>Retry</Button>
        </div>
    </div>
)
}

export default ErrorPage