import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskDashboard from "./components/TaskDashboard";
import { TaskProvider } from "./context/TaskContext";
import CreateTaskPage from "./pages/CreateTaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<TaskProvider>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />

					<Route
						path="/"
						element={
							<ProtectedRoute>
								<TaskDashboard />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/tasks/new"
						element={
							<ProtectedRoute>
								<CreateTaskPage />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/tasks/:taskId/edit"
						element={
							<ProtectedRoute>
								<EditTaskPage />
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
			</TaskProvider>
		</BrowserRouter>
	);
};

export default App;