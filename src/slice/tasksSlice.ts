import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
}

interface TasksState {
    tasks: Task[];
    isModalOpen: boolean
    statusColorMap: {}
}

const loadTasksFromLocalStorage = (): Task[] => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};


const initialState: TasksState = {
    tasks: loadTasksFromLocalStorage(),
    isModalOpen: false,
    statusColorMap: {
        pending: "#D0D0D0",
        "in-progress": "#FFB03C",
        completed: "#368A04",
    }
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
            saveTasksToLocalStorage(state.tasks);
        },
        updateTask: (state, action: PayloadAction<{ id: string; title: string; description: string; status: Task['status'] }>) => {
            const { id, title, status, description } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                task.title = title;
                task.status = status;
                task.description = description;
                saveTasksToLocalStorage(state.tasks);
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            saveTasksToLocalStorage(state.tasks);
        },
        openModal: (state) => {
            state.isModalOpen = true
        },
        closeModal: (state) => {
            state.isModalOpen = false
        }
    },
});

export const { addTask, updateTask, deleteTask, openModal, closeModal } = tasksSlice.actions;
export default tasksSlice.reducer;
