import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authUser: null,
  authenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
      state.authenticated=true;
    },
    clearAuthUser: (state) => {
      state.authUser = null;
    },
  },
});
export const { setAuthUser, clearAuthUser } = authSlice.actions;
export default authSlice.reducer;
