import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { BsArrowReturnRight, BsArrowRightShort } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import meeting from "../assets/meeting-min.jpg";
import Loading from "../components/reusable/Loading";
import {
  useApplyJobMutation,
  useAskQuestionMutation,
  useCloseJobMutation,
  useGetJobDetailsQuery,
  useSendReplyMutation,
} from "../redux/job/jobApi";
import { useCreateMessageMutation } from "../redux/message/messageApi";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isError, error } = useGetJobDetailsQuery(id);
  const [apply, res] = useApplyJobMutation();
  const [askQuestion] = useAskQuestionMutation();
  const [sendReply] = useSendReplyMutation();
  const [createMessage] = useCreateMessageMutation();
  const [closeJob] = useCloseJobMutation()
  const {
    companyName,
    position,
    location,
    experience,
    workLevel,
    employmentType,
    salaryRange,
    skills,
    requirements,
    responsibilities,
    overview,
    queries,
    applicants,
    _id,
    postBy,
    status,
  } = data?.data || {};

  const isApplied = user.appliedJob ? user.appliedJob.includes(_id) : false;

  useEffect(() => {
    if (isError || res.isError) {
      toast.error(error || res.error);
    }
  }, [isError, error, res]);

  if (res.isSuccess) {
    toast.success("Applied Successfully", { id: "success" });
    navigate("/jobs");
  }

  const handleApply = () => {
    if (user.role !== "candidate") {
      toast.error("Please log in as candidate to apply..!");
      navigate("/register");
      return;
    }

    const data = { userId: user._id, email: user.email, jobId: _id };
    apply(data);
    const members = [
      { email: user.email, name: user.firstName + " " + user.lastName },
      { email: postBy.email, name: postBy.name },
    ];
    createMessage(members);
  };

  // Handle Close this Job
  const handleClose = () => {
    const isConfirm = window.confirm(
      "Are you sure you you want to Close the job.?"
    );
    if (!isConfirm) return;
    closeJob(_id);
  };

  const handleQuestion = (e) => {
    e.preventDefault();
    const question = e.target.question.value;
    if (!question) return;
    const data = { jobId: _id, userId: user._id, email: user.email, question };
    console.log(data);
    askQuestion(data);
  };

  const handleReply = ({ e, id }) => {
    e.preventDefault();
    const reply = e.target.reply.value;
    if (!reply) return;
    const data = { questionId: id, reply };
    sendReply(data);
    e.target.reply.value = "";
  };

  if (isLoading || res.isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto pt-16 grid grid-cols-12 gap-5 mb-12">
      <div className="col-span-12 lg:col-span-9 mb-10">
        <div className="h-80 rounded-xl overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={meeting}
            alt="meeting"
          />
        </div>
        <div className="space-y-5">
          <div className="flex justify-between items-center mt-5">
            <h1 className="text-xl font-semibold text-primary">{position}</h1>
            <div className="flex items-center gap-4">
              <p className="text-primary">
                Applicants:{" "}
                <span className="font-bold">{applicants?.length || 0}</span>
              </p>
              {user.role !== "employer" && (
                <button
                  className="btn"
                  onClick={handleApply}
                  disabled={isApplied || status === "closed"}
                >
                  {status === "closed"
                    ? "closed"
                    : !isApplied
                    ? "Apply"
                    : "Applied"}
                </button>
              )}
              {postBy._id === user._id && (
                <button className="btn" onClick={handleClose} disabled={status === "closed"}>
                  {status === "closed" ? "Closed" : "Close" }
                </button>
              )}
            </div>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Skills</h1>
            <ul>
              {skills?.map((skill, i) => (
                <li key={i} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Requirements
            </h1>
            <ul>
              {requirements?.map((skill, i) => (
                <li key={i} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Responsibilities
            </h1>
            <ul>
              {responsibilities?.map((skill, i) => (
                <li key={i} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="my-5" />
        <div>
          <div>
            <h3 className="text-xl font-semibold text-primary mb-5">
              General Q&A
            </h3>
            <div className="text-primary my-2">
              {queries?.map(({ question, email, reply, id }) => (
                <div>
                  <small>{email}</small>
                  <p className="text-lg font-medium">{question}</p>
                  {reply?.map((item, i) => (
                    <p
                      key={i}
                      className="flex items-center gap-2 relative left-5"
                    >
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}

                  {postBy._id === user._id && (
                    <form
                      onSubmit={(e) => handleReply({ e, id })}
                      className="flex gap-3 my-5"
                    >
                      <input
                        placeholder="Reply"
                        type="text"
                        className="w-full"
                        name="reply"
                      />
                      <button
                        className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                        type="submit"
                      >
                        <BsArrowRightShort size={30} />
                      </button>
                    </form>
                  )}
                </div>
              ))}
            </div>

            {user.role !== "employer" && (
              <form onSubmit={handleQuestion} className="flex gap-3 my-5">
                <input
                  placeholder="Ask a question..."
                  type="text"
                  className="w-full"
                  name="question"
                  id="question"
                />
                <button
                  className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                  type="submit"
                >
                  <BsArrowRightShort size={30} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-3">
        <div className="rounded-xl bg-primary/10 p-5 text-primary space-y-5">
          <div>
            <p>Experience</p>
            <h1 className="font-semibold text-lg">{experience}</h1>
          </div>
          <div>
            <p>Work Level</p>
            <h1 className="font-semibold text-lg">{workLevel}</h1>
          </div>
          <div>
            <p>Employment Type</p>
            <h1 className="font-semibold text-lg">{employmentType}</h1>
          </div>
          <div>
            <p>Salary Range</p>
            <h1 className="font-semibold text-lg">{salaryRange}</h1>
          </div>
          <div>
            <p>Location</p>
            <h1 className="font-semibold text-lg">{location}</h1>
          </div>
        </div>
        <div className="mt-5 rounded-xl bg-primary/10 p-5 text-primary space-y-5">
          <div>
            <h1 className="font-semibold text-lg">{companyName}</h1>
          </div>
          <div>
            <p>Company Size</p>
            <h1 className="font-semibold text-lg">Above 100</h1>
          </div>
          <div>
            <p>Founded</p>
            <h1 className="font-semibold text-lg">2003</h1>
          </div>
          <div>
            <p>Email</p>
            <h1 className="font-semibold text-lg">company.email@name.com</h1>
          </div>
          <div>
            <p>Company Location</p>
            <h1 className="font-semibold text-lg">Los Angeles</h1>
          </div>
          <div>
            <p>Website</p>
            <a
              href="https://itsproali.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://itsproali.netlify.app
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
