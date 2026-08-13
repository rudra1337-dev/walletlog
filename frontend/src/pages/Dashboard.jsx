import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTransactions } from "../features/transactionSlice";
import { getSummary } from "../services/analyticsApi";
import SummaryCard from "../components/SummaryCard";
import { RecentTransactionsSkeleton } from "../components/loaders/SkeletonLoaders";
import "../style/src/pages/dashboard.css";
import "../style/src/components/tables.css";

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.transactions);
  const [summary, setSummary] = useState({ balance: 0, totalIncome: 0, totalExpense: 0 });

  useEffect(() => {
    dispatch(fetchTransactions({}));
    getSummary()
      .then(setSummary)
      .catch(() => setSummary({ balance: 0, totalIncome: 0, totalExpense: 0 }));
  }, [dispatch]);

  const recent = items.slice(0, 5);
  const expenseCount = items.filter((t) => t.type === "expense").length;
  const incomeCount = items.filter((t) => t.type === "income").length;

  return (
    <div className="container app-shell dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="page-kicker">Overview</p>
          <h1 className="page-title">Your money, clearly organized.</h1>
          <p className="page-subtitle">
            Track cash flow, recent activity, and spending habits from one calm workspace.
          </p>
        </div>
        <Link to="/transactions" className="btn btn-primary">Add Transaction</Link>
      </div>

      <div className="summary-card-grid">
        <SummaryCard label="Current Balance" value={summary.balance} variant="primary" />
        <SummaryCard label="Total Income" value={summary.totalIncome} variant="success" />
        <SummaryCard label="Total Expenses" value={summary.totalExpense} variant="danger" />
      </div>

      <div className="dashboard-content-grid">
        <div className="surface-card dashboard-recent-card">
          <div className="card-body">
            <div className="dashboard-card-header">
              <div>
                <h2 className="h5 mb-1">Recent Transactions</h2>
                <p className="text-muted small mb-0">Your latest income and expense entries.</p>
              </div>
              <Link to="/transactions" className="btn btn-sm btn-outline-primary">View all</Link>
            </div>
            <div className="dashboard-recent-list">
              {status === "loading" && <RecentTransactionsSkeleton />}
              {status !== "loading" && recent.length === 0 && (
                <div className="empty-state">
                  <h3 className="h6 text-body mb-2">No transactions yet</h3>
                  <p className="mb-0">Add your first entry to start building a useful picture of your finances.</p>
                </div>
              )}
              {status !== "loading" && recent.map((t) => (
                <div key={t.id} className="transaction-row">
                  <div>
                    <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                      <span className="badge badge-soft">{t.category?.name || "Uncategorized"}</span>
                      <span className={`status-pill ${t.type}`}>{t.type}</span>
                    </div>
                    <span className="text-muted small">{formatDate(t.date)}</span>
                    {t.notes && <p className="mb-0 mt-1 small">{t.notes}</p>}
                  </div>
                  <span className={t.type === "income" ? "amount-income" : "amount-expense"}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="surface-card activity-mix-card">
          <div className="card-body">
            <h2 className="h5 mb-3">Activity Mix</h2>
            <div className="activity-mix-row">
              <span className="text-muted">Income entries</span>
              <strong>{incomeCount}</strong>
            </div>
            <div className="activity-mix-row">
              <span className="text-muted">Expense entries</span>
              <strong>{expenseCount}</strong>
            </div>
            <div className="activity-mix-row">
              <span className="text-muted">Tracked entries</span>
              <strong>{items.length}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
