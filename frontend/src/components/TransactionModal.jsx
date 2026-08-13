import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTransaction, editTransaction } from "../features/transactionSlice";
import { getCategories } from "../services/categoryApi";
import "../style/src/components/forms.css";
import "../style/src/components/surfaces.css";

function getInitialForm(editingTxn) {
  if (!editingTxn) {
    return { type: "expense", amount: "", categoryId: "", date: "", notes: "", tags: "" };
  }

  return {
    type: editingTxn.type,
    amount: editingTxn.amount,
    categoryId: editingTxn.categoryId,
    date: editingTxn.date.slice(0, 10),
    notes: editingTxn.notes || "",
    tags: (editingTxn.tags || []).join(", "),
  };
}

export default function TransactionModal({ show, onClose, editingTxn }) {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(() => getInitialForm(editingTxn));
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const filteredCategories = categories.filter((c) => c.type === form.type);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (Number(form.amount) <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }

    const payload = {
      type: form.type,
      amount: Number(form.amount),
      categoryId: Number(form.categoryId),
      date: form.date,
      notes: form.notes,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingTxn) {
        await dispatch(editTransaction({ id: editingTxn.id, data: payload })).unwrap();
      } else {
        await dispatch(addTransaction(payload)).unwrap();
      }
      onClose();
    } catch {
      setError("Could not save this transaction. Please check the details and try again.");
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block transaction-modal-backdrop" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="transaction-modal-title">
      <div className="modal-dialog modal-dialog-centered transaction-modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="transaction-modal-title">{editingTxn ? "Edit Transaction" : "Add Transaction"}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body transaction-modal-body">
              {error && <div className="alert alert-danger py-2">{error}</div>}

              <div className="btn-group w-100 mb-3" role="group" aria-label="Transaction type">
                <button type="button"
                  className={`btn ${form.type === "expense" ? "btn-danger" : "btn-outline-danger"}`}
                  aria-pressed={form.type === "expense"}
                  onClick={() => setForm({ ...form, type: "expense", categoryId: "" })}>
                  Expense
                </button>
                <button type="button"
                  className={`btn ${form.type === "income" ? "btn-success" : "btn-outline-success"}`}
                  aria-pressed={form.type === "income"}
                  onClick={() => setForm({ ...form, type: "income", categoryId: "" })}>
                  Income
                </button>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="transaction-amount">Amount</label>
                <input id="transaction-amount" className="form-control" type="number" min="0.01" step="0.01" placeholder="0.00" required
                  value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="transaction-category">Category</label>
                <select id="transaction-category" className="form-select" required
                  value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                  <option value="">Select category</option>
                  {filteredCategories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="transaction-date">Date</label>
                <input id="transaction-date" className="form-control" type="date" required
                  value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="transaction-notes">Notes</label>
                <textarea id="transaction-notes" className="form-control" rows="3" placeholder="Optional context"
                  value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="transaction-tags">Tags</label>
                <input id="transaction-tags" className="form-control" placeholder="rent, recurring"
                  value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
                <div className="form-text">Separate tags with commas.</div>
              </div>
            </div>

            <div className="transaction-modal-actions">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">
                {editingTxn ? "Save Changes" : "Save Transaction"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
