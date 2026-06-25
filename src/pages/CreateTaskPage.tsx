import { Link, useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import type { TaskFormData } from "../types";

interface CreateTaskPageProps {
    onCreateTask: (formData: TaskFormData) => void;
};

function CreateTaskPage({ onCreateTask }: CreateTaskPageProps) {
    const navigate = useNavigate();

    const initialValues: TaskFormData = {
        title: "",
        description: "",
        status: "Not Started",
    };

    const handleCreateTask = (formData: TaskFormData) => {
        onCreateTask(formData);
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