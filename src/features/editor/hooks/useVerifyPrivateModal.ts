import {create} from 'zustand';

interface useVerifyPrivateModalProps{
    projectId: string | ""
    isOpen:boolean
    onOpen:(projectId:string)=>void
    onClose:()=>void
}
const useVerifyPrivateModal=create<useVerifyPrivateModalProps>((set)=>({
   projectId: "",
   isOpen:false,
   onClose:()=>set({isOpen:false, projectId: ""}),
   onOpen:(projectId:string)=>set({isOpen:true, projectId: projectId})

}))

export default useVerifyPrivateModal;