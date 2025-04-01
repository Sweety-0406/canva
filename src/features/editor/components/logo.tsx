"use client"

import Link from "next/link"
import Image from "next/image"

const Logo = ()=>{
    return(
        <Link href="/">
            <div className="size-20  hover:opacity-60  transition relative">
                <Image
                  src="/logo.png"
                  alt="logo"
                  fill
                  className="size-20 "
                />
            </div>
        </Link>
    )
}

export default Logo

