export default function SummaryCard({ label, value, variant }) {
  return (
    <div className="col-md-4 mb-3">
      <div className={`card shadow-sm border-0 border-start border-4 border-${variant}`}>
        <div className="card-body">
          <p className="text-muted mb-1">{label}</p>
          <h3 className={`mb-0 text-${variant}`}>₹{value.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}