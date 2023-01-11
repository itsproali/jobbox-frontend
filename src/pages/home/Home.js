import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLazyGetUserDetailsQuery } from "../../redux/auth/authApi";
import Landing from "./Landing";

const Home = () => {
  const {
    user: { email, role },
  } = useSelector(state => state.auth);
  const [getDetails] = useLazyGetUserDetailsQuery();

  // Getting User Details
  useEffect(() => {
    if (email && !role) {
      getDetails(email);
    }
  }, [email, getDetails, role]);
  return (
    <>
      <Landing />
    </>
  );
};

export default Home;
