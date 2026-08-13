import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, removeTransaction } from "../features/transactionSlice";
import TransactionModal from "../components/TransactionModal";

export default function Transactions() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.transactions);
  const [showModal, setShowModal] = useState(false);
  const [editingTxn, setEditingTxn] = useState(null);
  const [filters, setFilters] = useState({ type: "", category: "" });

  useEffect(() => {
    dispatch(fetchTransactions(filters));
  }, [dispatch, filters]);

  const openAdd = () => { setEditingTxn(null); setShowModal(true); };
  const openEdit = (txn) => { setEditingTxn(txn); setShowModal(true); };

  const handleDelete = (id) => {
    if (confirm("Delete this transaction?")) dispatch(removeTransaction(id));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Transactions</h4>
        <button className="btn btn-primary" onClick={openAdd}>+ Add Transaction</button>
      </div>

      <div className="d-flex gap-2 mb-3">
        <select className="form-select w-auto" value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {status === "loading" && <p>Loading...</p>}
      {status === "succeeded" && items.length === 0 && <p className="text-muted">No transactions yet.</p>}

      {items.length > 0 && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Date</th><th>Category</th><th>Type</th><th>Amount</th><th>Notes</th><th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.id}>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td><span className="badge bg-secondary">{t.category?.name}</span></td>
                <td>
                  <span className={`badge ${t.type === "income" ? "bg-success" : "bg-danger"}`}>
                    {t.type}
                  </span>
                </td>
                <td className={t.type === "income" ? "text-success" : "text-danger"}>
                  {t.type === "income" ? "+" : "-"}₹{Number(t.amount).toFixed(2)}
                </td>
                <td>{t.notes}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openEdit(t)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(t.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <TransactionModal show={showModal} onClose={() => setShowModal(false)} editingTxn={editingTxn} />
    </div>
  );
}