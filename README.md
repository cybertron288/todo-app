# TO-DO Application

This is a simple TO-DO application built using React, TypeScript, Vite, Tailwind CSS, and Redux. The application allows users to create, update, and manage tasks in a to-do list. The UI includes animations for a better user experience, and the state is managed using Redux.

## Features

- **Task List:** Display a list of tasks categorized by status (In progress, Pending, Completed).
- **Add Task:** Add new tasks with a title and description.
- **Edit Task:** Edit the details of an existing task.
- **Delete Task:** Remove a task from the list.
- **Mark Task as Completed:** Mark tasks as completed, with visual distinction.
- **Accordion:** Tasks are displayed within accordions for each status, with only one accordion open at a time.
- **State Management:** All application state is managed using Redux.
- **Responsive Design:** The application is fully responsive and works on all screen sizes.
- **Animations:** Smooth animations for opening and closing accordions using Framer Motion.

## Tech Stack

- **React:** Frontend UI library.
- **TypeScript:** Typed superset of JavaScript for better development experience.
- **Vite:** Fast build tool and development server.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Redux:** State management library.
- **Framer Motion:** Library for animations.

## Tech Stack

Demo: https://todo-app-sigma-neon.vercel.app/

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)

### Installation

1. Clone the repository:

    ```     
      git clone https://github.com/cybertron288/todo-app.git
    ```
    ```
      cd todo-app
    ```

2. Install dependencies:

    ```   
      yarn install
    ```

3. Start the development server:

    ```  
      yarn dev
    ```

4. Open your browser and navigate to:

    ```
      http://localhost:1234
    ```

### Usage

1. Add Task: Click the "+" button to add a new task. Fill out the title and description, and click "Add".
2. Edit Task: Click the pencil icon next to any task to edit it. Modify the details and click "Update".
3. Delete Task: Click the trash icon next to any task to delete it.
4. Mark as Completed: Click the checkbox next to any task to mark it as completed.
5. Accordion: Click on the task status headers (In progress, Pending, Completed) to toggle the visibility of tasks under each status.
