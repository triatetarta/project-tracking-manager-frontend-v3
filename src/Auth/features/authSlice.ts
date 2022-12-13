import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, isLoggedIn: false },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.token = null;
      state.isLoggedIn = false;
    },
    logIn: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const { setCredentials, logOut, logIn } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
