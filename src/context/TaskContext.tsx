import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Task, TaskFormData, TaskStatus } from "../types";

const initialTasks: Task[] = [
    {
        id: 1,
        title: "Finish assignment",
        description: "Complete the task dashboard page.",
        status: "In Progress",
    },
];

interface TaskContextValue {
    tasks: Task[];
    createTask: (formData: TaskFormData) => void;
    updateTask: (taskId: number, formData: TaskFormData) => void;
    deleteTask: (taskId: number) => void;
    changeTaskStatus: (taskId: number, newStatus: TaskStatus) => void;
}

const TaskContext = createContext<TaskContextValue | undefined> (undefined);

interface TaskProviderProps {
    children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
    const [tasks, setTasks] = useState<Task[]> (initialTasks);

    const createTask = (formData: TaskFormData) => {
        const newTask: Task = {
            id: Date.now(),
            ...formData,
        };

        setTasks((currentTasks) => [...currentTasks, newTask]);
    };

    const updateTask = (taskId: number, formData: TaskFormData) => {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === taskId
                    ? {
                        ...task,
                        ...formData,
                    }
                : task
            )
        );
    };

    const deleteTask = (taskId: number) => {
        setTasks((currentTasks) =>
            currentTasks.filter((task) => task.id !== taskId)
        );
    };

    const changeTaskStatus = (taskId: number, newStatus: TaskStatus) => {
        setTasks((currentTasks) => 
            currentTasks.map((task) =>
                task.id === taskId
                    ? {
                        ...task,
                        status: newStatus,
                    }
                    : task
            )
        );
    };

    return (
        <TaskContext.Provider 
            value={{ 
                tasks, 
                createTask,
                updateTask,
                deleteTask,
                changeTaskStatus,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTaskContext() {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error("useTaskContext must be used inside a TaskProvider.");
    }

    return context;
}