export type TaskStatus = "Not Started" | "In Progress" | "Completed";

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
}

export interface TaskFormData {
    title: string;
    description: string;
    status: TaskStatus;
}

export interface TaskFormErrors {
    title?: string;
    description?: string;
}