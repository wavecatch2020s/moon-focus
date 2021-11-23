import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    tabAnimation: false,
  },
  reducers: {
    animateTab(state, action) {
      const status = action.payload;

      state.tabAnimation = status;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
