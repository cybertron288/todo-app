import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
}

interface TasksState {
    tasks: Task[];
    isModalOpen: boolean
}

const initialState: TasksState = {
    tasks: [],
    isModalOpen: false
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action: PayloadAction<{ id: string; title: string; status: Task['status'] }>) => {
            const { id, title, status } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                task.title = title;
                task.status = status;
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
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
