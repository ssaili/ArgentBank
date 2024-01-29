import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "authentication/login",
  async (userCredentials) => {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });
    const responseData = await response.json();
    return responseData;
  }
);

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default authenticationSlice;
