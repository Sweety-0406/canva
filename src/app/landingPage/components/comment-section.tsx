"use client"

// import Carousel from "@/app/landingPage/components/carousel";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import Carousel from "./carousel";

const CommentSection=()=>{
    const[step, setStep] = useState(1);

    return(
        <div className="mt-20 p-4 lg:px-[20%]">
            <div className="flex items-center justify-center"> 
                <RiDoubleQuotesL className="size-10 text-gray-300" />
            </div>
            <div className="flex justify-center h-40  text-center text-lg px-2 mt-6 text-gray-700">
                {step==1 && (
                    <div>
                        <p>@canva is simply outstanding as a tool to create designs. Using Canva is such a seamless experience that once you sit down to design, you don't feel like getting up. It's addictive and useful. Keep going Canva.</p>
                        <p className="mt-10 text-sm">@navneet4</p>
                    </div>
                )}
                {step==2 && (
                    <div>
                        <p>@canva is an incredible app for designing pretty much anything you need! A huge selection of templates, fonts and colours; endless choices at the tip of your fingers; easy editing and sending/sharing. Best app I’ve used for a long time. If you haven’t tried it... try it!</p>
                        <p className="mt-10 text-sm">@SpotOnDomain</p>
                    </div>
                )}
                {step==3 && (
                    <div>
                        <p>I don’t know where I was without @canva They have absolutely great graphics for any social media platform. Whether it be a YouTube thumbnail, an Instagram Post or whatever you want to create. Let @canva make the design process easier for you.</p>
                        <p className="mt-10 text-sm">@IGchef_andrewb</p>
                    </div>
                )}
                {step==4 && (
                    <div>
                        <p>Omg I love you guys! Thanks for making it so easy for me to use your templates. There’s so many selections and your site and app are very easy to use and navigate !!!</p>
                        <p className="mt-10 text-sm">@curlyfrosista</p>
                    </div>
                )}
                {step==5 && (
                    <div>
                        <p>@canva is such a life changing tool! One of the most well thought out websites I've ever seen. I use it to showcase my work with the community and it never ceases to amaze me! Kudos for all the love and effort you've put into it's development! #canvadesigns</p>
                        <p className="mt-10 text-sm">@mahimagirdhar</p>
                    </div>
                )}
            </div>
            <div className="flex justify-center mb-20">
                <div className="flex gap-2 w-60  mt-5"> 
                    <div 
                        onClick={()=>setStep(1)} 
                        className={`
                            w-full h-1 rounded-md
                            ${step==1 ? "bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600":"bg-gray-200"}
                        `}
                    />
                    <div 
                        onClick={()=>setStep(2)} 
                        className={`
                            w-full h-1 rounded-md
                            ${step==2 ? "bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600":"bg-gray-200"}
                        `}
                    />
                    <div 
                        onClick={()=>setStep(3)} 
                        className={`
                            w-full h-1 rounded-md
                            ${step==3 ? "bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600":"bg-gray-200"}
                        `}
                    />
                    <div 
                        onClick={()=>setStep(4)} 
                        className={`
                            w-full h-1 rounded-md
                            ${step==4 ? "bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600":"bg-gray-200"}
                        `}
                    />
                    <div 
                        onClick={()=>setStep(5)} 
                        className={`
                            w-full h-1 rounded-md
                            ${step==5 ? "bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600":"bg-gray-200"}
                        `}
                    />
                </div>
            </div>
            <Separator />
            <div className="my-16">
                <h1 className="text-2xl font-semibold">More Designs</h1>
                <div className="mt-8 flex flex-wrap gap-3">
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">Restaurant Flyer</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">Business Flyers</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">Raffle Tickets</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">Table of Content</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">Real Estate Flyer</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">Forms</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">Icons</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">Personal Planners</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">Design and Photo Grids</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">Overlay Images</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">HD Photo Converter</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">Flyers</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">Infographics</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">Websites</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">AI Voice Generator</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">Discord Emotes</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">Party Flyer</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">SoundCloud Banners</div>
                    <div className="bg-muted p-2 text-sm text-gray-500 rounded-md">Art Lesson Plans</div>
                </div>
            </div>
            <Separator />
            
        </div>
    )
}

export default CommentSection