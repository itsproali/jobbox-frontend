import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Loading from "./components/reusable/Loading";
import { useLazyGetUserDetailsQuery } from "./redux/auth/authApi";
import { loadingOff, setUserEmail } from "./redux/auth/authSlice";
import routes from "./routes/routes";
import auth from "./utils/firebase.config";

function App() {
  const dispatch = useDispatch();
  const {
    user: { email, role },
    isLoading,
    error,
  } = useSelector((state) => state.auth);
  const [getDetails, details] = useLazyGetUserDetailsQuery();

  // Set User Email
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && !email) {
        dispatch(setUserEmail(user.email));
      } else {
        dispatch(loadingOff());
      }
    });
  });

  // Getting User Details
  useEffect(() => {
    if (email && !role) {
      getDetails(email);
    }
  }, [email, getDetails, role]);

  // show error
  useEffect(() => {
    if (error) {
      toast.error(error, { id: "error" });
    }
  }, [error]);

  // show loading
  if (isLoading || details.isLoading) {
    return <Loading />;
  }
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;
