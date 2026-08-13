import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTransactions } from "../features/transactionSlice";
import { getSummary } from "../services/analyticsApi";
import SummaryCard from "../components/SummaryCard";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.transactions);
  const [summary, setSummary] = useState({ balance: 0, totalIncome: 0, totalExpense: 0 });

  useEffect(() => {
    dispatch(fetchTransactions({}));
    getSummary().then(setSummary);
  }, [dispatch]);

  const recent = items.slice(0, 5);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Dashboard</h4>
        <Link to="/transactions" className="btn btn-primary">+ Add Transaction</Link>
      </div>

      <div className="row">
        <SummaryCard label="Current Balance" value={summary.balance} variant="primary" />
        <SummaryCard label="Total Income" value={summary.totalIncome} variant="success" />
        <SummaryCard label="Total Expenses" value={summary.totalExpense} variant="danger" />
      </div>

      <div className="card mt-2 shadow-sm border-0">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0">Recent Transactions</h6>
            <Link to="/transactions" className="small">View all</Link>
          </div>
          {recent.length === 0 && <p className="text-muted mb-0">No transactions yet.</p>}
          {recent.map((t) => (
            <div key={t.id} className="d-flex justify-content-between border-bottom py-2">
              <div>
                <span className="badge bg-secondary me-2">{t.category?.name}</span>
                <span className="text-muted small">{new Date(t.date).toLocaleDateString()}</span>
              </div>
              <span className={t.type === "income" ? "text-success" : "text-danger"}>
                {t.type === "income" ? "+" : "-"}₹{Number(t.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}