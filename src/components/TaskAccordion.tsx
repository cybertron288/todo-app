import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import ArrowIcon from "../assets/svg/arrow.svg?react";
import { Task } from "../slice/tasksSlice";
import TaskItem from "./TaskItem";

interface TaskAccordionProps {
  title: string;
  tasks: Task[];
  isOpen: boolean;
  onToggle: () => void;
}

const TaskAccordion: React.FC<TaskAccordionProps> = ({
  title,
  tasks,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="my-4">
      <button
        className="flex w-full items-center justify-between rounded bg-offwhite px-4 py-2"
        onClick={onToggle}
      >
        <div>
          {title} (<span className="font-bold">{tasks.length}</span>)
        </div>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowIcon />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="my-2 overflow-hidden"
          >
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
            {tasks.length === 0 && "No items"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskAccordion;
