import { useEffect, useState } from "react";
import * as analyticsApi from "../services/analyticsApi";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";
import TrendLineChart from "../components/charts/TrendLineChart";
import { AnalyticsSkeleton } from "../components/loaders/SkeletonLoaders";
import "../style/src/pages/analytics.css";

export default function Analytics() {
  const [byCategory, setByCategory] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [trend, setTrend] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      analyticsApi.getByCategory(),
      analyticsApi.getMonthly(),
      analyticsApi.getTrend(),
    ])
      .then(([categoryData, monthlyData, trendData]) => {
        setByCategory(categoryData);
        setMonthly(monthlyData);
        setTrend(trendData);
        setStatus("succeeded");
      })
      .catch(() => {
        setError("Could not load analytics. Please try again.");
        setStatus("failed");
      });
  }, []);

  return (
    <div className="container app-shell analytics-page">
      <div className="analytics-header">
        <p className="page-kicker">Insights</p>
        <h1 className="page-title">Analytics</h1>
        <p className="page-subtitle">Understand where your expenses go and how they move over time.</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {status === "loading" && <AnalyticsSkeleton />}

      {status !== "loading" && <div className="analytics-grid">
        <div className="surface-card analytics-card">
          <div className="card-body">
            <h2>Expenses by Category</h2>
            <p className="text-muted">Which categories carry the most spend.</p>
            <div className="chart-frame chart-frame-pie">
              <CategoryPieChart data={byCategory} />
            </div>
          </div>
        </div>

        <div className="surface-card analytics-card">
          <div className="card-body">
            <h2>Monthly Expenses</h2>
            <p className="text-muted">Expense totals grouped by month.</p>
            <div className="chart-frame">
              <MonthlyBarChart data={monthly} />
            </div>
          </div>
        </div>

        <div className="surface-card analytics-card analytics-card-wide">
          <div className="card-body">
            <h2>Expense Trend</h2>
            <p className="text-muted">Daily expense movement across your tracked dates.</p>
            <div className="chart-frame">
              <TrendLineChart data={trend} />
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}
