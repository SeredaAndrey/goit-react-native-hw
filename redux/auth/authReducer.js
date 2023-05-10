import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: null,
    name: null,
  },
  reducers: {},
});
