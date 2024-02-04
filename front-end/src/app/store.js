import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "../features/authentication/authenticationSlice";
import profileSlice from "../features/profile/profileSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    profile: profileSlice.reducer,
  },
});

export default store;
