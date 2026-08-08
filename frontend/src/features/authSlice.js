import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../services/authApi";

export const signupUser = createAsyncThunk("auth/signup", async (data) => {
  const res = await authApi.signup(data);
  return res.user;
});

export const loginUser = createAsyncThunk("auth/login", async (data) => {
  const res = await authApi.login(data);
  return res.user;
});

export const fetchMe = createAsyncThunk("auth/fetchMe", async () => {
  const res = await authApi.getMe();
  return res.user;
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await authApi.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => { state.user = action.payload; })
      .addCase(loginUser.fulfilled, (state, action) => { state.user = action.payload; })
      .addCase(fetchMe.fulfilled, (state, action) => { state.user = action.payload; state.status = "succeeded"; })
      .addCase(fetchMe.rejected, (state) => { state.user = null; state.status = "failed"; })
      .addCase(logoutUser.fulfilled, (state) => { state.user = null; })
      .addMatcher(
        (action) => action.type.endsWith("/rejected") && action.type.startsWith("auth/"),
        (state, action) => { state.error = action.error.message; }
      );
  },
});

export default authSlice.reducer;