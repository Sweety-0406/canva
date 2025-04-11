"use client"
import Image from "next/image"

const Feature = ()=>{
    return(
        <div className="p-4  lg:px-[10%]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col items-center  sm:flex-row lg:flex-col gap-2">
                    <div className="p-1 size-20 bg-gray-100 rounded-md">
                        <Image width={65} height={65} src="/images/feature1.png" alt="image" className="object-contain w-full h-full" />
                    </div>
                    <div className="flex items-center ">
                        <p className="w-full text-center">
                            Easy drag-and-drop editor
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center sm:flex-row lg:flex-col gap-2">
                    <div className="p-1 size-20 bg-gray-100 rounded-md">
                        <Image width={65} height={65} src="/images/feature2.png" alt="image" className="object-contain w-full h-full" />
                    </div>
                    <div className="flex items-center ">
                        <p className="w-full text-center">
                            3M+ free stock photos and graphics
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center  sm:flex-row lg:flex-col gap-2">
                    <div className="p-1 size-20 bg-gray-100 rounded-md">
                        <Image width={65} height={65} src="/images/feature3.png" alt="image" className="object-contain w-full h-full" />
                    </div>
                    <div className="flex items-center ">
                        <p className="w-full text-center">
                            Generate content and media with AI
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center sm:flex-row lg:flex-col gap-2">
                    <div className="p-1  size-20 bg-gray-100 rounded-md">
                        <Image width={65} height={65} src="/images/feature4.png" alt="image" className="object-contain w-full h-full" />
                    </div>
                    <div className="flex items-center ">
                        <p className="w-full text-center">
                            Invite others and design together
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feature

