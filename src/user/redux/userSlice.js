import { createSlice } from "@reduxjs/toolkit";
import { getLocalStore } from "../api/localUser";

const initialState = {
  user: getLocalStore("user_info"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveInfoUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { saveInfoUser } = userSlice.actions;

export default userSlice.reducer;
