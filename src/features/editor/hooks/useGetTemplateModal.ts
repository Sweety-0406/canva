import {create} from "zustand"

interface useGetTemplateModalProps{
    isOpen:boolean
    templateName: string
    onOpen:(templateName:string)=>void
    onClose:()=>void
}
const useGetTemplateModal=create<useGetTemplateModalProps>((set)=>({
   isOpen:false,
   templateName: "",
   onClose:()=>set({isOpen:false,templateName:""}),
   onOpen:(templateName:string)=>set({isOpen:true, templateName:templateName})

}))

export default useGetTemplateModal;