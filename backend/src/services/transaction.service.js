import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createTransaction(userId, data) {
  return prisma.transaction.create({
    data: { ...data, userId, date: new Date(data.date) },
    include: { category: true },
  });
}

export async function getTransactions(userId, filters) {
  const where = { userId };
  if (filters.type) where.type = filters.type;
  if (filters.category) where.categoryId = Number(filters.category);
  if (filters.from || filters.to) {
    where.date = {};
    if (filters.from) where.date.gte = new Date(filters.from);
    if (filters.to) where.date.lte = new Date(filters.to);
  }

  return prisma.transaction.findMany({
    where,
    include: { category: true },
    orderBy: { date: "desc" },
  });
}

export async function getTransactionById(userId, id) {
  const txn = await prisma.transaction.findFirst({
    where: { id: Number(id), userId },
    include: { category: true },
  });
  if (!txn) {
    const err = new Error("Transaction not found");
    err.status = 404;
    throw err;
  }
  return txn;
}

export async function updateTransaction(userId, id, data) {
  // ownership check first
  await getTransactionById(userId, id);
  return prisma.transaction.update({
    where: { id: Number(id) },
    data: { ...data, ...(data.date && { date: new Date(data.date) }) },
    include: { category: true },
  });
}

export async function deleteTransaction(userId, id) {
  await getTransactionById(userId, id);
  return prisma.transaction.delete({ where: { id: Number(id) } });
}