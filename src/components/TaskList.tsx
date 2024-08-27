import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Search from "./Search"; // Import the Search component
import TaskAccordion from "./TaskAccordion";

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      <Search onSearch={handleSearch} />
      <TaskAccordion
        title="Pending"
        tasks={filteredTasks.filter((task) => task.status === "pending")}
        isOpen={openAccordion === "pending"}
        onToggle={() => handleToggle("pending")}
      />
      <TaskAccordion
        title="In Progress"
        tasks={filteredTasks.filter((task) => task.status === "in-progress")}
        isOpen={openAccordion === "in-progress"}
        onToggle={() => handleToggle("in-progress")}
      />
      <TaskAccordion
        title="Completed"
        tasks={filteredTasks.filter((task) => task.status === "completed")}
        isOpen={openAccordion === "completed"}
        onToggle={() => handleToggle("completed")}
      />
    </div>
  );
};

export default TaskList;
