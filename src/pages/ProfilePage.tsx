import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/LogoutButton";
import type { Auth0UserProfile } from "../types";

function ProfilePage() {
    const { user } = useAuth0<Auth0UserProfile> ();

    if (!user) {
        return (
            <main className="page">
                <h1>Profile</h1>
                <p>No user information available.</p>

                <Link className="button-link" to="/">
                    Back to Dashboard
                </Link>
            </main>
        );
    }

    return (
        <main className="page">
            <div className="page-header">
                <div>
                    <h1>Profile</h1>
                    <p>View your authenticated user information.</p>
                </div>

                <Link className="button-link secondary-link" to="/">
                    Back to Dashboard
                </Link>
            </div>

            <section className="profile-card">
                {user.picture && (
                    <img
                        className="profile-image"
                        src={user.picture}
                        alt={user.name ?? "User Profile"}
                    />
                )}

                <div>
                    <h2>{user.name ?? "Unknown User"}</h2>
                    <p>
                        <strong>Email:</strong> {user.email ?? "No email available"}
                    </p>
                    <p>
                        <strong>Nickname:</strong> {user.nickname ?? "No nickname available"}
                    </p>
                    <p>
                        <strong>User ID:</strong> {user.sub ?? "No user ID available"}
                    </p>

                    <LogoutButton />

                </div>
            </section>
        </main>
    );
}

export default ProfilePage;