import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, error } = useAuth0();

    if (isLoading) {
        return (
            <main className="auth-page">
                <section className="auth-card">
                    <p>Checking authentication...</p>
                </section>
            </main>
        );
    }

    if (error) {
        return (
            <main className="auth-page">
                <section className="auth-card">
                    <h1>Authentication Error</h1>
                    <p>{error.message}</p>
                </section>
            </main>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;