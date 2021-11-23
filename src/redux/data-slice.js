import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    initialPlaylist: [],
    listOfAllSongs: [],
    listOfAllArtists: [],
    listOfAllAlbums: [],
    favoriteSongs: [],
  },
  reducers: {
    loadEntireLists(state, action) {
      const fetchedData = action.payload;

      // list of artists
      const ListOfArtistsObj = fetchedData[1];
      let entireArtistsList = [];
      for (let artist in ListOfArtistsObj) {
        let obj = ListOfArtistsObj[artist];
        obj.id = artist;
        entireArtistsList.push(obj);
      }
      entireArtistsList.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );

      // list of albums
      const ListOfAlbumsObj = fetchedData[2];
      let entireAlbumsList = [];
      for (let artist in ListOfAlbumsObj) {
        let obj = ListOfAlbumsObj[artist];
        obj.id = artist;
        entireAlbumsList.push(obj);
      }
      entireAlbumsList.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );

      // list of songs
      const ListOfSongsObj = fetchedData[0];
      let entireSongList = [];
      for (let song in ListOfSongsObj) {
        let obj = ListOfSongsObj[song];
        obj = { ...obj, id: song };
        entireSongList.push(obj);
      }

      entireSongList.forEach((song) => {
        const albumData = entireAlbumsList.find(
          (album) => album.name === song.albumName
        );
        song.cover = albumData.cover;
        song.color = albumData.color;
      });

      // list of Favorite songs
      const listOfFavoriteSongsObj = fetchedData[3];
      let entireFavoriteSongList = [];
      if (listOfFavoriteSongsObj != null) {
        for (let itemKey in listOfFavoriteSongsObj) {
          let obj = listOfFavoriteSongsObj[itemKey];
          obj = { ...obj, id: itemKey };
          entireFavoriteSongList.push(obj);
        }
      }

      // mutate states
      // state.initialPlaylist = entireSongList;
      state.listOfAllSongs = entireSongList;
      state.listOfAllArtists = entireArtistsList;
      state.listOfAllAlbums = entireAlbumsList;
      state.favoriteSongs = entireFavoriteSongList;
    },
    updateFavorites(state, action) {
      const newFavorites = action.payload;

      state.favoriteSongs = newFavorites;
    },
    addSongToFavorites(state, action) {
      const newFavoriteSong = action.payload;

      state.favoriteSongs.push(newFavoriteSong);
    },
    removeSongFromFavorites(state, action) {
      const songToBeRemoved = action.payload;

      const currentFavorites = state.favoriteSongs;

      const indexToRemove = currentFavorites.indexOf(songToBeRemoved);

      state.favoriteSongs.splice(indexToRemove, 1);
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
