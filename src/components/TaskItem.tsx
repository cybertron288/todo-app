import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PencilIcon from "../assets/svg/pencil.svg?react";
import TrashIcon from "../assets/svg/trash.svg?react";
import { Task, deleteTask, openModal } from "../slice/tasksSlice";
import { RootState } from "../store";
import Avvvatars from "avvvatars-react";
import ConfirmationDialog from "./ConfirmationDialog"; // Import the confirmation dialog

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const statusMap = useSelector(
    (state: RootState) => state.tasks.statusColorMap,
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleModalOpen = () => {
    dispatch(openModal(task));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <div className="flex items-center justify-between rounded p-4 hover:bg-offwhite">
        <div className="flex items-start gap-2">
          <div>
            <Avvvatars value={task.title} size={20} />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">{task.title}</h3>
            <p className="text-gray-600 text-sm">{task.description}</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full`}
              style={{
                backgroundColor: statusMap[task.status],
              }}
            ></span>
            <span>{task.status}</span>
          </div>
          <div className="flex space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={handleModalOpen}
            >
              <PencilIcon />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => setIsDialogOpen(true)} // Open the confirmation dialog
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
      />
    </motion.div>
  );
};

export default TaskItem;
