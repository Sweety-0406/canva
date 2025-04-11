import {create} from 'zustand';

interface useMakePrivateModalProps{
    isOpen:boolean
    onOpen:()=>void
    onClose:()=>void
}
const useMakePrivateModal=create<useMakePrivateModalProps>((set)=>({
   isOpen:false,
   onClose:()=>set({isOpen:false}),
   onOpen:()=>set({isOpen:true})

}))

export default useMakePrivateModal;