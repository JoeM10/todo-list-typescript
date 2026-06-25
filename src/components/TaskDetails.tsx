import type { Task, TaskStatus } from "../types";

interface TaskDetailsProps {
    task: Task;
    onClose: () => void;
    onEdit: (task: Task) => void;
    onDelete: (taskId: number) => void;
    onStatusChange: (taskId: number, newStatus: TaskStatus) => void;
}

function TaskDetails({
    task,
    onClose,
    onEdit,
    onDelete,
    onStatusChange,
}: TaskDetailsProps) {
    return (
        <section className="task-details">
            <div className="task-details-header">
                <div>
                    <p className="eyebrow">Selected Task</p>
                    <h2>{task.title}</h2>
                </div>

                <button type="button" className="secondary" onClick={onClose}>
                    Close
                </button>
            </div>

            <div className="task-details-content">
                <p>
                    <strong>ID:</strong> {task.id}
                </p>

                <p>
                    <strong>Description:</strong> {task.description}
                </p>

                <p>
                    <strong>Status:</strong> {task.status}
                </p>
            </div>

            <div className="details-status-control">
                <label htmlFor="details-status">Update Status</label>

                <select
                    id="details-status"
                    value={task.status}
                    onChange={(event) =>
                        onStatusChange(task.id, event.target.value as TaskStatus)
                    }
                >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div className="details-actions">
                <button type="button" onClick={() => onEdit(task)}>
                    Edit Full Task
                </button>

                <button type="button" onClick={() => onDelete(task.id)}>
                    Delete Task
                </button>
            </div>
        </section>
    );
}

export default TaskDetails;