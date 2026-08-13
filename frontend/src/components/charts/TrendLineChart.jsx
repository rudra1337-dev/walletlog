import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 });

export default function TrendLineChart({ data }) {
  if (!data.length) return <div className="empty-state">No expense data yet.</div>;

  const formatted = data.map((d) => ({
    date: new Date(d.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    total: d.total,
  }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={formatted} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--wl-border)" />
        <XAxis dataKey="date" tick={{ fill: "var(--wl-muted)", fontSize: 11 }} axisLine={{ stroke: "var(--wl-border)" }} tickLine={false} />
        <YAxis tick={{ fill: "var(--wl-muted)", fontSize: 11 }} axisLine={false} tickLine={false} width={42} />
        <Tooltip formatter={(v) => formatCurrency(v)} contentStyle={{ background: "var(--wl-surface)", border: "1px solid var(--wl-border)", borderRadius: 8, color: "var(--wl-text)" }} />
        <Line type="monotone" dataKey="total" stroke="var(--wl-expense)" strokeWidth={2.4} dot={{ r: 2.5, fill: "var(--wl-expense)" }} activeDot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
