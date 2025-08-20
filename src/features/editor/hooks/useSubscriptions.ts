import {create} from "zustand"

interface useSubscriptionModalProps{
    isOpen:boolean
    pay:"monthly"|"yearly"
    onOpen:(pay?:"monthly"|"yearly")=>void
    onClose:()=>void
}
const useSubscriptionModal=create<useSubscriptionModalProps>((set)=>({
   isOpen:false,
   pay:"monthly",
   onClose:()=>set({isOpen:false}),
   onOpen:(pay)=>set({isOpen:true, pay:pay})

}))

export default useSubscriptionModal;