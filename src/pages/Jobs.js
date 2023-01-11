import React from "react";
import JobCard from "../components/reusable/JobCard";
import Loading from "../components/reusable/Loading";
import { useGetJobsQuery } from "../redux/job/jobApi";
import { toast } from "react-hot-toast";
import { BiSearchAlt } from "react-icons/bi";

const Jobs = () => {
  const { data, isLoading, isError, error } = useGetJobsQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast.error(error, { id: "error" });
  }

  return (
    <div className="container mx-auto pt-16">
      <div className="flex items-center justify-between bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">Find Jobs</h1>
        <div
          id="search-container"
          className="bg-white rounded-full flex items-center w-80 max-w-xl overflow-hidden shadow-lg"
        >
          <input
            className="flex-auto text-lg px-4 py-2 border-none outline-none focus:ring-0"
            type="text"
            name="search"
            id="search"
            placeholder="Job title or Keyword"
          />
          <button
            type="submit"
            id="search-button"
            className="p-2 rounded-full bg-primary  h-10 w-10 grid place-items-center"
          >
            <BiSearchAlt size="18" color="white" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-5">
        {data?.data?.map((job) => (
          <JobCard jobData={job} key={job._id} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
