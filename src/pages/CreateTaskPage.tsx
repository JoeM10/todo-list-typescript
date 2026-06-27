import { Link, useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { useTaskContext } from "../context/TaskContext";
import type { TaskFormData } from "../types";

function CreateTaskPage() {
    const navigate = useNavigate();
    const { createTask } = useTaskContext();

    const initialValues: TaskFormData = {
        title: "",
        description: "",
        status: "Not Started",
    };

    const handleCreateTask = (formData: TaskFormData) => {
        createTask(formData);
        navigate("/");
    };

    return (
        <main className="page">
            <div className="page-header">
                <div>
                    <h1>Create Task</h1>
                    <p>Add a new task to your dashboard.</p>
                </div>

                <Link className="button-link secondary-link" to="/">
                    Back to Dashboard
                </Link>
            </div>

            <TaskForm
                initialValues={initialValues}
                onSubmit={handleCreateTask}
                submitButtonText="Create Task"
            />
        </main>
    );
};

export default CreateTaskPage;