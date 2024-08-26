import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../slice/tasksSlice";
import { Task } from "../slice/tasksSlice";
import { motion } from "framer-motion";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import TaskModal from "./TaskModal";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-center justify-between p-2 border-b"
    >
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-gray-600 text-sm">{task.description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="p-2 text-blue-500 hover:text-blue-700"
          onClick={() => onEdit(task)}
        >
          <AiOutlineEdit className="w-5 h-5" />
        </button>
        <button
          className="p-2 text-red-500 hover:text-red-700"
          onClick={handleDelete}
        >
          <MdOutlineDelete className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
