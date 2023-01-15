import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/reusable/Loading";

import {
  useGetPostedJobsQuery,
  useStatusUpdateMutation,
} from "../../redux/job/jobApi";
import {
  setSelectedJob,
  updateApplicantStatus,
} from "../../redux/job/jobSlice";

const Candidates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    auth: {
      user: { email },
    },
    job: { postedJobs, selectedJob },
  } = useSelector((state) => state);
  const { isLoading, isError, error } = useGetPostedJobsQuery(email, {
    skip: email ? false : true,
  });
  const [updateStatus, res] = useStatusUpdateMutation();

  useEffect(() => {
    if (isError) {
      toast.error(error, { id: "error" });
    }
  });

  const handleStatusUpdate = (data) => {
    updateStatus(data);
    dispatch(updateApplicantStatus(data));
  };

  const handleMessage = () => {
    navigate("/dashboard/direct-message");
  };

  if (isLoading || res.isLoading) {
    return <Loading />;
  }
  return (
    <div className="px-4">
      <div className="grid grid-cols-3 gap-4 py-10">
        {postedJobs?.map((job) => (
          <button
            key={job._id}
            className={`px-4 py-3 border-4 rounded-lg shadow hover:shadow-lg ${
              selectedJob._id === job._id && "border-primary"
            }`}
            onClick={() =>
              dispatch(
                setSelectedJob({
                  _id: job._id,
                  position: job.position,
                  candidates: job.applicants,
                })
              )
            }
          >
            <h3 className="text-xl font-medium">{job.position}</h3>
            <p>Type: {job.employmentType}</p>
            <p>
              Applicants:{" "}
              <span className="text-bold">{job?.applicants?.length || 0}</span>
            </p>
          </button>
        ))}
      </div>
      <h1 className="text-lg text-gray-500/70 font-medium pb-6">
        {selectedJob.position
          ? `Applied Candidates for: ${selectedJob.position}`
          : "Please select a Job ⤴️"}
      </h1>
      {selectedJob.candidates && (
        <div className="mt-6 rounded-lg bg-gray-50 shadow-lg overflow-auto scrollbar">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>City/Country</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {selectedJob.candidates.map((user) => (
                <tr key={user.email}>
                  <td className="py-3">{user.name}</td>
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">{user.address}</td>
                  <td
                    className={`py-3 capitalize ${
                      user.status === "shortlisted" && "text-green-500"
                    } ${user.status === "rejected" && "text-red-500"}`}
                  >
                    {user.status}
                  </td>
                  <td className={`py-3 flex items-center justify-center gap-1`}>
                    <button
                      title="Shortlist This candidate"
                      className={`px-2 py-1 rounded text-white text-xs bg-green-600 active:scale-90 duration-200 disabled:cursor-not-allowed disabled:bg-gray-300`}
                      disabled={user.status === "shortlisted"}
                      onClick={() =>
                        handleStatusUpdate({
                          jobId: selectedJob._id,
                          email: user.email,
                          status: "shortlisted",
                        })
                      }
                    >
                      Shortlist
                    </button>
                    <button
                      title="Send Direct message to this candidate"
                      className={`px-2 py-1 rounded text-white text-xs bg-blue-600 active:scale-90 duration-200`}
                      onClick={handleMessage}
                    >
                      Message
                    </button>
                    <button
                      title="Reject this candidate for this position"
                      className={`px-2 py-1 rounded text-white text-xs bg-red-600 active:scale-90 duration-200 disabled:cursor-not-allowed disabled:bg-gray-300`}
                      disabled={user.status === "rejected"}
                      onClick={() =>
                        handleStatusUpdate({
                          jobId: selectedJob._id,
                          email: user.email,
                          status: "rejected",
                        })
                      }
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Candidates;
