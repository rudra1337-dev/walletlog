import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, removeTransaction } from "../features/transactionSlice";
import TransactionModal from "../components/TransactionModal";
import { getCategories } from "../services/categoryApi";
import { TableSkeleton } from "../components/loaders/SkeletonLoaders";
import "../style/src/pages/transactions.css";
import "../style/src/components/tables.css";

const PAGE_SIZE = 10;

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function Transactions() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.transactions);
  const [showModal, setShowModal] = useState(false);
  const [editingTxn, setEditingTxn] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ type: "", category: "", from: "", to: "" });
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTransactions(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const openAdd = () => { setEditingTxn(null); setShowModal(true); };
  const openEdit = (txn) => { setEditingTxn(txn); setShowModal(true); };

  const handleDelete = (id) => {
    if (confirm("Delete this transaction?")) dispatch(removeTransaction(id));
  };

  const updateFilters = (nextFilters) => {
    setPage(1);
    setFilters(nextFilters);
  };

  const resetFilters = () => updateFilters({ type: "", category: "", from: "", to: "" });

  const visibleCategories = filters.type
    ? categories.filter((category) => category.type === filters.type)
    : categories;

  const hasFilters = Object.values(filters).some(Boolean);
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageEnd = pageStart + PAGE_SIZE;
  const paginatedItems = items.slice(pageStart, pageEnd);
  const showingFrom = items.length ? pageStart + 1 : 0;
  const showingTo = Math.min(pageEnd, items.length);

  return (
    <div className="container app-shell transactions-page">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
          <p className="page-kicker">Ledger</p>
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">Filter, review, edit, and keep your records tidy.</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>Add Transaction</button>
      </div>

      <div className="surface-card transaction-filter-card mb-3">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label" htmlFor="type-filter">Type</label>
              <select id="type-filter" className="form-select" value={filters.type}
                onChange={(e) => updateFilters({ ...filters, type: e.target.value, category: "" })}>
                <option value="">All types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label" htmlFor="category-filter">Category</label>
              <select id="category-filter" className="form-select" value={filters.category}
                onChange={(e) => updateFilters({ ...filters, category: e.target.value })}>
                <option value="">All categories</option>
                {visibleCategories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label" htmlFor="from-filter">From</label>
              <input id="from-filter" className="form-control" type="date" value={filters.from}
                onChange={(e) => updateFilters({ ...filters, from: e.target.value })} />
            </div>
            <div className="col-md-2">
              <label className="form-label" htmlFor="to-filter">To</label>
              <input id="to-filter" className="form-control" type="date" value={filters.to}
                onChange={(e) => updateFilters({ ...filters, to: e.target.value })} />
            </div>
            <div className="col-md-2">
              <button type="button" className="btn btn-outline-secondary w-100" onClick={resetFilters} disabled={!hasFilters}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {status === "loading" && <TableSkeleton />}
      {status === "succeeded" && items.length === 0 && (
        <div className="surface-card empty-state">
          <h2 className="h5 text-body">No transactions found</h2>
          <p className="mb-3">{hasFilters ? "Try adjusting your filters." : "Add your first transaction to begin tracking."}</p>
          {!hasFilters && <button className="btn btn-primary" onClick={openAdd}>Add Transaction</button>}
        </div>
      )}

      {status === "succeeded" && items.length > 0 && (
        <div className="surface-card transaction-data-card">
          <div className="transaction-table-scroll">
            <table className="table table-hover align-middle mb-0">
              <caption className="visually-hidden">WalletLog transactions</caption>
              <thead>
                <tr>
                  <th>Date</th><th>Category</th><th>Type</th><th>Amount</th><th>Notes</th><th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((t) => (
                  <tr key={t.id}>
                    <td>{formatDate(t.date)}</td>
                    <td><span className="badge badge-soft">{t.category?.name || "Uncategorized"}</span></td>
                    <td><span className={`status-pill ${t.type}`}>{t.type}</span></td>
                    <td className={t.type === "income" ? "amount-income" : "amount-expense"}>
                      {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                    </td>
                    <td className="text-muted">{t.notes || "No notes"}</td>
                    <td>
                      <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => openEdit(t)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(t.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="transaction-pagination" aria-label="Transaction pagination">
            <p className="pagination-summary">
              Showing {showingFrom}-{showingTo} of {items.length}
            </p>
            <div className="pagination-actions">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="pagination-page">Page {currentPage} of {totalPages}</span>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <TransactionModal show={showModal} onClose={() => setShowModal(false)} editingTxn={editingTxn} />
      )}
    </div>
  );
}
