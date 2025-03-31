"use client"

import { useEffect, useState } from "react"
import { SubscriptionModal } from "./subscriptionModal"
import { FailedModal } from "./failedModal"
import { SuccessModal } from "./successModal"


const Modal = ()=>{
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    return(
        <>
            <FailedModal />
            <SuccessModal />
            <SubscriptionModal />
        </>
    )
}

export default Modal