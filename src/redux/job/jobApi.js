import apiSlice from "../api/apiSlice";
import { setApplied } from "../auth/authSlice";
import { setAppliedJobs, setJobs } from "./jobSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Post a New Job
    postJob: builder.mutation({
      query: (data) => ({
        url: "/job",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),
    // Get All Jobs
    getJobs: builder.query({
      query: () => "/jobs",
      providesTags: ["jobs"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(setJobs(data.data));
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
    // Get a Particular Job Details by ID
    getJobDetails: builder.query({
      query: (id) => `/job/${id}`,
      providesTags: ["jobDetails"],
    }),
    // Apply to a Job
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
      invalidatesTags: ["jobs", "jobDetails"],
    }),
    // Get All Posted job by Employer user Id
    getPostedJobs: builder.query({
      query: (userId) => `/posted/${userId}`,
      providesTags: ["jobs"],
    }),
    // Close a posted Job by Job Id
    closeJob: builder.mutation({
      query: (id) => ({
        url: `/close/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["jobs", "jobDetails"],
    }),
    // Get All Applied jobs by a candidate email
    getAppliedJobs: builder.query({
      query: (email) => `/applied-jobs/${email}`,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(setAppliedJobs(data));
          }
        } catch (err) {
          console.log(err);
        }
      },
      providesTags: ["jobDetails"],
    }),
    // Ask a question to a job
    askQuestion: builder.mutation({
      query: (data) => ({
        url: "/query",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["jobDetails"],
    }),
    // Send A reply to a candidate
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
  useCloseJobMutation,
  useApplyJobMutation,
  useGetAppliedJobsQuery,
  useAskQuestionMutation,
  useSendReplyMutation,
} = jobApi;
