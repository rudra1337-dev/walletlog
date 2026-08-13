import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#2563eb", "#dc2626", "#15803d", "#b45309", "#7c3aed", "#0891b2", "#be123c"];

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });

export default function CategoryPieChart({ data }) {
  if (!data.length) return <div className="empty-state">No expense data yet.</div>;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="total" nameKey="category" outerRadius="72%" innerRadius="42%" paddingAngle={2}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ background: "var(--wl-surface)", border: "1px solid var(--wl-border)", borderRadius: 8, color: "var(--wl-text)" }} />
        <Legend wrapperStyle={{ color: "var(--wl-muted)", fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
