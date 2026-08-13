import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });

export default function MonthlyBarChart({ data }) {
  if (!data.length) return <div className="empty-state">No expense data yet.</div>;

  const formatted = data.map((d) => ({
    month: new Date(d.month).toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
    total: d.total,
  }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={formatted} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--wl-border)" />
        <XAxis dataKey="month" tick={{ fill: "var(--wl-muted)", fontSize: 11 }} axisLine={{ stroke: "var(--wl-border)" }} tickLine={false} />
        <YAxis tick={{ fill: "var(--wl-muted)", fontSize: 11 }} axisLine={false} tickLine={false} width={42} />
        <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ background: "var(--wl-surface)", border: "1px solid var(--wl-border)", borderRadius: 8, color: "var(--wl-text)" }} />
        <Bar dataKey="total" fill="var(--wl-primary)" radius={[5, 5, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
