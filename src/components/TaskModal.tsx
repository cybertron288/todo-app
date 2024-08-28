import { Combobox, Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import PlusIcon from "../assets/svg/plus.svg?react";
import {
  addTask,
  closeModal,
  openModal,
  updateTask,
} from "../slice/tasksSlice";
import { RootState } from "../store";
import type { Task, StatusColorMap } from "../slice/tasksSlice";

interface TaskModalProps {
  task?: Task;
}

type TaskStatus = "pending" | "in-progress" | "completed";

const TaskModal: React.FC<TaskModalProps> = ({}) => {
  const isModalOpen = useSelector(
    (state: RootState) => state.tasks.isModalOpen,
  );
  const statusColorMap: StatusColorMap = useSelector(
    (state: RootState) => state.tasks.statusColorMap,
  );
  const editTask = useSelector((state: RootState) => state.tasks.editTask);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("pending");

  const statuses = ["pending", "in-progress", "completed"];

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setSelectedStatus(editTask.status);
    } else {
      resetForm();
    }
  }, [editTask, isModalOpen]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSelectedStatus("pending");
  };

  const handleAddOrUpdateTask = () => {
    if (title.trim()) {
      const taskData: {
        id: string;
        title: string;
        description: string;
        status: TaskStatus;
      } = {
        id: editTask?.id || uuidv4(),
        title,
        description,
        status: selectedStatus as TaskStatus,
      };
      editTask ? dispatch(updateTask(taskData)) : dispatch(addTask(taskData));
      dispatch(closeModal());
    }
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-lg"
        onClick={() => {
          resetForm();
          dispatch(openModal(null));
        }}
      >
        <PlusIcon />
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <Dialog
            open={isModalOpen}
            onClose={() => dispatch(closeModal())}
            className="relative z-50"
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <div className="fixed inset-0 flex w-screen items-center justify-center md:p-4">
              <motion.div
                className="h-full w-full space-y-4 bg-white shadow-lg md:h-auto md:w-[498px] md:rounded md:p-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <Dialog.Title className="bg-primary p-6 text-2xl font-bold text-white md:bg-white md:p-0 md:text-inherit">
                  {editTask ? "Edit Task" : "Add Task"}
                </Dialog.Title>
                <div className="mt-4 flex flex-col gap-4 p-6 md:p-0">
                  <input
                    className="w-full rounded border border-gray p-2 focus:outline-1 focus:outline-primary"
                    type="text"
                    placeholder="Enter the title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    className="w-full rounded border border-gray p-2 focus:outline-1 focus:outline-primary"
                    placeholder="Enter the description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {editTask && (
                    <div>
                      <Combobox
                        value={selectedStatus}
                        onChange={(value) =>
                          setSelectedStatus(value ?? "pending")
                        }
                      >
                        <div className="relative">
                          <Combobox.Button as="div">
                            <Combobox.Input
                              readOnly
                              className="bg-gray-800 inline-flex w-full cursor-pointer items-center gap-2 rounded border border-gray px-3 py-1.5 pr-10 text-sm/6 focus:outline-primary"
                              displayValue={(status: string) => status}
                            />
                          </Combobox.Button>
                          <Combobox.Options className="absolute z-[2] mt-1 max-h-60 w-full overflow-auto bg-white py-4 pl-4 pr-5 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {statuses.map((status) => (
                              <Combobox.Option
                                key={status}
                                value={status}
                                className={({ active }) =>
                                  `relative cursor-pointer select-none rounded px-4 py-2 ${
                                    active ? "bg-offwhite" : "text-gray-900"
                                  }`
                                }
                              >
                                {({ selected }) => (
                                  <span
                                    className={`flex items-center gap-2 ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    <span
                                      className={`h-2 w-2 rounded-full`}
                                      style={{
                                        // @ts-ignore
                                        backgroundColor: statusColorMap[status],
                                      }}
                                    ></span>
                                    {status.charAt(0).toUpperCase() +
                                      status.slice(1)}
                                  </span>
                                )}
                              </Combobox.Option>
                            ))}
                          </Combobox.Options>
                        </div>
                      </Combobox>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 mt-4 flex w-full justify-between p-6 md:relative md:p-0 md:px-0">
                    <button
                      className="rounded border border-primary px-6 py-2 text-primary"
                      onClick={() => dispatch(closeModal())}
                    >
                      Cancel
                    </button>

                    <button
                      className="rounded bg-primary px-6 py-2 text-white disabled:bg-primary/60"
                      onClick={handleAddOrUpdateTask}
                      disabled={!(title.trim().length > 0)}
                    >
                      {editTask ? "Update" : "ADD"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default TaskModal;
