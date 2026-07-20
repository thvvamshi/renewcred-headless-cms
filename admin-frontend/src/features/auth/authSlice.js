import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiRequest } from "../../services/api";

const storedToken = localStorage.getItem("renewcred_token");

export const login = createAsyncThunk("auth/login", async ({ email, password }) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
});

export const fetchMe = createAsyncThunk("auth/me", async (_, { getState }) => {
  const { token } = getState().auth;
  return apiRequest("/auth/me", {}, token);
});

export const logout = createAsyncThunk("auth/logout", async (_, { getState }) => {
  const { token } = getState().auth;
  if (token) {
    await apiRequest("/auth/logout", { method: "POST" }, token);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: storedToken,
    user: null,
    status: "idle",
    error: null
  },
  reducers: {
    clearAuth(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("renewcred_token");
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("renewcred_token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.user = action.payload.user;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.token = null;
        state.user = null;
        localStorage.removeItem("renewcred_token");
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.user = null;
        state.status = "idle";
        localStorage.removeItem("renewcred_token");
      });
  }
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
