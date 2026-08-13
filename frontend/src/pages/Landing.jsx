import { Link } from "react-router-dom";
import "../style/src/pages/landing.css";

export default function Landing({ theme, onToggleTheme }) {
  return (
    <div>
      <nav className="navbar wallet-navbar px-3 px-lg-4">
        <span className="navbar-brand d-flex align-items-center gap-2 fw-bold">
          <span className="brand-mark" aria-hidden="true">WL</span>
          WalletLog
        </span>
        <div className="ms-auto d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn theme-toggle d-none d-sm-inline-flex"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <Link to="/login" className="btn btn-outline-primary btn-sm">Log In</Link>
          <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <p className="page-kicker">Personal expense tracking</p>
              <h1 className="display-4 fw-bold mb-3">WalletLog</h1>
              <p className="lead text-muted mb-4">
                A clean, focused place to log income and expenses, organize spending by category,
                and understand your money with readable analytics.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <Link to="/signup" className="btn btn-primary btn-lg">Get Started Free</Link>
                <Link to="/login" className="btn btn-outline-secondary btn-lg">Log In</Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-product-panel" aria-label="WalletLog dashboard preview">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <p className="text-muted small mb-1">Monthly expenses</p>
                    <h2 className="h4 mb-0">₹42,850</h2>
                  </div>
                  <span className="status-pill expense">expense</span>
                </div>
                <div className="hero-mini-chart" aria-hidden="true">
                  {[52, 74, 45, 88, 64, 92, 58].map((height) => (
                    <span key={height} style={{ height: `${height}%` }} />
                  ))}
                </div>
                <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                  <span className="text-muted">Food</span>
                  <strong>₹8,240</strong>
                </div>
                <div className="d-flex justify-content-between py-2 border-top">
                  <span className="text-muted">Bills</span>
                  <strong>₹12,600</strong>
                </div>
                <div className="d-flex justify-content-between py-2 border-top">
                  <span className="text-muted">Travel</span>
                  <strong>₹5,430</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-3">
          <div className="col-md-4 mb-4">
            <h2 className="h5">Visual Analytics</h2>
            <p className="text-muted">Pie, bar, and line charts show spending patterns without clutter.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h2 className="h5">Smart Categories</h2>
            <p className="text-muted">Every transaction stays organized by income or expense category.</p>
          </div>
          <div className="col-md-4 mb-4">
            <h2 className="h5">Secure and Simple</h2>
            <p className="text-muted">Sign in with Google or email in seconds. Your data, your account.</p>
          </div>
        </div>
      </div>

      <footer className="text-center text-muted py-4 border-top">
        <small>WalletLog - built as a modern personal finance workspace.</small>
      </footer>
    </div>
  );
}
