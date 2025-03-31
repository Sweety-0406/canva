import {create} from "zustand"

interface useFailedModalProps{
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
}
const useFailedModal=create<useFailedModalProps>((set)=>({
   isOpen:false,
   onClose:()=>set({isOpen:false}),
   onOpen:()=>set({isOpen:true})

}))

export default useFailedModal;