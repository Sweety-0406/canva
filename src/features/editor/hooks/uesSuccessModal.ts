import {create} from "zustand"

interface useSuccessModalProps{
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
}
const useSuccessModal=create<useSuccessModalProps>((set)=>({
   isOpen:false,
   onClose:()=>set({isOpen:false}),
   onOpen:()=>set({isOpen:true})

}))

export default useSuccessModal;