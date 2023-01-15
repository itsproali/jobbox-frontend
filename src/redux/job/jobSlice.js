import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  appliedJobs: [],
  postedJobs: [],
  selectedJob: {},
  filter: { status: false },
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
    },
    setPostedJobs: (state, action) => {
      state.postedJobs = action.payload;
    },

    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },

    updateApplicantStatus: (state, action) => {
      const index = state.selectedJob.candidates.findIndex(
        (user) => user.email === action.payload.email
      );
      state.selectedJob.candidates[index].status = action.payload.status;
    },

    setFilter: (state, action) => {
      switch (action.payload) {
        case "status":
          state.jobs.filter((job) => job.status === "open");
          break;
        default:
          return state;
      }
    },
  },
});

export const {
  setJobs,
  setAppliedJobs,
  setPostedJobs,
  setSelectedJob,
  updateApplicantStatus,
  setFilter,
} = jobSlice.actions;
export default jobSlice.reducer;
