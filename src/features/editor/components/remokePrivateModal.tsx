"use client"

import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Input } from "@/components/ui/input";
import axios from "axios";
import toast from "react-hot-toast";
import useRemovePrivateModal from "../hooks/useRemovePrivateModal";


interface ModalProps{
    projectId: string,
    setIsPrivate:(value:boolean)=>void
}


const RemovePrivateModal=({projectId, setIsPrivate}:ModalProps)=>{
    const[password, setPassword] = useState<string>("")
    const removePrivateModal = useRemovePrivateModal()
    const onClose = removePrivateModal.onClose;
    
    const closeHandler = useCallback(()=>{
      setTimeout(()=>{
       onClose();
      },300)
    },[onClose]);

    const submitHandler=async (e: any)=>{
      e.preventDefault()
      console.log(projectId)
      const response = await axios.patch(`/api/projects/${projectId}/removePrivate`,{password})
      console.log(response);
      if(response.status==200){
        setTimeout(()=>{
          onClose();
        },300)
        toast.success("Your file is now become public file.")
        setIsPrivate(false)
      }else{
        toast.error("Something went wrong. Please try again!!")
      }
      setPassword("")
    }


    if(!removePrivateModal.isOpen){
      return null;
    }
    return(
        <div className="
        bg-neutral-800/70
        flex
        justify-center
        items-center
        fixed
        inset-0
        z-50 
        ">
          <div className="
            transition
            duration-300
            bg-white
            w-full
            sm:w-4/6
            lg:w-3/6
            xl:w-2/5
            my-6
            mx-auto
            h-full
            sm:h-auto
            rounded-xl
          ">
              <div className="
               flex
               flex-col
               mx-2
              ">
                <div className='
                 flex
                 items-center
                 justify-center
                 relative
                 py-5
                 md:py-4
                 
                '>
                    <button 
                      onClick={closeHandler}
                      className='
                      right-9 
                      absolute
                      cursor-pointer
                    '>
                      <RxCross1 className="text-gray-500" size={20}/>
                    </button>
                    <div className='text-xl  font-semibold'>
                      Remove Access Restrictions
                    </div>
                    
                </div>
                <hr />
                <p className="px-6 mx-2 mt-2 text-gray-500">Remove restrict access to this file so anyone can view or edit it.</p>
                <div className='relative pt-6 px-6 pb-6 mx-2'>
                  <label className="ml-[6px] font-semibold"> Password</label>  
                  <Input value={password}  onChange={(e)=> setPassword(e.target.value)} placeholder="Enter your password" type="password" />
                </div>
                <div className='flex flex-col justify-center items-center  mx-2 mb-4'>
                  <div className='
                    flex 
                    flex-row
                    gap-3
                    justify-end
                    w-full
                    px-5
                    mb-4
                  '>
                    <Button
                     variant="purple"
                     onClick={submitHandler} 
                    >
                      Submit
                    </Button>
                    <Button
                     variant="secondary"
                     onClick={()=>onClose()} 
                    >
                        Cancel
                    </Button>
                  </div>
                </div>
              </div>
          </div>
        </div>
    )
}

export default RemovePrivateModal