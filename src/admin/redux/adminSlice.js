import { createSlice } from "@reduxjs/toolkit";
import { getAdminLocalStore } from "../api/localServiceAdmin";

const initialState = {
  admin: getAdminLocalStore("admin_info"),
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    saveInfoAdmin: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { saveInfoAdmin } = adminSlice.actions;

export default adminSlice.reducer;
