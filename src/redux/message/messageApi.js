import apiSlice from "../api/apiSlice";
import { setMessages } from "./messageSlice";

const messageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (data) => ({
        url: "/create-message",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["messages"],
    }),
    getMessages: builder.query({
      query: (email) => `/messages/${email}`,
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(setMessages(data.data));
          }
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["messages"],
    }),
  }),
});

export const { useCreateMessageMutation, useGetMessagesQuery } = messageApi;
