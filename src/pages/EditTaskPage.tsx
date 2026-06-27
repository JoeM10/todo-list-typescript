import { Link, useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { useTaskContext } from "../context/TaskContext";
import type { TaskFormData } from "../types";

function EditTaskPage() {
    const navigate = useNavigate();
    const { taskId } = useParams();
    const { tasks, updateTask } = useTaskContext();

    const numericTaskId = Number(taskId);

    const taskToEdit = tasks.find((task) => task.id === numericTaskId);

    if (!taskToEdit) {
        return (
            <main className="page">
                <h1>Task Not Found</h1>
                <p>The task you are trying to edit does not exist.</p>

                <Link className="button-link" to="/">
                    Back to Dashboard
                </Link>
            </main>
        )
    }

    const initialValues: TaskFormData = {
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
    };

    const handleUpdateTask = (formData: TaskFormData) => {
        updateTask(taskToEdit.id, formData);
        navigate("/");
    };

    return (
        <main className="page">
            <div className="page-header">
                <div>
                    <h1>Edit Task</h1>
                    <p>Update the details for this task.</p>
                </div>

                <Link className="button-link secondary-link" to="/">
                    Back to Dashboard
                </Link>
            </div>

            <TaskForm
                initialValues={initialValues}
                onSubmit={handleUpdateTask}
                submitButtonText="Save Changes"
            />
        </main>
    );
};

export default EditTaskPage;