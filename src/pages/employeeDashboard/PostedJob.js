import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Loading from "../../components/reusable/Loading";
import {
  useCloseJobMutation,
  useGetPostedJobsQuery,
} from "../../redux/job/jobApi";
import { IoMdClose } from "react-icons/io";

const PostedJob = () => {
  const {
    auth: {
      user: { email },
    },
    job: { postedJobs },
  } = useSelector((state) => state);
  const { isLoading, isError, error } = useGetPostedJobsQuery(email, {
    skip: email ? false : true,
  });
  const [closeJob] = useCloseJobMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error, { id: "error" });
    }
  });

  const handleClose = (id) => {
    const isConfirm = window.confirm(
      "Are you sure you you want to Close the job.?"
    );
    if (!isConfirm) return;
    closeJob(id);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="">
      <h1 className="pl-4 text-lg text-gray-500/70 font-medium py-10">
        Your Posted Jobs: {postedJobs.length || 0}
      </h1>

      <div className="w-[95%] mx-auto mt-6 rounded-lg bg-gray-50 shadow-lg overflow-auto scrollbar">
        <table className="w-full">
          <thead className="bg-secondary/50">
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Applicants</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {postedJobs?.map((item, i) => {
              const { _id, position, salaryRange, applicants, status } =
                item || {};
              return (
                <tr key={_id} className="border-b">
                  <td className="py-3">{i + 1}</td>
                  <td className="py-3">{position}</td>
                  <td className="py-3">{applicants.length || 0}</td>
                  <td className="py-3">{salaryRange}</td>
                  <td
                    className={`py-3 capitalize ${
                      status === "open" ? "text-green-500" : "text-red-600"
                    }`}
                  >
                    {status}
                  </td>
                  <td className="py-3">
                    <button
                      title={
                        status === "closed"
                          ? "This is job is closed"
                          : "Close this job"
                      }
                      className="bg-secondary p-2 rounded-full active:scale-90 duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-white"
                      onClick={() => handleClose(_id)}
                      disabled={status === "closed"}
                    >
                      <IoMdClose size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostedJob;
