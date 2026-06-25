import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskDashboard from "./components/TaskDashboard";
import CreateTaskPage from "./pages/CreateTaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import type { Task, TaskFormData, TaskStatus } from "./types";
import "./App.css";

const initialTasks: Task[] = [
	{
		id: 1,
		title: "Finish assignment",
		description: "Complete the task dashboard page.",
		status: "In Progress",
	},
]


function App() {
	const [tasks, setTasks] = useState<Task[]> (initialTasks);
	
	const handleCreateTask = (formData: TaskFormData) => {
		const newTask: Task = {
			id: Date.now(),
			...formData,
		};
	
		setTasks((currentTasks) => [...currentTasks, newTask]);
	};
	
	const handleUpdateTask = (taskId: number, formData: TaskFormData) => {
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
	
	const handleDeleteTask = (taskId: number) => {
		setTasks((currentTasks) =>
			currentTasks.filter((task) => task.id !== taskId)
		);
	};
	
	const handleStatusChange = (taskId: number, newStatus: TaskStatus) => {
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
		<BrowserRouter>
		<Routes>
			<Route
				path="/"
				element={
					<TaskDashboard
						tasks={tasks}
						onDeleteTask={handleDeleteTask}
						onStatusChange={handleStatusChange}
					/>
				}
			/>

			<Route
				path="/tasks/new"
				element={<CreateTaskPage onCreateTask={handleCreateTask}/>}
			/>

			<Route
				path="/tasks/:taskId/edit"
				element={<EditTaskPage tasks={tasks} onUpdateTask={handleUpdateTask}/>}
			/>
		</Routes>
		</BrowserRouter>
	);
};

export default App;