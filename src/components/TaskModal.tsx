// AddTaskModal.tsx
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useDispatch } from "react-redux";
import {
  addTask,
  updateTask,
  deleteTask,
  openModal,
  closeModal,
} from "../slice/tasksSlice";
import { Task } from "../slice/tasksSlice";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import PlusIcon from "../assets/svg/plus.svg?react";
import { AiOutlineMore, AiOutlineCheck } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface TaskModalProps {
  task?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ task }) => {
  const isModalOpen = useSelector(
    (state: RootState) => state.tasks.isModalOpen
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (title.trim()) {
      dispatch(
        addTask({
          id: uuidv4(),
          title,
          description,
          status: "pending",
        })
      );
      setTitle("");
      setDescription("");
      dispatch(closeModal());
    }
  };

  const handleSaveChanges = () => {
    if (task) {
      dispatch(
        updateTask({
          id: task.id,
          title,
          description,
          status: task.status,
        })
      );
      dispatch(closeModal());
    }
  };

  const handleDelete = () => {
    if (task) {
      dispatch(deleteTask(task.id));
      dispatch(closeModal());
    }
  };

  const handleStatusChange = (newStatus: Task["status"]) => {
    if (task) {
      dispatch(
        updateTask({ id: task.id, title, description, status: newStatus })
      );
    }
  };

  React.useEffect(() => {
    console.log("isOpen", isModalOpen);
  }, [isModalOpen]);

  return (
    <Dialog.Root open={isModalOpen}>
      <Dialog.Trigger asChild>
        <motion.button
          className="fixed bottom-6 right-6 bg-primary text-white w-20 h-20 rounded-full shadow-lg flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => dispatch(openModal())}
        >
          <PlusIcon />
        </motion.button>
      </Dialog.Trigger>
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="fixed z-10 inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="fixed z-10 inset-0 sm:inset-1/4 bg-white p-6 rounded shadow-lg w-full h-full sm:w-auto sm:h-fit sm:rounded-lg overflow-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Dialog.Content>
                <Dialog.Title className="text-lg font-bold">
                  {task ? "Edit Task" : "Add Task"}
                </Dialog.Title>
                <Dialog.Close
                  className="absolute top-2 right-4"
                  onClick={() => dispatch(closeModal())}
                >
                  <button className="text-gray-500 text-3xl hover:text-gray-700">
                    &times;
                  </button>
                </Dialog.Close>
                <div className="mt-4">
                  <input
                    className="border border-gray p-2 w-full mb-2 rounded focus:outline-primary focus:outline-1"
                    type="text"
                    placeholder="Enter the title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    className="border border-gray p-2 w-full mb-2 rounded focus:outline-primary focus:outline-1"
                    placeholder="Enter the description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {task && (
                    <div className="mt-4">
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger className="flex items-center p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer">
                          <AiOutlineMore className="w-5 h-5 text-gray-600" />
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content
                          className="bg-white border rounded shadow-lg w-40 p-2"
                          sideOffset={5}
                        >
                          <DropdownMenu.Item
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                            onSelect={() => handleStatusChange("pending")}
                          >
                            <span className="mr-2">Pending</span>
                            {task.status === "pending" && (
                              <AiOutlineCheck className="w-5 h-5 text-green-500" />
                            )}
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                            onSelect={() => handleStatusChange("in-progress")}
                          >
                            <span className="mr-2">In Progress</span>
                            {task.status === "in-progress" && (
                              <AiOutlineCheck className="w-5 h-5 text-green-500" />
                            )}
                          </DropdownMenu.Item>
                          <DropdownMenu.Item
                            className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                            onSelect={() => handleStatusChange("completed")}
                          >
                            <span className="mr-2">Completed</span>
                            {task.status === "completed" && (
                              <AiOutlineCheck className="w-5 h-5 text-green-500" />
                            )}
                          </DropdownMenu.Item>
                          <DropdownMenu.Separator className="my-1 border-t border-gray-200" />
                          <DropdownMenu.Item
                            className="flex items-center p-2 cursor-pointer text-red-500 hover:bg-red-100"
                            onSelect={handleDelete}
                          >
                            <MdOutlineDelete className="w-5 h-5 mr-2" />
                            <span>Delete</span>
                          </DropdownMenu.Item>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </div>
                  )}
                  <div className="flex justify-between mt-4">
                    <Dialog.Close>
                      <button
                        className="border-primary border text-primary px-6 py-2 rounded"
                        onClick={() => dispatch(closeModal())}
                      >
                        Cancel
                      </button>
                    </Dialog.Close>
                    <button
                      className="bg-primary text-white px-6 py-2 rounded"
                      onClick={task ? handleSaveChanges : handleAddTask}
                    >
                      {task ? "Save" : "ADD"}
                    </button>
                  </div>
                </div>
              </Dialog.Content>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default TaskModal;
