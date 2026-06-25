import { useState } from "react";
import type { TaskFormData, TaskFormErrors, TaskStatus } from "../types";

interface TaskFormProps {
    initialValues: TaskFormData;
    onSubmit: (FormData: TaskFormData) => void;
    submitButtonText: string;
}

const validateTaskForm = (formData: TaskFormData): TaskFormErrors => {
    const errors: TaskFormErrors = {};

    if (!formData.title.trim()) {
        errors.title = "Task title is required.";
    }

    if (!formData.description.trim()) {
        errors.description = "Task description is required.";
    }

    return errors;
};

function TaskForm({
    initialValues,
    onSubmit,
    submitButtonText,
}: TaskFormProps) {
    const [formData, setFormData] = useState<TaskFormData> (initialValues);
    const [errors, setErrors] = useState<TaskFormErrors> ({});

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            title: event.target.value,
        });
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            description: event.target.value,
        });
    };

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            status: event.target.value as TaskStatus,
        });
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationErrors = validateTaskForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        };

        onSubmit(formData);
    }

    return (
        <form className="task-form" onSubmit={handleFormSubmit}>
            <label htmlFor="title">Task Title</label>
            <input
                id="title"
                type="text"
                value={formData.title}
                placeholder="Enter task title"
                onChange={handleTitleChange}
            />

            {errors.title && <p className="error-message">{errors.title}</p>}

            <label htmlFor="description">Task Description</label>
            <textarea
                id="description"
                value={formData.description}
                placeholder="Enter task description"
                onChange={handleDescriptionChange}
            />

            {errors.description && (<p className="error-message">{errors.description}</p>)}

            <label htmlFor="status">Status</label>
            <select
                id="status"
                value={formData.status}
                onChange={handleStatusChange}
            >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>

            <button type="submit">{submitButtonText}</button>
        </form>
    );
};

export default TaskForm;