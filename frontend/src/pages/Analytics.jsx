import { useEffect, useState } from "react";
import * as analyticsApi from "../services/analyticsApi";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";
import TrendLineChart from "../components/charts/TrendLineChart";

export default function Analytics() {
  const [byCategory, setByCategory] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [trend, setTrend] = useState([]);

  useEffect(() => {
    analyticsApi.getByCategory().then(setByCategory);
    analyticsApi.getMonthly().then(setMonthly);
    analyticsApi.getTrend().then(setTrend);
  }, []);

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Analytics</h4>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h6>Expenses by Category</h6>
          <CategoryPieChart data={byCategory} />
        </div>
      </div>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h6>Monthly Expenses</h6>
          <MonthlyBarChart data={monthly} />
        </div>
      </div>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h6>Expense Trend</h6>
          <TrendLineChart data={trend} />
        </div>
      </div>
    </div>
  );
}