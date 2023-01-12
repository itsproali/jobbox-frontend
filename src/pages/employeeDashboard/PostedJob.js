import React from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetPostedJobsQuery } from "../../redux/job/jobApi";

const PostedJob = () => {
  const {
    user: { _id },
  } = useSelector((state) => state.auth);
  const { data, isLoading, isError, error } = useGetPostedJobsQuery(_id);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    toast.error(error, { id: "error" });
  }

  return (
    <div className="">
      <h1 className="text-3xl font-semibold text-center my-10">
        Your <span className="text-primary">Posted</span> Jobs
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        {data?.data?.map((job) => (
          <JobCard jobData={job} key={job._id} />
        ))}
      </div>
    </div>
  );
};

export default PostedJob;
