import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/authSlice";

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
    <div className="container mt-4" style={{ maxWidth: 480 }}>
      <h4 className="mb-4">Profile</h4>

      <div className="card shadow-sm border-0">
        <div className="card-body d-flex align-items-center gap-3">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
            style={{ width: 64, height: 64, fontSize: 22, fontWeight: 600 }}
          >
            {initials}
          </div>
          <div>
            <h5 className="mb-1">{user.name}</h5>
            <p className="text-muted mb-1">{user.email}</p>
            <span className={`badge ${user.authProvider === "google" ? "bg-danger" : "bg-secondary"}`}>
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