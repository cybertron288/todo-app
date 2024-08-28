import React from "react";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="mx-auto max-w-lg rounded-lg bg-white shadow-[0px_0px_6px_0px_#00000019]">
        <h1 className="mx-auto mb-4 rounded-lg bg-primary px-6 py-3 text-left text-2xl font-semibold text-white">
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
