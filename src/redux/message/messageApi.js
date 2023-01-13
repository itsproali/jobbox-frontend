import apiSlice from "../api/apiSlice";
import { setCurrentConversation, setMessages } from "./messageSlice";

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
    getConversation: builder.query({
      query: (id) => `/conversation/${id}`,
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            dispatch(setCurrentConversation(data.data.conversation));
          }
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["conversation"],
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/send-message",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["conversation"]
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useGetMessagesQuery,
  useGetConversationQuery,
  useSendMessageMutation
} = messageApi;
