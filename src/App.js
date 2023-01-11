import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Loading from "./components/reusable/Loading";
import { loadingOff, setUserEmail } from "./redux/auth/authSlice";
import routes from "./routes/routes";
import auth from "./utils/firebase.config";

function App() {
  const dispatch = useDispatch();
  const {
    user: { email },
    isLoading,
    error,
  } = useSelector((state) => state.auth);

  // Set User Email
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && !email) {
        dispatch(setUserEmail(user.email));
      } else {
        dispatch(loadingOff());
      }
    });
  }, [dispatch]);

  // show error
  useEffect(() => {
    if (error) {
      toast.error(error, { id: "error" });
    }
  }, [error]);

  // show loading
  if (isLoading) {
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
