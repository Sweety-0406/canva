"use client"

import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { RxCross1 } from "react-icons/rx";


interface ModalProps{
    isOpen:boolean;
    isPending:boolean;
    onClose: ()=>void;
    onSubmit: ()=>void;
}


const DeleteModal:React.FC<ModalProps>=({
    isOpen,
    isPending,
    onClose,
    onSubmit,
})=>{

    const closeHandler = useCallback(()=>{
      setTimeout(()=>{
        onClose();
      },300)
    },[onClose]);

    const submitHandler=useCallback(()=>{
      onSubmit();
    },[onSubmit])


    if(!isOpen){
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
                        Delete Project
                    </div>
                    
                </div>
                <hr />
                <div className='relative pt-6 px-6 pb-6 mx-2'>
                    <div className="flex  justify-center text-lg text-stone-700">
                        <p>Are you sure you want to delete the project!!</p>
                    </div>
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
                     variant="destructive"
                     disabled={isPending}
                     onClick={submitHandler} 
                    >
                        Delete
                    </Button>
                    <Button
                     className="   "
                     disabled={isPending}
                     variant="secondary"
                     onClick={onClose} 
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

export default DeleteModal