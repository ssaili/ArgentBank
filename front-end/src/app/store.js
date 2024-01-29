import { configureStore } from "@reduxjs/toolkit";
import authenticationSlice from "../features/authentication/authenticationSlice";

const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
  },
});

export default store;
