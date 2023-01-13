import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  currentMessage: { name: "", email: "", conversation: [] },
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setCurrentMessage: (state, action) => {
      state.currentMessage = { ...action.payload, conversation: [] };
    },
    setCurrentConversation: (state, action) => {
      state.currentMessage.conversation = action.payload;
    },
  },
});

export const { setMessages, setCurrentMessage, setCurrentConversation } =
  messageSlice.actions;
export default messageSlice.reducer;
