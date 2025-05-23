"use client"
import React from "react"
import { QueryProviders } from "./query-provider"

const Provider = ({children}:{children: React.ReactNode})=>{
    return(
        <QueryProviders>
            {children}
        </QueryProviders>
    )
}

export default Provider