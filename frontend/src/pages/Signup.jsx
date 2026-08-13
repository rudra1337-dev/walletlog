import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../features/authSlice";
import { ButtonLoader } from "../components/loaders/SkeletonLoaders";
import "../style/src/pages/auth.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await dispatch(signupUser(form)).unwrap();
      navigate("/dashboard");
    } catch {
      setError("Signup failed - email may already be registered");
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
          <h1 className="h3 mb-1">Create your account</h1>
          <p className="text-muted mb-0">Start with a clean, private money log.</p>
        </div>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="signup-name">Name</label>
            <input id="signup-name" className="form-control" autoComplete="name"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="signup-email">Email</label>
            <input id="signup-email" className="form-control" type="email" autoComplete="email"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="signup-password">Password</label>
            <input id="signup-password" className="form-control" type="password" autoComplete="new-password" minLength="6"
              value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            <div className="form-text">Use at least 6 characters.</div>
          </div>
          <button className="btn btn-primary w-100 mb-2" type="submit" disabled={isSubmitting}>
            {isSubmitting ? <ButtonLoader label="Creating account" /> : "Create Account"}
          </button>
        </form>
        <a className="btn btn-outline-secondary w-100" href={`${import.meta.env.VITE_API_URL}/auth/google`}>
          Continue with Google
        </a>
        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
        </div>
      </div>
    </div>
  );
}
