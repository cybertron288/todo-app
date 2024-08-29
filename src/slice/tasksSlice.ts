import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'In progress' | 'completed';
    date: Date
}

export interface StatusColorMap {
    pending: string,
    "In progress": string,
    completed: string,
}

interface TasksState {
    tasks: Task[];
    editTask: Task | null;
    isModalOpen: boolean;
    statusColorMap: StatusColorMap;
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
    editTask: null,
    statusColorMap: {
        pending: "#D0D0D0",
        "In progress": "#FFB03C",
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
        updateTask: (state, action: PayloadAction<{ id: string; title: string; description: string; status: Task['status']; date: Date }>) => {
            const { id, title, status, description, date } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                task.title = title;
                task.status = status;
                task.description = description;
                task.date = date
                saveTasksToLocalStorage(state.tasks);
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            saveTasksToLocalStorage(state.tasks);
        },
        openModal: (state, action: PayloadAction<Task | null>) => {
            state.isModalOpen = true
            state.editTask = action.payload;
        },
        closeModal: (state) => {
            state.isModalOpen = false
            state.editTask = null;
        }
    },
});

export const { addTask, updateTask, deleteTask, openModal, closeModal } = tasksSlice.actions;
export default tasksSlice.reducer;
