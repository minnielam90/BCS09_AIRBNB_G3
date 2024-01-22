import { createSlice } from "@reduxjs/toolkit";
import { getLocalStore } from "../api/localUser";

const initialState = {
  token: getLocalStore("token_user"),
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    saveTokenUser: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { saveTokenUser } = tokenSlice.actions;

export default tokenSlice.reducer;
