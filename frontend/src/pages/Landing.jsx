import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      {/* Top bar */}
      <nav className="navbar navbar-light bg-white border-bottom px-4">
        <span className="navbar-brand fw-bold text-primary">WalletLog</span>
        <div className="ms-auto d-flex gap-2">
          <Link to="/login" className="btn btn-outline-primary btn-sm">Log In</Link>
          <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="text-center py-5 bg-light">
        <h1 className="fw-bold mb-3">Track every rupee, effortlessly.</h1>
        <p className="text-muted mb-4 mx-auto" style={{ maxWidth: 520 }}>
          WalletLog helps you log income and expenses, organize them by category,
          and see exactly where your money goes — with real-time charts and insights.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/signup" className="btn btn-primary btn-lg">Get Started Free</Link>
          <Link to="/login" className="btn btn-outline-secondary btn-lg">I already have an account</Link>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="container py-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <h5>📊 Visual Analytics</h5>
            <p className="text-muted">Pie, bar, and line charts show your spending patterns at a glance.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h5>🗂️ Smart Categories</h5>
            <p className="text-muted">Every transaction organized by category — food, bills, travel, and more.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h5>🔐 Secure & Simple</h5>
            <p className="text-muted">Sign in with Google or email in seconds. Your data, your account.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-muted py-4 border-top">
        <small>WalletLog — built as part of an internship project.</small>
      </footer>
    </div>
  );
}