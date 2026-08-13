import "../../style/src/components/loaders.css";

function SkeletonLine({ width = "w-60" }) {
  return <span className={`skeleton-line ${width}`} aria-hidden="true" />;
}

function SkeletonCard({ tall = false }) {
  return (
    <div className={`skeleton-card ${tall ? "is-tall" : ""}`}>
      <SkeletonLine width="w-35" />
      <div className="skeleton-stack">
        <div className="skeleton-block" aria-hidden="true" />
        <SkeletonLine width="w-75" />
      </div>
    </div>
  );
}

function SkeletonRow({ compact = false }) {
  return (
    <div className={`skeleton-row ${compact ? "is-compact" : ""}`}>
      <span className="skeleton-circle" aria-hidden="true" />
      <div className="skeleton-row-copy">
        <SkeletonLine width="w-60" />
        <SkeletonLine width="w-35" />
      </div>
      <SkeletonLine width="w-90" />
    </div>
  );
}

export function WorkspaceLoader() {
  return (
    <div className="workspace-loader" role="status" aria-label="Preparing your workspace">
      <div className="workspace-loader-panel">
        <span className="orbit-loader" aria-hidden="true" />
        <span className="skeleton-line loader-pulse-line" aria-hidden="true" />
        <span className="visually-hidden">Preparing your workspace</span>
      </div>
    </div>
  );
}

export function ButtonLoader({ label = "Working" }) {
  return (
    <span className="button-loader" role="status" aria-label={label}>
      <span className="button-loader-dot" aria-hidden="true" />
      <span className="button-loader-dot" aria-hidden="true" />
      <span className="button-loader-dot" aria-hidden="true" />
      <span className="visually-hidden">{label}</span>
    </span>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="skeleton-screen" role="status" aria-label="Preparing dashboard">
      <div className="skeleton-grid">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className="skeleton-card">
        {[0, 1, 2, 3, 4].map((row) => <SkeletonRow key={row} />)}
      </div>
      <span className="visually-hidden">Preparing dashboard</span>
    </div>
  );
}

export function RecentTransactionsSkeleton() {
  return (
    <div className="skeleton-list" role="status" aria-label="Preparing recent transactions">
      {[0, 1, 2, 3, 4].map((row) => <SkeletonRow compact key={row} />)}
      <span className="visually-hidden">Preparing recent transactions</span>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="skeleton-card skeleton-table" role="status" aria-label="Preparing transactions">
      <div className="skeleton-table-head" aria-hidden="true">
        <SkeletonLine width="w-25" />
        <SkeletonLine width="w-35" />
        <SkeletonLine width="w-25" />
        <SkeletonLine width="w-35" />
        <SkeletonLine width="w-45" />
        <SkeletonLine width="w-25" />
      </div>
      {[0, 1, 2, 3, 4, 5].map((row) => (
        <div className="skeleton-table-row" key={row} aria-hidden="true">
          <SkeletonLine width="w-75" />
          <SkeletonLine width="w-60" />
          <SkeletonLine width="w-45" />
          <SkeletonLine width="w-75" />
          <SkeletonLine width="w-90" />
          <SkeletonLine width="w-60" />
        </div>
      ))}
      <span className="visually-hidden">Preparing transactions</span>
    </div>
  );
}

export function AnalyticsSkeleton() {
  const bars = [62, 78, 46, 88, 56, 72, 94, 64];

  return (
    <div className="skeleton-screen" role="status" aria-label="Preparing analytics">
      <div className="row g-3">
        <div className="col-xl-5">
          <SkeletonCard tall />
        </div>
        <div className="col-xl-7">
          <div className="skeleton-card is-tall">
            <SkeletonLine width="w-35" />
            <div className="skeleton-chart">
              {bars.map((height) => (
                <span key={height} className="skeleton-block" style={{ height: `${height}%` }} aria-hidden="true" />
              ))}
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="skeleton-card">
            {[0, 1, 2, 3].map((row) => <SkeletonRow key={row} />)}
          </div>
        </div>
      </div>
      <span className="visually-hidden">Preparing analytics</span>
    </div>
  );
}
