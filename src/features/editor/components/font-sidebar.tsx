"use client"

import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TfiText } from "react-icons/tfi";
import { Button } from "@/components/ui/button"
import localFont from "next/font/local";
import { useEffect } from "react";
import { motion } from "framer-motion";

interface FontSidebarProps{
    editor: Editor | undefined,
    activeTool: ActiveTool,
    onChangeActiveTool: (tool:ActiveTool)=>void,
    loadFont: (fontFamily: string) => void;  
}



const ARIAL = localFont({
  src: "../../../../public/fonts/ARIAL/ARIAL.ttf",
  variable: "--ARIAL",
});

const Anton = localFont({
  src: "../../../../public/fonts/Anton-Regular/Anton-Regular.ttf",
  variable: "--Anton-Regular",
});
  
const ARIALBD = localFont({
  src: "../../../../public/fonts/ARIALBD/ARIALBD.ttf",
  variable: "--ARIALBD",
});

const ARIALBI = localFont({
  src: "../../../../public/fonts/ARIALBI/ARIALBI.ttf",
  variable: "--ARIALBI",
});

const ARIALBLACKITALIC = localFont({
  src: "../../../../public/fonts/ARIALBLACKITALIC/ARIALBLACKITALIC.ttf",
  variable: "--ARIALBLACKITALIC",
});

const ArialCE = localFont({
  src: "../../../../public/fonts/ArialCE/ArialCE.ttf",
  variable: "--ArialCE",
});

const arialceb = localFont({
  src: "../../../../public/fonts/arialceb/arialceb.ttf",
  variable: "--arialceb",
});

const ArialCEBoldItalic = localFont({
  src: "../../../../public/fonts/ArialCEBoldItalic/ArialCEBoldItalic.ttf",
  variable: "--ArialCEBoldItalic",
});

const ArialCEItalic = localFont({
  src: "../../../../public/fonts/ArialCEItalic/ArialCEItalic.ttf",
  variable: "--ArialCEItalic",
});

const ArialCEMTBlack = localFont({
  src: "../../../../public/fonts/ArialCEMTBlack/ArialCEMTBlack.ttf",
  variable: "--ArialCEMTBlack",
});

const ARIALI = localFont({
  src: "../../../../public/fonts/ARIALI/ARIALI.ttf",
  variable: "--ARIALI",
});

const ARIALLGT = localFont({
  src: "../../../../public/fonts/ARIALLGT/ARIALLGT.ttf",
  variable: "--ARIALLGT",
});

const ARIALLGTITL = localFont({
  src: "../../../../public/fonts/ARIALLGTITL/ARIALLGTITL.ttf",
  variable: "--ARIALLGTITL",
});

const ArialMdm = localFont({
  src: "../../../../public/fonts/ArialMdm/ArialMdm.ttf",
  variable: "--ArialMdm",
});

const ArialMdmItl = localFont({
  src: "../../../../public/fonts/ArialMdmItl/ArialMdmItl.ttf",
  variable: "--ArialMdmItl",
});

const ARIALN = localFont({
  src: "../../../../public/fonts/ARIALN/ARIALN.ttf",
  variable: "--ARIALN",
});

const ARIALNB = localFont({
  src: "../../../../public/fonts/ARIALNB/ARIALNB.ttf",
  variable: "--ARIALNB",
});

const ARIALNBI = localFont({
  src: "../../../../public/fonts/ARIALNBI/ARIALNBI.ttf",
  variable: "--ARIALNBI",
});

const ARIALNI = localFont({
  src: "../../../../public/fonts/ARIALNI/ARIALNI.ttf",
  variable: "--ARIALNI",
});

const ARIBLK = localFont({
  src: "../../../../public/fonts/ARIBLK/ARIBLK.ttf",
  variable: "--ARIBLK",
});

const breathing = localFont({
  src: "../../../../public/fonts/breathing/breathing.ttf",
  variable: "--breathing",
});

const decalotype = localFont({
  src: "../../../../public/fonts/decalotype-bold/decalotype-bold.ttf",
  variable: "--decalotype-bold",
});

const RigMediumFill = localFont({
  src: "../../../../public/fonts/Rig-MediumFill/Rig-MediumFill.ttf",
  variable: "--Rig-MediumFill",
});

const verdana = localFont({
  src: "../../../../public/fonts/verdana/verdana.ttf",
  variable: "--verdana",
});

const verdanabold = localFont({
  src: "../../../../public/fonts/verdana-bold/verdana-bold.ttf",
  variable: "--verdana-bold",
});

const verdanabolditalic = localFont({
  src: "../../../../public/fonts/verdana-bold-italic/verdana-bold-italic.ttf",
  variable: "--verdana-bold-italic",
});

const bukhari_script = localFont({
  src: "../../../../public/fonts/bukhari_script/bukhari_script.ttf",
  variable: "--bukhari_script",
});

const alexbrush = localFont({
  src: "../../../../public/fonts/alexbrush/alexbrush.ttf",
  variable: "--alexbrush",
});

const RigBoldFill = localFont({
  src: "../../../../public/fonts/Rig-BoldFill/Rig-BoldFill.ttf",
  variable: "--Rig-BoldFill",
});

const RigBoldHalftone = localFont({
  src: "../../../../public/fonts/Rig-BoldHalftone/Rig-BoldHalftone.ttf",
  variable: "--Rig-BoldHalftone",
});

const RigBoldInlineExtrude = localFont({
  src: "../../../../public/fonts/Rig-BoldInlineExtrude/Rig-BoldInlineExtrude.ttf",
  variable: "--Rig-BoldInlineExtrude",
});

const RigBoldInlineSolo = localFont({
  src: "../../../../public/fonts/Rig-BoldInlineSolo/Rig-BoldInlineSolo.ttf",
  variable: "--Rig-BoldInlineSolo",
});

const RigBoldOutline = localFont({
  src: "../../../../public/fonts/Rig-BoldOutline/Rig-BoldOutline.ttf",
  variable: "--Rig-BoldOutline",
});

const RigBoldReverse = localFont({
  src: "../../../../public/fonts/Rig-BoldReverse/Rig-BoldReverse.ttf",
  variable: "--Rig-BoldReverse",
});

const RigLightFill = localFont({
  src: "../../../../public/fonts/Rig-LightFill/Rig-LightFill.ttf",
  variable: "--Rig-LightFill",
});

const RigLightHalftone = localFont({
  src: "../../../../public/fonts/Rig-LightHalftone/Rig-LightHalftone.ttf",
  variable: "--Rig-LightHalftone",
});

const RigMediumHalftone = localFont({
  src: "../../../../public/fonts/Rig-MediumHalftone/Rig-MediumHalftone.ttf",
  variable: "--Rig-MediumHalftone",
});

const RigMediumLines = localFont({
  src: "../../../../public/fonts/Rig-MediumLines/Rig-MediumLines.ttf",
  variable: "--Rig-MediumLines",
});

const RigMediumOutline = localFont({
  src: "../../../../public/fonts/Rig-MediumOutline/Rig-MediumOutline.ttf",
  variable: "--Rig-MediumOutline",
});

const RigZeroHalftone = localFont({
  src: "../../../../public/fonts/Rig-ZeroHalftone/Rig-ZeroHalftone.ttf",
  variable: "--Rig-ZeroHalftone",
});

const Aniyah = localFont({
  src: "../../../../public/fonts/Aniyah/Aniyah.ttf",
  variable: "--Aniyah",
});

const AniyahItalic = localFont({
  src: "../../../../public/fonts/AniyahItalic/AniyahItalic.ttf",
  variable: "--AniyahItalic",
});

const BeautifulVariella = localFont({
  src: "../../../../public/fonts/BeautifulVariella/BeautifulVariella.ttf",
  variable: "--BeautifulVariella",
});

const Beshan = localFont({
  src: "../../../../public/fonts/Beshan/Beshan.ttf",
  variable: "--Beshan",
});

const BetterSaturday = localFont({
  src: "../../../../public/fonts/BetterSaturday/BetterSaturday.ttf",
  variable: "--BetterSaturday",
});

const BetterSummer = localFont({
  src: "../../../../public/fonts/BetterSummer/BetterSummer.ttf",
  variable: "--BetterSummer",
});

const EasterStory = localFont({
  src: "../../../../public/fonts/EasterStory/EasterStory.ttf",
  variable: "--EasterStory",
});

const Gabriella = localFont({
  src: "../../../../public/fonts/gabriella/gabriella.ttf",
  variable: "--Gabriella",
});

const Geollitta = localFont({
  src: "../../../../public/fonts/Geollitta/Geollitta.ttf",
  variable: "--Geollitta",
});

const Hillarie = localFont({
  src: "../../../../public/fonts/Hillarie/Hillarie.ttf",
  variable: "--Hillarie",
});

const Holidate = localFont({
  src: "../../../../public/fonts/Holidate/Holidate.ttf",
  variable: "--Holidate",
});

const HoneyLoveBunny = localFont({
  src: "../../../../public/fonts/honeylovebunny/honeylovebunny.ttf",
  variable: "--HoneyLoveBunny",
});

const Jaggielka = localFont({
  src: "../../../../public/fonts/Jaggielka/Jaggielka.ttf",
  variable: "--Jaggielka",
});

const Lovebird = localFont({
  src: "../../../../public/fonts/lovebird/lovebird.ttf",
  variable: "--Lovebird",
});

const Rabitta = localFont({
  src: "../../../../public/fonts/rabitta/rabitta.ttf",
  variable: "--Rabitta",
});

const Springbee = localFont({
  src: "../../../../public/fonts/Springbee/Springbee.ttf",
  variable: "--Springbee",
});

const SweetChristmas = localFont({
  src: "../../../../public/fonts/sweetchristmas/sweetchristmas.ttf",
  variable: "--SweetChristmas",
});

const Tronthon = localFont({
  src: "../../../../public/fonts/Tronthon/Tronthon.ttf",
  variable: "--Tronthon",
});

const Turtles = localFont({
  src: "../../../../public/fonts/TURTLES/TURTLES.ttf",
  variable: "--Turtles",
});

const WargateBold = localFont({
  src: "../../../../public/fonts/Wargate-Bold/Wargate-Bold.ttf",
  variable: "--WargateBold",
});

const WargateBook = localFont({
  src: "../../../../public/fonts/Wargate-Book/Wargate-Book.ttf",
  variable: "--WargateBook",
});

const WargateExtraBold = localFont({
  src: "../../../../public/fonts/WargateExtraBold/WargateExtraBold.ttf",
  variable: "--WargateExtraBold",
});

const WargateLight = localFont({
  src: "../../../../public/fonts/Wargate-Light/Wargate-Light.ttf",
  variable: "--WargateLight",
});

const WargateNormal = localFont({
  src: "../../../../public/fonts/Wargate-Normal/Wargate-Normal.ttf",
  variable: "--WargateNormal",
});

const Warilah = localFont({
  src: "../../../../public/fonts/Warilah/Warilah.ttf",
  variable: "--Warilah",
});

const Wolfriend = localFont({
  src: "../../../../public/fonts/Wolfriend/Wolfriend.ttf",
  variable: "--Wolfriend",
});

const WonderblendBack = localFont({
  src: "../../../../public/fonts/WonderblendBack/WonderblendBack.ttf",
  variable: "--WonderblendBack",
});

const Wonderblend = localFont({
  src: "../../../../public/fonts/Wonderblend/Wonderblend.ttf",
  variable: "--Wonderblend",
});
  
  

const FontSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
    loadFont
}:FontSidebarProps)=>{
    const value = editor?.font 
    
    const onClose = ()=>{
        onChangeActiveTool("select")
    }
    console.log(value)
    
    const fonts = [
        { name: "ARIAL", className: ARIAL.className },
        { name: "Anton-Regular", className: Anton.className },
        { name: "ARIALBD", className: ARIALBD.className },
        { name: "ARIALBI", className: ARIALBI.className },
        { name: "ARIALBLACKITALIC", className: ARIALBLACKITALIC.className },
        { name: "ArialCE", className: ArialCE.className },
        { name: "arialceb", className: arialceb.className },
        { name: "ArialCEBoldItalic", className: ArialCEBoldItalic.className },
        { name: "ArialCEItalic", className: ArialCEItalic.className },
        { name: "ArialCEMTBlack", className: ArialCEMTBlack.className },
        { name: "ARIALI", className: ARIALI.className },
        { name: "ARIALLGT", className: ARIALLGT.className },
        { name: "ARIALLGTITL", className: ARIALLGTITL.className },
        { name: "ArialMdm", className: ArialMdm.className },
        { name: "ArialMdmItl", className: ArialMdmItl.className },
        { name: "ARIALN", className: ARIALN.className },
        { name: "ARIALNB", className: ARIALNB.className },
        { name: "ARIALNBI", className: ARIALNBI.className },
        { name: "ARIALNI", className: ARIALNI.className },
        { name: "ARIBLK", className: ARIBLK.className },
        { name: "Breathing", className: breathing.className },
        { name: "decalotype-bold", className: decalotype.className },
        { name: "Rig-MediumFill", className: RigMediumFill.className },
        { name: "verdana", className: verdana.className },
        { name: "verdana-bold", className: verdanabold.className },
        { name: "verdana-bold-italic", className: verdanabolditalic.className },
        { name: "bukhari_script", className: bukhari_script.className },
        { name: "alexbrush", className: alexbrush.className },
        { name: "Rig-BoldFill", className: RigBoldFill.className },
        { name: "Rig-BoldHalftone", className: RigBoldHalftone.className },
        { name: "Rig-BoldInlineExtrude", className: RigBoldInlineExtrude.className },
        { name: "Rig-BoldInlineSolo", className: RigBoldInlineSolo.className },
        { name: "Rig-BoldOutline", className: RigBoldOutline.className },
        { name: "Rig-BoldReverse", className: RigBoldReverse.className },
        { name: "Rig-LightFill", className: RigLightFill.className },
        { name: "Rig-LightHalftone", className: RigLightHalftone.className },
        { name: "Rig-MediumHalftone", className: RigMediumHalftone.className },
        { name: "Rig-MediumLines", className: RigMediumLines.className },
        { name: "Rig-MediumOutline", className: RigMediumOutline.className },
        { name: "Rig-ZeroHalftone", className: RigZeroHalftone.className },
        { name: "Aniyah", className: Aniyah.className },
        { name: "AniyahItalic", className: AniyahItalic.className },
        { name: "BeautifulVariella", className: BeautifulVariella.className },
        { name: "Beshan", className: Beshan.className },
        { name: "BetterSaturday", className: BetterSaturday.className },
        { name: "BetterSummer", className: BetterSummer.className },
        { name: "EasterStory", className: EasterStory.className },
        { name: "Gabriella", className: Gabriella.className },
        { name: "Geollitta", className: Geollitta.className },
        { name: "Hillarie", className: Hillarie.className },
        { name: "Holidate", className: Holidate.className },
        { name: "HoneyLoveBunny", className: HoneyLoveBunny.className },
        { name: "Jaggielka", className: Jaggielka.className },
        { name: "Lovebird", className: Lovebird.className },
        { name: "Rabitta", className: Rabitta.className },
        { name: "Springbee", className: Springbee.className },
        { name: "SweetChristmas", className: SweetChristmas.className },
        { name: "Tronthon", className: Tronthon.className },
        { name: "Turtles", className: Turtles.className },
        { name: "WargateBold", className: WargateBold.className },
        { name: "WargateBook", className: WargateBook.className },
        { name: "WargateExtraBold", className: WargateExtraBold.className },
        { name: "WargateLight", className: WargateLight.className },
        { name: "WargateNormal", className: WargateNormal.className },
        { name: "Warilah", className: Warilah.className },
        { name: "Wolfriend", className: Wolfriend.className },
        { name: "WonderblendBack", className: WonderblendBack.className },
        { name: "Wonderblend", className: Wonderblend.className },
    ];
    return(
        <motion.div 
          initial={{ opacity: 0, x: -240 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -240 }}
          transition={{ duration: 0.5 }}
          className="w-64 bg-white border-r absolute z-40 h-full left-16"
        >
            <ToolSidebarHeader onClose={onClose} title="Fonts" description="Change font of your text" />
            <ScrollArea className="p-1 h-[85vh]">
                <div className="mt-2 flex flex-col gap-3 w-[248px]">
                {fonts.map(({ name, className }) => (
                    <Button
                        key={name}
                        variant="outline"
                        className={`
                            w-full rounded-xl relative
                            ${value == name && "bg-muted"}
                        `}
                        onClick={() => {
                            editor?.changeFont(name)
                        }}
                    >
                        <div className="w-full overflow-x-auto no-scrollbar">
                            <span className={`${className} whitespace-nowrap text-xl`}>{name}</span>
                        </div>
                    </Button>
                ))}
                    
                </div>
            </ScrollArea>
        </motion.div>

    )
}

export default FontSidebar

