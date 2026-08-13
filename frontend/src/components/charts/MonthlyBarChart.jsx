import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function MonthlyBarChart({ data }) {
  if (!data.length) return <p className="text-muted">No expense data yet.</p>;
  const formatted = data.map((d) => ({
    month: new Date(d.month).toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
    total: d.total,
  }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={formatted}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(v) => `₹${v.toFixed(2)}`} />
        <Bar dataKey="total" fill="#0d6efd" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}