"use client"

import Link from "next/link"
import Image from "next/image"

const Logo = ()=>{
    return(
        <Link href="/">
            <div className="h-[58px]  flex ">
                <Image className="  -mt-3" width={70} height={70} src={"/logo.png"} alt={"logo"} />
                <div className="font-bold mt-3 text-xl">Canva</div>
            </div>
        </Link>
    )
}

export default Logo