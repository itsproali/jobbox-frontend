import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { FiLogOut } from "react-icons/fi";
import {logOutUser} from "../../redux/auth/authSlice"

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user: { role, firstName, lastName, email },
  } = useSelector((state) => state.auth);

  const candidateRoutes = [
    { name: "Applied Jobs", path: "/dashboard/applied-jobs" },
    { name: "Direct Message", path: "/dashboard/direct-message" },
  ];
  const employerRoutes = [
    { name: "Add Job", path: "/dashboard/add-job" },
    { name: "Posted Job", path: "/dashboard/posted-job" },
    { name: "Direct Message", path: "/dashboard/direct-message" },
  ];

  const handleLogOut = () => {
    dispatch(logOutUser());
    navigate("/");
  };

  return (
    <div className="bg-primary/10 col-span-2 h-screen flex justify-between flex-col sticky top-0">
      <ul className="flex flex-col gap-2 w-full h-full  p-3">
        <div className="flex justify-between items-center text-primary my-1">
          <Link to="/" className="flex items-center">
            <FaChevronLeft />
            <h1>Back</h1>
          </Link>
          <Link to={`/dashboard/${role}`} className="text-xl cursor-pointer">
            Dashboard
          </Link>
        </div>
        {role === "employer" &&
          employerRoutes.map((route) => (
            <li key={route.path}>
              <Link
                className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 text-center md:text-left rounded-full"
                to={route.path}
              >
                {route.name}
              </Link>
            </li>
          ))}
        {role === "candidate" &&
          candidateRoutes.map((route) => (
            <li key={route.path}>
              <Link
                className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 text-center md:text-left rounded-full"
                to={route.path}
              >
                {route.name}
              </Link>
            </li>
          ))}
      </ul>
      <div className="flex items-center justify-between gap-2 p-2 mb-4">
        <div className="">
          <h2 className="font-semibold text-md">
            {firstName + " " + lastName}
          </h2>
          <p className="text-xs text-gray-400">{email}</p>
        </div>
        <button
          title="LogOut"
          className="p-3 rounded-full border border-primary text-primary bg-primary/10 hover:bg-primary hover:text-white active:scale-95 duration-200"
          onClick={handleLogOut}
        >
          <FiLogOut />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
