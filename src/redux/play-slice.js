import { createSlice } from "@reduxjs/toolkit";

const playSlice = createSlice({
  name: "play",
  initialState: {
    currentSong: [],
    currentPlaylist: [],
  },
  reducers: {
    setCurrentPlaylist(state, action) {
      const currentPlaylistPayload = action.payload;

      state.currentSong = currentPlaylistPayload[0];
      state.currentPlaylist = currentPlaylistPayload;
    },
    setCurrentSong(state, action) {
      const currentSongPayload = action.payload;

      state.currentSong = currentSongPayload;
    },
  },
});

export const playActions = playSlice.actions;

export default playSlice;
