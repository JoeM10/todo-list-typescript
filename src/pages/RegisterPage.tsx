import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function RegisterPage() {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return (
            <main className="auth-page">
                <section className="auth-card">
                    <p>Checking authentication...</p>
                </section>
            </main>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <h1>Create Account</h1>
                <p>Create an account to start managing tasks.</p>

                <button type="button" onClick={() => loginWithRedirect({
                    authorizationParams: { screen_hint: "signup", },
                })}
                >
                    Sign Up with Auth0
                </button>
            </section>
        </main>
    );
}

export default RegisterPage;