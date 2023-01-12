import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER,
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["jobs", "jobDetails"],
});

export default apiSlice;
