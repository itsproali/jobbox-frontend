import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  appliedJobs: [],
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

export const { setJobs, setAppliedJobs, setFilter } = jobSlice.actions;
export default jobSlice.reducer;
