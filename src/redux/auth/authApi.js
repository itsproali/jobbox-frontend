import apiSlice from "../api/apiSlice";
import { setUser } from "./authSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setUser(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    getUserDetails: builder.query({
      query: (email) => ({ url: `/user/${email}` }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(setUser(data.data));
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useRegisterUserMutation, useGetUserDetailsQuery } = authApi;
