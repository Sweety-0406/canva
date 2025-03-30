import {create} from 'zustand';

interface useDeleteModalProps{
    projectId: string | ""
    isOpen:boolean
    onOpen:(projectId:string)=>void
    onClose:()=>void
}
const useDeleteModal=create<useDeleteModalProps>((set)=>({
   projectId: "",
   isOpen:false,
   onClose:()=>set({isOpen:false, projectId: ""}),
   onOpen:(projectId:string)=>set({isOpen:true, projectId: projectId})

}))

export default useDeleteModal;