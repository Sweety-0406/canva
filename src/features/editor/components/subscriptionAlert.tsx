"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

import useFailedModal from "../hooks/useFailedModal"
import useSuccessModal from "../hooks/uesSuccessModal"


const SubscriptionAlertModal = ()=>{
    const params = useSearchParams()
    const {onOpen: onOpenFail} = useFailedModal()
    const {onOpen: onOpenSuccess} = useSuccessModal()
    const canceled = params.get("canceled")
    const success = params.get("success")

    useEffect(()=>{
        if(canceled){
            onOpenFail()
        }
        if(success){
            onOpenSuccess()
        }
    },[canceled, onOpenFail, success, onOpenSuccess])
    return null
}

export default SubscriptionAlertModal