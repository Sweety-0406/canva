"use client"
import Image from "next/image"

const Template = ()=>{
    return(
        <div className="p-4 lg:px-[24%] mt-10">
            <div>
                <p className="text-[17px]">
                    Create landing pages that&apos;ll help you progress towards your North Star metrics. Use Canva&apos;s free website landing page maker to design custom pages that fit your brand and fulfill your company&apos;s needs, whether for showcasing your products or gathering emails for your newsletter.
                </p> 
            </div>
            <div className="w-full h-full aspect-video mt-10 ">
                <Image 
                    width={6105}
                    height={85}
                    src="/images/website-template.png"
                    alt="wedsite-template image"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="mt-10">
                <h1 className="font-semibold text-xl">Land straight to your every intent</h1>
                <p className="mt-9 text-[17px] text-gray-700">With our free online landing page creator, you can create custom pages no matter your niche, branding, or marketing campaign. Showcase your product in a landing page that&apos;s attractive enough to secure a sale. Or engage your community with regular updates and correspondence in one site. You can start from scratch or edit our customizable designs ranging from minimalist to modern and even old-school to eccentric.</p>
                <p className="mt-10 text-[17px] text-gray-700">Build landing pages by dragging and dropping your official brand logos, fonts, and colors to your layout using our intuitive editing tools on our design dashboard. Spruce it up a bit by adding other design elements like illustrations, vectors, and stock photos from our extensive library to catch attention. Then, share a link to your landing page that customers and clients can interact with straight from Canva.</p>
            </div>
        </div>
    )
}

export default Template