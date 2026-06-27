import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import type { Task } from "../types";
import { useTaskContext } from "../context/TaskContext";
import TaskDetails from "./TaskDetails";
import LogoutButton from "./LogoutButton";

function TaskDashboard() {
	const navigate = useNavigate();
	const { tasks, deleteTask, changeTaskStatus } = useTaskContext();
	const { user } = useAuth0();

	const [selectedTaskId, setSelectedTaskId] = useState<number | null> (null);

	const selectedTask: Task | null =
		tasks.find((task) => task.id === selectedTaskId) ?? null;

	const handleViewDetails = (taskId: number) => {
		setSelectedTaskId(taskId);
	};

	const handleCloseDetails = () => {
		setSelectedTaskId(null);
	};

	const handleEdit = (task: Task) => {
		navigate(`/tasks/${task.id}/edit`);
	};

	const handleDelete = (taskId: number) => {
		deleteTask(taskId);

		if (selectedTaskId === taskId) {
			setSelectedTaskId(null);
		}
	};

	return (
		<main className="dashboard">
			<section className="dashboard-header">
				<div>
					<h1>Task Dashboard</h1>
					<p>Manage your tasks by viewing, editing, and deleting them.</p>

					{user?.name && <p className="welcome-message">Welcome, {user.name}</p>}
				</div>

				<div className="header-actions">
					<Link className="button-link" to="/tasks/new">
						Create New Task
					</Link>

					<Link className="button-link secondary-link" to="/profile">
						Profile
					</Link>

					<LogoutButton />
				</div>
			</section>

			<section className="task-list">
				<h2>My Tasks</h2>

				{selectedTask && (
					<TaskDetails
						task={selectedTask}
						onClose={handleCloseDetails}
						onEdit={handleEdit}
						onDelete={handleDelete}
						onStatusChange={changeTaskStatus}
					/>
				)}

				{tasks.length === 0 ? (
					<p>No tasks have been created yet.</p>
				) : (
					tasks.map((task) => (
						<article className="task-card" key={task.id}>
							<div>
								<h3>{task.title}</h3>
								<p>{task.description}</p>
								<span className="status">{task.status}</span>
							</div>

							<div className="task-actions">
								<button type="button" onClick={() => handleViewDetails(task.id)}>
									View Details
								</button>

								<button type="button" onClick={() => handleEdit(task)}>
									Edit
								</button>

								<button type="button" onClick={() => handleDelete(task.id)}>
									Delete
								</button>
							</div>
						</article>
					))
				)}
			</section>
		</main>
	);
};

export default TaskDashboard;