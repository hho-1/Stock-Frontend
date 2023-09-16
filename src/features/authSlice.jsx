import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    loading: false,
    error: false,
    isAdmin: false,
    token: null,
  },
  reducers: {
    fetchStart: state => {
      state.loading = true;
      state.error = false;
    },
    fetchFail: state => {
      state.loading = false;
      state.error = true;
    },
    registerSuccess: (state,{payload}) => {
      state.loading = false;
      state.currentUser = payload.username;
      state.token = payload.token;

    },
  },
});

export const {
  fetchStart,
  fetchFail,
} = authSlice.actions;
export default authSlice.reducer;
