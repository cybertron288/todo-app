import { motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PencilIcon from "../assets/svg/pencil.svg?react";
import TrashIcon from "../assets/svg/trash.svg?react";
import { Task, deleteTask, openModal } from "../slice/tasksSlice";
import { RootState } from "../store";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const dispatch = useDispatch();
  const statusMap = useSelector(
    (state: RootState) => state.tasks.statusColorMap,
  );

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleModalOpen = () => {
    dispatch(openModal());
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <div className="flex items-center justify-between p-4 hover:bg-offwhite">
        <div>
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-gray-600 text-sm">{task.description}</p>
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
              onClick={() => {
                handleModalOpen();
                onEdit(task);
              }}
            >
              <PencilIcon />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={handleDelete}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
