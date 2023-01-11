import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postJob: builder.mutation({
      query: (data) => ({
        url: "/job",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),
    getJobs: builder.query({
      query: () => "/jobs",
      providesTags: ["jobs"],
    }),
    getJobDetails: builder.query({
      query: (id) => `/job/${id}`,
    }),
    getPostedJobs: builder.query({
      query: (userId) => `/posted/${userId}`,
    }),
  }),
});

export const {
  usePostJobMutation,
  useGetJobsQuery,
  useGetJobDetailsQuery,
  useGetPostedJobsQuery,
} = jobApi;
