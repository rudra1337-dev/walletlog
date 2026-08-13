import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as txnApi from "../services/transactionApi";

export const fetchTransactions = createAsyncThunk("transactions/fetch", async (filters) => {
  return txnApi.getTransactions(filters);
});

export const addTransaction = createAsyncThunk("transactions/add", async (data) => {
  return txnApi.createTransaction(data);
});

export const editTransaction = createAsyncThunk("transactions/edit", async ({ id, data }) => {
  return txnApi.updateTransaction(id, data);
});

export const removeTransaction = createAsyncThunk("transactions/remove", async (id) => {
  await txnApi.deleteTransaction(id);
  return id;
});

const transactionSlice = createSlice({
  name: "transactions",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => { state.status = "loading"; })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export default transactionSlice.reducer;