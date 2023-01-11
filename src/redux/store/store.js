import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../api/apiSlice";
import authSlice from "../auth/authSlice";
import jobSlice from "../job/jobSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    job: jobSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
