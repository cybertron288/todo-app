import React from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={onClose}
          className="fixed inset-0 z-50 flex w-full items-center justify-center"
        >
          {/* Backdrop Animation */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Dialog Box Animation */}
          <motion.div
            className="relative h-full w-full rounded bg-white shadow-md md:mx-4 md:h-fit md:max-w-sm md:p-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Dialog.Title className="bg-primary p-6 text-2xl font-bold text-white md:bg-white md:p-0 md:text-inherit">
              {title}
            </Dialog.Title>
            <Dialog.Description className="mt-2 p-6 text-sm md:p-0">
              {description}
            </Dialog.Description>
            <div className="absolute bottom-0 mt-4 flex w-full justify-between space-x-2 p-6 md:relative md:p-0">
              <button
                className="rounded border border-primary px-4 py-2 text-primary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="rounded bg-red-500 px-4 py-2 text-white"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationDialog;
