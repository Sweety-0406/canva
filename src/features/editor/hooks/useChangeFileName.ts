import {create} from 'zustand';

interface useChangeFileNameModalProps{
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
}
const useChangeFileNameModal=create<useChangeFileNameModalProps>((set)=>({
   isOpen:false,
   onClose:()=>set({isOpen:false}),
   onOpen:()=>set({isOpen:true})

}))

export default useChangeFileNameModal;