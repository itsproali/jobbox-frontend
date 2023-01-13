import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  currentUser: {},
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setMessages, setCurrentUser } = messageSlice.actions;
export default messageSlice.reducer;
