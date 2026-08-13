import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function TrendLineChart({ data }) {
  if (!data.length) return <p className="text-muted">No expense data yet.</p>;
  const formatted = data.map((d) => ({
    date: new Date(d.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    total: d.total,
  }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={formatted}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(v) => `₹${v.toFixed(2)}`} />
        <Line type="monotone" dataKey="total" stroke="#dc3545" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}