import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../features/authSlice";
import { ButtonLoader } from "../components/loaders/SkeletonLoaders";
import "../style/src/pages/auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await dispatch(loginUser(form)).unwrap();
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="surface-card auth-card">
        <div className="card-body p-4">
        <div className="text-center mb-4">
          <span className="brand-mark mb-3">WL</span>
          <h1 className="h3 mb-1">Log in to WalletLog</h1>
          <p className="text-muted mb-0">Welcome back. Your ledger is ready.</p>
        </div>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="login-email">Email</label>
            <input id="login-email" className="form-control" type="email" autoComplete="email"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="login-password">Password</label>
            <input id="login-password" className="form-control" type="password" autoComplete="current-password"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button className="btn btn-primary w-100 mb-2" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <ButtonLoader label="Signing in" /> : "Log In"}
          </button>
        </form>
        <a className="btn btn-outline-secondary w-100" href={`${import.meta.env.VITE_API_URL}/auth/google`}>
          Continue with Google
        </a>
        <p className="text-center mt-3 mb-0">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        </div>
      </div>
    </div>
  );
}
