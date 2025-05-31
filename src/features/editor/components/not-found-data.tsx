"use client"
import Image from "next/image"

interface NotFoundDataProps{
    title: string,
    description: string
}

const NotFoundData = ({title,description}:NotFoundDataProps)=>{
return(
    // <div className="my-auto">
        <div className="flex flex-col items-center justify-center">
            <Image width={240} height={240} src="/not-found-image.png" alt="data not found" />
            <h1 className="font-semibold text-xl">{title}</h1>
            <p className="text-sm text-gray-500">{description}</p>
        {/* </div> */}
    </div>
)
}

export default NotFoundData