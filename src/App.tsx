import React from "react";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import TaskModal from "./components/TaskModal";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-lg mx-auto bg-white  rounded-lg shadow-[0px_0px_6px_0px_#00000019]">
        <h1 className="text-2xl font-semibold text-left mb-4 bg-primary text-white px-6 rounded-lg py-3 mx-auto">
          TO-DO APP
        </h1>
        <div className="p-6">
          <TaskModal />
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default App;
