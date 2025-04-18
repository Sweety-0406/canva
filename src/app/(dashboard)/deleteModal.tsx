"use client";

import { Button } from "@/components/ui/button";
import { RxCross1 } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback } from "react";

interface ModalProps {
  isOpen: boolean;
  isPending: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const DeleteModal: React.FC<ModalProps> = ({
  isOpen,
  isPending,
  onClose,
  onSubmit,
}) => {
  const closeHandler = useCallback(() => {
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const submitHandler = useCallback(() => {
    onSubmit();
  }, [onSubmit]);

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
          className="bg-neutral-800/70 fixed inset-0 z-50 flex justify-center items-center"
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
                  onClick={closeHandler}
                  className="right-9 absolute cursor-pointer"
                >
                  <RxCross1 className="text-gray-500" size={20} />
                </button>
                <div className="text-xl font-semibold">Delete Project</div>
              </div>

              <hr />

              <div className="relative pt-6 px-6 pb-6 mx-2">
                <div className="flex justify-center text-lg text-stone-700 text-center">
                  <p>Are you sure you want to delete the project?</p>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center mx-2 mb-4">
                <div className="flex flex-row gap-3 justify-end w-full px-5 mb-4">
                  <Button
                    variant="destructive"
                    disabled={isPending}
                    onClick={submitHandler}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="secondary"
                    disabled={isPending}
                    onClick={onClose}
                  >
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

export default DeleteModal;
