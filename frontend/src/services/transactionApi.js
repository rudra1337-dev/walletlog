import api from "./api";

export const getTransactions = (filters = {}) =>
  api.get("/transactions", { params: filters }).then((res) => res.data.transactions);

export const getTransaction = (id) =>
  api.get(`/transactions/${id}`).then((res) => res.data.transaction);

export const createTransaction = (data) =>
  api.post("/transactions", data).then((res) => res.data.transaction);

export const updateTransaction = (id, data) =>
  api.put(`/transactions/${id}`, data).then((res) => res.data.transaction);

export const deleteTransaction = (id) =>
  api.delete(`/transactions/${id}`).then((res) => res.data);