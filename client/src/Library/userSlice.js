import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User",
  initialState: {
    id: "",
    email: "",
    name: "",
    // token:"",
    communications:[]
  },
  reducers: {
    setUserInfo(state, action) {
      console.log(action);
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.communications = action.payload.communications;
    //   return state
    },
    setRecipient(state, action) {
      state.recipient = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
