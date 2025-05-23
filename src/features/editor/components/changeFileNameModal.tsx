"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RxCross1 } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useChangeFileNameModal from "../hooks/useChangeFileName";

interface ModalProps {
  fileName: string;
  projectId: string;
  setFileName: (value: string) => void;
}

const ChangeFileNameModal = ({ fileName, projectId, setFileName }: ModalProps) => {
  const [name, setName] = useState(fileName);
  const [isLoading, setIsLoading] = useState(false);

  const changeFileNameModal = useChangeFileNameModal();
  const isOpen = changeFileNameModal.isOpen;
  const close = changeFileNameModal.onClose;

  const submitHandler = async (e:  React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.patch(`/api/projects/${projectId}/changeFileName`, { name });
      if (response.status === 200) {
        toast.success("File name changed successfully.");
        setFileName(response.data.data.name);
        close();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch{
      toast.error("Error updating file name.");
    } finally {
      setName(fileName);
      setIsLoading(false);
    }
  };

  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { duration: 0.25, ease: "easeInOut" } },
  };

  const modal = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.25, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-neutral-800/70 flex justify-center items-center"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="bg-white w-full sm:w-4/6 lg:w-3/6 xl:w-2/5 h-full sm:h-auto my-6 mx-auto rounded-xl shadow-xl"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col mx-2">
              <div className="flex items-center justify-center relative py-5 md:py-4">
                <button
                  onClick={close}
                  className="right-9 absolute cursor-pointer"
                >
                  <RxCross1 className="text-gray-500" size={20} />
                </button>
                <div className="text-xl font-semibold">
                  Change File Name
                </div>
              </div>

              <hr />
              <p className="px-6 mx-2 mt-2 text-gray-500">
                Update the project name to better reflect its purpose.
              </p>

              <div className="relative pt-6 px-6 pb-6 mx-2">
                <label className="ml-[6px] font-semibold">File Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={fileName}
                  type="text"
                />
              </div>

              <div className="flex flex-col justify-center items-center mx-2 mb-4">
                <div className="flex flex-row gap-3 justify-end w-full px-5 mb-4">
                  <Button
                    variant="purple"
                    disabled={isLoading}
                    onClick={submitHandler}
                  >
                    Rename
                  </Button>
                  <Button variant="secondary" onClick={close}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChangeFileNameModal;
