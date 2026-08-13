import "../style/src/components/surfaces.css";

export default function SummaryCard({ label, value, variant }) {
  const accent = {
    primary: "var(--wl-primary)",
    success: "var(--wl-income)",
    danger: "var(--wl-expense)",
    warning: "var(--wl-warning)",
  }[variant] || "var(--wl-primary)";

  return (
    <div className="summary-card-col">
      <div className="surface-card metric-card h-100" style={{ "--accent": accent }}>
        <div className="card-body">
          <p className="metric-label">{label}</p>
          <h3 className="metric-value">₹{Number(value || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
        </div>
      </div>
    </div>
  );
}
