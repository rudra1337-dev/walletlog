import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";

export default function Navbar() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) return null; // hide navbar on login/signup

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? "fw-semibold text-primary" : "text-dark"}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-4">
      <NavLink className="navbar-brand fw-bold text-primary" to="/dashboard">
        WalletLog
      </NavLink>

      <div className="d-flex gap-3 ms-4">
        <NavLink className={linkClass} to="/dashboard">Dashboard</NavLink>
        <NavLink className={linkClass} to="/transactions">Transactions</NavLink>
        <NavLink className={linkClass} to="/analytics">Analytics</NavLink>
      </div>

      <div className="ms-auto d-flex align-items-center gap-3">
        <NavLink className={linkClass} to="/profile">{user.name}</NavLink>
        <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}