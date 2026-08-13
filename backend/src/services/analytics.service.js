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