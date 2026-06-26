import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskDashboard from "./components/TaskDashboard";
import CreateTaskPage from "./pages/CreateTaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
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
			<Route path="/login" element={ <LoginPage />} />
			<Route path="/register" element={ <RegisterPage />} />
			<Route
				path="/"
				element={
					<ProtectedRoute>
						<TaskDashboard
							tasks={tasks}
							onDeleteTask={handleDeleteTask}
							onStatusChange={handleStatusChange}
						/>
					</ProtectedRoute>
				}
			/>

			<Route
				path="/tasks/new"
				element={
					<ProtectedRoute>
						<CreateTaskPage onCreateTask={handleCreateTask}/>
					</ProtectedRoute>
				}
			/>

			<Route
				path="/tasks/:taskId/edit"
				element={
					<ProtectedRoute>
						<EditTaskPage tasks={tasks} onUpdateTask={handleUpdateTask}/>
					</ProtectedRoute>
				}
			/>

			<Route
				path="/profile"
				element={
					<ProtectedRoute>
						<ProfilePage />
					</ProtectedRoute>
				}
			/>
		</Routes>
		</BrowserRouter>
	);
};

export default App;