import { createSlice } from "@reduxjs/toolkit";
import { getLocalStore } from "../api/localUser";

const initialState = {
  user: getLocalStore("user_info"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
