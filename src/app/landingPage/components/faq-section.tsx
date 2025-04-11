"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { FaCircle } from "react-icons/fa";

const FAQSection = ()=>{
    return(
        <div className="mt-20 px-4 lg:px-[20%]">
            <h1 className="text-2xl font-semibold">FAQ</h1>
            <div className="mt-8">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1 ">
                        <AccordionTrigger>How to design a landing page?</AccordionTrigger>
                        <AccordionContent >
                            <p>Create a landing page online using our free landing page builder. Start from scratch or choose from a ready-made layout. Then, upload your brand assets, embellish with graphic elements from our library, and publish it. But, more importantly, consider these tips:</p>
                            <ul  className="mt-1 mx-20">
                                <li className="flex"> <FaCircle size={7} className="mt-1 mr-1" /> Prepare an outline on what you will feature and how the page will look like.</li>
                                <li className="flex"><FaCircle size={7} className="mt-1 mr-1" /> Add engaging and compelling content and call-to-action.</li>
                                <li className="flex"><FaCircle size={7} className="mt-1 mr-1" /> Consider key design elements such as a headline, text blocks, CTA buttons, images, and testimonials.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2 border-b ">
                        <AccordionTrigger>What is a landing page on a website?</AccordionTrigger>
                        <AccordionContent >
                            <p>It’s a single webpage that serves as the first thing a customer sees about a marketing campaign you launch. Landing pages either trade information between the company and customer or lead users to other pages within your website.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3 border-b ">
                        <AccordionTrigger>What is the difference between a landing page and a website?</AccordionTrigger>
                        <AccordionContent >
                            <p>Compared to a website, landing pages are much simpler, possibly with a singular intent. They usually don’t need a lot of navigation items and are built to convert clicks to sales, subscriptions, or traffic.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4 border-b ">
                        <AccordionTrigger>What makes a good landing page?</AccordionTrigger>
                        <AccordionContent >
                            <p>A good landing page helps users and potential customers connect with your brand and decide whether to purchase a product, sign-up to your newsletter, or download items. Factor these guidelines as you make build one:</p>
                            <ul  className="mt-1 mx-20">
                                <li className="flex"> <FaCircle size={7} className="mt-1 mr-1" /> Focus on a single call to action to streamline your design and messaging.</li>
                                <li className="flex"><FaCircle size={8} className="mt-1 mr-1" /> Content is king. Prioritize putting unique content and striking images or videos to engage your audience and avoid bounce rate.</li>
                                <li className="flex"><FaCircle size={9} className="mt-1 mr-1" /> Think mobile. A growing population of mobile natives will find it valuable if you optimize your landing page by improving page speed and user interface.</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger>How much does it cost to build a landing page?</AccordionTrigger>
                        <AccordionContent>
                            It costs thousands of dollars to create a landing page. Aside from its pricey cost, it also takes hours to build a website and its landing pages. With our landing page maker, you get to design and publish your webpage for free under our domain.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

export default FAQSection