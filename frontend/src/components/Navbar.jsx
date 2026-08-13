import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";
import "../style/src/components/navigation.css";

export default function Navbar({ theme, onToggleTheme }) {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) return null; // hide navbar on login/signup

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const linkClass = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;
  const initials = (user.name || user.email || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <nav className="navbar navbar-expand-lg sticky-top wallet-navbar px-3 px-lg-4">
      <div className="container-fluid px-0">
        <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-bold" to="/dashboard">
          <span className="brand-mark" aria-hidden="true">WL</span>
          WalletLog
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#walletlog-nav"
          aria-controls="walletlog-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="walletlog-nav">
          <div className="navbar-nav gap-lg-1 ms-lg-4 mt-3 mt-lg-0">
            <NavLink className={linkClass} to="/dashboard">Dashboard</NavLink>
            <NavLink className={linkClass} to="/transactions">Transactions</NavLink>
            <NavLink className={linkClass} to="/analytics">Analytics</NavLink>
          </div>

          <div className="ms-lg-auto d-flex flex-column flex-lg-row align-items-lg-center gap-2 mt-3 mt-lg-0">
            <button
              type="button"
              className="btn theme-toggle"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span aria-hidden="true">{theme === "dark" ? "Sun" : "Moon"}</span>
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <NavLink className="nav-avatar-link" to="/profile" aria-label={`Open ${user.name || "your"} profile`}>
              <span className="nav-avatar" aria-hidden="true">{initials}</span>
            </NavLink>
            <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
