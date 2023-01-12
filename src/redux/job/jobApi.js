import apiSlice from "../api/apiSlice";
import { setApplied } from "../auth/authSlice";

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
      providesTags: ["jobDetails"],
    }),
    applyJob: builder.mutation({
      query: (data) => ({
        url: "/apply",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ jobId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setApplied(jobId));
        } catch (err) {
          console.log(err);
        }
      },
      invalidatesTags: ["jobDetails"],
    }),
    getPostedJobs: builder.query({
      query: (userId) => `/posted/${userId}`,
      providesTags: ["jobs"],
    }),
    getAppliedJobs: builder.query({
      query: (email) => `/applied-jobs/${email}`,
      providesTags: ["jobDetails"],
    }),
    askQuestion: builder.mutation({
      query: (data) => ({
        url: "/query",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["jobDetails"],
    }),
    sendReply: builder.mutation({
      query: (data) => ({
        url: "/reply",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["jobDetails"],
    }),
  }),
});

export const {
  usePostJobMutation,
  useGetJobsQuery,
  useGetJobDetailsQuery,
  useGetPostedJobsQuery,
  useApplyJobMutation,
  useGetAppliedJobsQuery,
  useAskQuestionMutation,
  useSendReplyMutation
} = jobApi;
