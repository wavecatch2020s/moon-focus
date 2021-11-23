import { configureStore } from "@reduxjs/toolkit";

import dataSlice from "./data-slice";
import playSlice from "./play-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    play: playSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
