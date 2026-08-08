import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../features/authSlice";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signupUser(form)).unwrap();
      navigate("/dashboard");
    } catch {
      setError("Signup failed — email may already be registered");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ width: 380 }}>
        <h4 className="mb-3 text-center">Create Account</h4>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" placeholder="Name"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="form-control mb-2" type="email" placeholder="Email"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input className="form-control mb-3" type="password" placeholder="Password"
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <button className="btn btn-primary w-100 mb-2" type="submit">Create Account</button>
        </form>
        <a className="btn btn-outline-secondary w-100" href={`${import.meta.env.VITE_API_URL}/auth/google`}>
          Continue with Google
        </a>
        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}