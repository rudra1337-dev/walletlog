import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getSummary(userId) {
  const [income, expense] = await Promise.all([
    prisma.transaction.aggregate({
      where: { userId, type: "income" },
      _sum: { amount: true },
    }),
    prisma.transaction.aggregate({
      where: { userId, type: "expense" },
      _sum: { amount: true },
    }),
  ]);

  const totalIncome = Number(income._sum.amount || 0);
  const totalExpense = Number(expense._sum.amount || 0);

  return {
    balance: totalIncome - totalExpense,
    totalIncome,
    totalExpense,
  };
}

export async function getByCategory(userId) {
  const results = await prisma.transaction.groupBy({
    by: ["categoryId"],
    where: { userId, type: "expense" },
    _sum: { amount: true },
  });

  const categories = await prisma.category.findMany({
    where: { id: { in: results.map((r) => r.categoryId) } },
  });

  return results.map((r) => ({
    category: categories.find((c) => c.id === r.categoryId)?.name || "Unknown",
    total: Number(r._sum.amount),
  }));
}

export async function getMonthly(userId) {
  const results = await prisma.$queryRaw`
    SELECT DATE_TRUNC('month', date) AS month, SUM(amount) AS total
    FROM "Transaction"
    WHERE "userId" = ${userId} AND type = 'expense'
    GROUP BY month
    ORDER BY month ASC
  `;
  return results.map((r) => ({ month: r.month, total: Number(r.total) }));
}

export async function getTrend(userId) {
  const results = await prisma.$queryRaw`
    SELECT date, SUM(amount) AS total
    FROM "Transaction"
    WHERE "userId" = ${userId} AND type = 'expense'
    GROUP BY date
    ORDER BY date ASC
  `;
  return results.map((r) => ({ date: r.date, total: Number(r.total) }));
}