import {create} from "zustand"

interface useSubscriptionModalProps{
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
}
const useSubscriptionModal=create<useSubscriptionModalProps>((set)=>({
   isOpen:false,
   onClose:()=>set({isOpen:false}),
   onOpen:()=>set({isOpen:true})

}))

export default useSubscriptionModal;