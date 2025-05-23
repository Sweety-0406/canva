"use client"

import Link from "next/link"

const Logo = ()=>{
    return(
        <Link href="/">
            <div className="h-[58px] pl-2 flex ">
                <div className="  mt-1 text-4xl bg-gradient-to-r from-[#00c4cc] via-[#6420ff] to-[#7d2ae7] bg-clip-text text-transparent" style={{ fontFamily: "'Brush Script MT', cursive" }}>PixelForge</div>
            </div>
        </Link>
    )
}

export default Logo

