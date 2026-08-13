import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/authSlice";
import "../style/src/components/surfaces.css";

export default function Profile() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="container app-shell" style={{ maxWidth: 640 }}>
      <div className="mb-4">
        <p className="page-kicker">Account</p>
        <h1 className="page-title">Profile</h1>
        <p className="page-subtitle">Your sign-in details and session controls.</p>
      </div>

      <div className="surface-card">
        <div className="card-body d-flex flex-column flex-sm-row align-items-sm-center gap-3">
          <div
            className="profile-avatar rounded-circle text-white d-flex align-items-center justify-content-center flex-shrink-0"
            style={{ width: 64, height: 64, fontSize: 22, fontWeight: 600 }}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div>
            <h5 className="mb-1">{user.name}</h5>
            <p className="text-muted mb-1">{user.email}</p>
            <span className="badge badge-soft">
              {user.authProvider === "google" ? "Signed in with Google" : "Signed in with Email"}
            </span>
          </div>
        </div>
      </div>

      <button className="btn btn-outline-danger w-100 mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
