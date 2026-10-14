import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    checked: false
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.checked = true;
    },
    logout: (state) => {
      state.user = null;
      state.checked = true;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
