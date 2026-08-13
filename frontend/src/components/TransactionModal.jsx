import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTransaction, editTransaction } from "../features/transactionSlice";
import { getCategories } from "../services/categoryApi";

export default function TransactionModal({ show, onClose, editingTxn }) {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    type: "expense", amount: "", categoryId: "", date: "", notes: "", tags: "",
  });

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (editingTxn) {
      setForm({
        type: editingTxn.type,
        amount: editingTxn.amount,
        categoryId: editingTxn.categoryId,
        date: editingTxn.date.slice(0, 10),
        notes: editingTxn.notes || "",
        tags: (editingTxn.tags || []).join(", "),
      });
    } else {
      setForm({ type: "expense", amount: "", categoryId: "", date: "", notes: "", tags: "" });
    }
  }, [editingTxn, show]);

  const filteredCategories = categories.filter((c) => c.type === form.type);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      type: form.type,
      amount: Number(form.amount),
      categoryId: Number(form.categoryId),
      date: form.date,
      notes: form.notes,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };

    if (editingTxn) {
      await dispatch(editTransaction({ id: editingTxn.id, data: payload }));
    } else {
      await dispatch(addTransaction(payload));
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">{editingTxn ? "Edit Transaction" : "Add Transaction"}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit} className="modal-body">
            <div className="btn-group w-100 mb-3">
              <button type="button"
                className={`btn ${form.type === "expense" ? "btn-danger" : "btn-outline-danger"}`}
                onClick={() => setForm({ ...form, type: "expense", categoryId: "" })}>
                Expense
              </button>
              <button type="button"
                className={`btn ${form.type === "income" ? "btn-success" : "btn-outline-success"}`}
                onClick={() => setForm({ ...form, type: "income", categoryId: "" })}>
                Income
              </button>
            </div>

            <input className="form-control mb-2" type="number" step="0.01" placeholder="Amount" required
              value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />

            <select className="form-select mb-2" required
              value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
              <option value="">Select Category</option>
              {filteredCategories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <input className="form-control mb-2" type="date" required
              value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />

            <textarea className="form-control mb-2" placeholder="Notes"
              value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />

            <input className="form-control mb-3" placeholder="Tags (comma separated)"
              value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />

            <div className="d-flex gap-2">
              <button type="button" className="btn btn-secondary w-50" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary w-50">
                {editingTxn ? "Save Changes" : "Save Transaction"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}