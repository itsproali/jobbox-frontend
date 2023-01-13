import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../../utils/firebase.config";

const initialState = {
  user: { email: null, role: null },
  isLoading: true,
  error: null,
};

export const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data?.user?.email;
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data?.user?.email;
  }
);

export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
  const googleProvider = new GoogleAuthProvider();
  const data = await signInWithPopup(auth, googleProvider);
  return data?.user?.email;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserEmail: (state, action) => {
      state.user.email = action.payload;
      state.isLoading = false;
    },
    logOutUser: (state) => {
      state.isLoading = true;
      signOut(auth);
      state.user = { email: null, role: null };
    },
    loadingOff: (state) => {
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
  },
    setApplied: (state, action) => {
      state.user.appliedJob.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.user = { email: null, role: null };
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user.email = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.user = { email: null, role: null };
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.user = { email: null, role: null };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user.email = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.user = { email: null, role: null };
      });
    builder
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.user = { email: null, role: null };
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user.email = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.user = { email: null, role: null };
      });
  },
});

export const { setUserEmail, setUser, setApplied, logOutUser, loadingOff } =
  authSlice.actions;

export default authSlice.reducer;
