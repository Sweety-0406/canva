"use client"

import Link from "next/link"
import Image from "next/image"

const Logo = ()=>{
    return(
        <Link href="/">
            <div className="h-[58px]  flex ">
                <Image className="  -mt-3" width={70} height={70} src={"/logo.png"} alt={"logo"} />
                <div className="font-semibol  mt-1 text-4xl bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] bg-clip-text text-transparent" style={{ fontFamily: "'Brush Script MT', cursive" }}>Canva</div>
            </div>
        </Link>
    )
}

export default Logo

