import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("profile/getUser", async () => {
  const response = await fetch("http://localhost:3001/api/v1/user/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const responseData = await response.json();
  return responseData;
});

export const editUser = createAsyncThunk(
  "profile/editUser",
  async (userIdentity) => {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userIdentity),
    });
    const responseData = await response.json();
    return responseData;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    getLoading: false,
    editLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.getLoading = true;
      })
      .addCase(getUser.fulfilled, (state) => {
        state.getLoading = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.getLoading = false;
      })
      .addCase(editUser.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(editUser.fulfilled, (state) => {
        state.editLoading = false;
      })
      .addCase(editUser.rejected, (state) => {
        state.editLoading = false;
      });
  },
});

export default profileSlice;
