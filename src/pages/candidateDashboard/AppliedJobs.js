import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetAppliedJobsQuery } from "../../redux/job/jobApi";

const AppliedJobs = () => {
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAppliedJobsQuery(email);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-xl py-6">Applied jobs</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        {data?.data?.map((job) => (
          <JobCard jobData={job} key={job._id} />
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
