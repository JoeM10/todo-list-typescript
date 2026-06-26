import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function LoginPage() {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return (
            <main className="auth-page">
                <section className="auth-card">
                    <p>Checking authentication...</p>
                </section>
            </main>
        );
    };

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <h1>Login</h1>
                <p>Login to access your task dashboard.</p>

                <button type="button" onClick={() => loginWithRedirect()}>
                    Login with Auth0
                </button>
            </section>
        </main>
    );
};

export default LoginPage;