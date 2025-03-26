import { useEvent } from "react-use";

export const useWindowEvents = ()=>{
    useEvent("beforeunload",(e)=>{
        (e || window.event).returnValue = "Are you sure you wnat to leave?"
    })
}