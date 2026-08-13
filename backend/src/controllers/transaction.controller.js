import * as txnService from "../services/transaction.service.js";

export async function create(req, res, next) {
  try {
    const txn = await txnService.createTransaction(req.userId, req.body);
    res.status(201).json({ transaction: txn });
  } catch (err) { next(err); }
}

export async function list(req, res, next) {
  try {
    const txns = await txnService.getTransactions(req.userId, req.query);
    res.json({ transactions: txns });
  } catch (err) { next(err); }
}

export async function getOne(req, res, next) {
  try {
    const txn = await txnService.getTransactionById(req.userId, req.params.id);
    res.json({ transaction: txn });
  } catch (err) { next(err); }
}

export async function update(req, res, next) {
  try {
    const txn = await txnService.updateTransaction(req.userId, req.params.id, req.body);
    res.json({ transaction: txn });
  } catch (err) { next(err); }
}

export async function remove(req, res, next) {
  try {
    await txnService.deleteTransaction(req.userId, req.params.id);
    res.json({ message: "Transaction deleted" });
  } catch (err) { next(err); }
}