"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Carousel from "./carousel"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCreateProject } from "@/features/editor/hooks/useCreateProject"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { CiGlobe } from "react-icons/ci";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"


const FooterSection = ()=>{
    const router = useRouter();
    const mutation = useCreateProject();
    const session = useSession()
    
    const onClick = async () => {
        if(!session.data?.user){
        toast.error("Please login");
        return
        }
        mutation.mutate(
        {
            name: "Untitled Project",
            json: "",
            width: 500,
            height: 700,
        },
        {
            onSuccess: ({ data }) => {
            router.push(`/editor/${data.id}`);
            },
        }
        );
    }; 
    const slideData = [
        {text: "Business"},
        {text: "Laptop"},
        {text: "Professional"},
        {text: "Marketing"},
        {text: "Corporate"},
        {text: "White"},
        {text: "Webinar"},
        {text: "Building"},
        {text: "Grand Opening"},
        {text: "Header"},
        {text: "White Background"},
        {text: "Engagement"},
        {text: "Christmas"},
        {text: "Boho"},
        {text: "Business Guide"},
    ]
    return(
        <div>
            <div className="mt-20 p-4 lg:px-[5%]">
                <h1 className="text-2xl font-semibold">Browse Templates</h1>
                <div className="mt-5">
                    <div className="relative overflow-hidden w-full h-full ">
                        <Carousel slides={slideData} />
                    </div>
                    <div className="mt-4">
                        <Link href="/templates" className="hover:text-[#8B3DFF] text-gray-600 font-semibold text-lg"> See All Templates</Link>
                    </div >
                    <div className="flex items-center justify-center mt-10">
                        <Button onClick={onClick} variant="purple"> Create a Landing Page </Button>
                    </div>
                    <div className="mt-10 block lg:hidden">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Features</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="text-gray-400 flex flex-col gap-3 font-thin">
                                        <li>Shadow text generator</li>
                                        <li>Photo effects</li>
                                        <li>Image enhancer</li>
                                        <li>Add frames to photos</li>
                                        <li>Add text to photos</li>
                                        <li>Image to JSON convertor</li>
                                        <li>Save image in different form</li>
                                        <li>Get templates</li>
                                        <li>AI image generator</li>
                                        <li>Background remover</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Explore</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="text-gray-400 flex flex-col gap-3 font-thin">
                                        <li>Design ideas</li>
                                        <li>Custom prints</li>
                                        <li>Font pairing</li>
                                        <li>Colors</li>
                                        <li>Color Wheel</li>
                                        <li>Color palette generator</li>
                                        <li>Blog</li>
                                        <li>Apps</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Community</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="text-gray-400 flex flex-col gap-3 font-thin">
                                        <li>Online communities</li>
                                        <li>Creators</li>
                                        <li>Canva Represents Fund</li>
                                        <li>Developers</li>
                                        <li>Partnerships</li>
                                        <li>Affiliates program</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger>Download</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="text-gray-400 flex flex-col gap-3 font-thin">
                                        <li>iOS</li>
                                        <li>Android</li>
                                        <li>Windows</li>
                                        <li>Mac</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5">
                                <AccordionTrigger>Company</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="text-gray-400 flex flex-col gap-3 font-thin">
                                        <li>About</li>
                                        <li>Newsroom</li>
                                        <li>Careers</li>
                                        <li>Step Two</li>
                                        <li>Sustainability</li>
                                        <li>Trust Center</li>
                                        <li>Security</li>
                                        <li>Terms and Privacy</li>
                                        <li>Contact Sales</li>
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="hidden mt-10 lg:flex justify-between ">
                        <div>
                            <h1 className="font-semibold text-lg">Features</h1>
                            <ul className="text-gray-500 flex flex-col gap-3  text-sm mt-4">
                                <li>Shadow text generator</li>
                                <li>Photo effects</li>
                                <li>Image enhancer</li>
                                <li>Add frames to photos</li>
                                <li>Add text to photos</li>
                                <li>Image to JSON convertor</li>
                                <li>Save image in different form</li>
                                <li>Get templates</li>
                                <li>AI image generator</li>
                                <li>Background remover</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className="font-semibold text-lg">Explore</h1>
                            <ul className="text-gray-500 flex flex-col gap-3  text-sm mt-4">
                                <li>Design ideas</li>
                                <li>Custom prints</li>
                                <li>Font pairing</li>
                                <li>Colors</li>
                                <li>Color Wheel</li>
                                <li>Color palette generator</li>
                                <li>Blog</li>
                                <li>Apps</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className="font-semibold text-lg">Community</h1>
                            <ul className="text-gray-500 flex flex-col gap-3  text-sm mt-4">
                                <li>Online communities</li>
                                <li>Creators</li>
                                <li>Canva Represents Fund</li>
                                <li>Developers</li>
                                <li>Partnerships</li>
                                <li>Affiliates program</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className="font-semibold text-lg">Download</h1>
                            <ul className="text-gray-500 flex flex-col gap-3  text-sm mt-4">
                                <li>iOS</li>
                                <li>Android</li>
                                <li>Windows</li>
                                <li>Mac</li>
                            </ul>
                        </div>
                        <div>
                            <h1 className="font-semibold text-lg">Company</h1>
                            <ul className="text-gray-500 flex flex-col gap-3  text-sm mt-4">
                                <li>About</li>
                                <li>Newsroom</li>
                                <li>Careers</li>
                                <li>Step Two</li>
                                <li>Sustainability</li>
                                <li>Trust Center</li>
                                <li>Security</li>
                                <li>Terms and Privacy</li>
                                <li>Contact Sales</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-5 ">
                        <Separator />
                        <div className="lg:hidden mt-10 flex flex-col gap-1 justify-center items-center">
                            <Button variant="outline" className="flex gap-2">
                                <CiGlobe />
                                English(US)
                            </Button>
                            <div className="flex gap-2">
                                <div className="size-6">
                                    <Image className="mt-1 object-cover w-full h-full" src="/images/fb-logo.png" alt="fb-logo" width={45} height={45}/>
                                </div>
                                <div className="size-8">
                                    <Image className="object-cover w-full h-full" src="/images/twitter-logo.png" alt="twitter-logo" width={45} height={45}/>
                                </div>
                                <div className="size-8">
                                    <Image className="object-cover w-full h-full" src="/images/printest-logo.png" alt="printest-logo" width={45} height={45}/>
                                </div>
                                <div className="size-8">
                                    <Image className="object-cover w-full h-full" src="/images/insta-logo.png" alt="insta-logo" width={45} height={45}/>
                                </div>
                            </div>
                            <div className="text-gray-400 text-sm">© 2025 All Rights Reserved, PixelForge®</div>
                        </div>
                        <div className="hidden mt-10 lg:flex  gap-1 justify-between">
                            <Button variant="outline" className="flex gap-2 -mt-1">
                                <CiGlobe />
                                English(US)
                            </Button>
                            <div className="text-gray-400 mt-1 text-sm">© 2025 All Rights Reserved, PixelForge®</div>
                            <div className="flex gap-2">
                                <div className="size-6">
                                    <Image className="mt-1 object-cover w-full h-full" src="/images/fb-logo.png" alt="fb-logo" width={45} height={45}/>
                                </div>
                                <div className="size-8">
                                    <Image className="object-cover w-full h-full" src="/images/twitter-logo.png" alt="twitter-logo" width={45} height={45}/>
                                </div>
                                <div className="size-8">
                                    <Image className="object-cover w-full h-full" src="/images/printest-logo.png" alt="printest-logo" width={45} height={45}/>
                                </div>
                                <div className="size-8">
                                    <Image className="object-cover w-full h-full" src="/images/insta-logo.png" alt="insta-logo" width={45} height={45}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterSection