import {create} from 'zustand';

interface useRemovePrivateModalProps{
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
}
const useRemovePrivateModal=create<useRemovePrivateModalProps>((set)=>({
   isOpen:false,
   onClose:()=>set({isOpen:false}),
   onOpen:()=>set({isOpen:true})

}))

export default useRemovePrivateModal;