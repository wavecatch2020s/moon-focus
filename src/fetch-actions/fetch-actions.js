import { dataActions } from "../redux/data-slice";
// import { useSelector } from "react-redux";
// import { playActions } from "./play-slice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response1 = await fetch(
        "https://moon-focus-default-rtdb.europe-west1.firebasedatabase.app/songs.json"
      );
      const response2 = await fetch(
        "https://moon-focus-default-rtdb.europe-west1.firebasedatabase.app/artists.json"
      );
      const response3 = await fetch(
        "https://moon-focus-default-rtdb.europe-west1.firebasedatabase.app/albums.json"
      );
      const response4 = await fetch(
        "https://moon-focus-default-rtdb.europe-west1.firebasedatabase.app/favorites.json"
      );
      if (!response1.ok || !response2.ok || !response3.ok || !response4.ok) {
        throw new Error("could not fetch all! :(");
      }

      const data1 = await response1.json();
      const data2 = await response2.json();
      const data3 = await response3.json();
      const data4 = await response4.json();
      const data = [data1, data2, data3, data4];

      return data;
    };

    try {
      const fetchedData = await fetchData();
      dispatch(dataActions.loadEntireLists(fetchedData));
    } catch (error) {
      console.log(error.message);
    }
  };
};

// export const setInitialPlaylist = () => {
//   return async (dispatch) => {
//     const dispatchInitialPlaylist = async () => {

//     }
//   }
// }

export const submitFavoriteSong = (song) => {
  return async (dispatch) => {
    const sendSong = async () => {
      const response = await fetch(
        "https://moon-focus-default-rtdb.europe-west1.firebasedatabase.app/favorites.json",
        {
          method: "POST",
          body: JSON.stringify(song),
        }
      );

      console.log("tried adding song to Favorites!");

      if (!response.ok) {
        throw new Error("Posting song to favorites list failed");
      }
    };

    try {
      await sendSong();
      await dispatch(dataActions.addSongToFavorites(song));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const removeSongFromFavorites = (newList) => {
  return async (dispatch) => {
    const removeSong = async () => {
      let newObj = {};
      newList.forEach((item) => {
        newObj[item.id] = { ...item };
      });
      // console.log(newObj);
      const response = await fetch(
        "https://moon-focus-default-rtdb.europe-west1.firebasedatabase.app/favorites.json",
        {
          method: "PUT",
          body: JSON.stringify(newObj),
        }
      );
      if (!response.ok) {
        throw new Error("could not PUT all! :(");
      }
    };

    try {
      await removeSong();
      await dispatch(dataActions.updateFavorites(newList));
    } catch (error) {
      console.log(error.message);
    }
  };
};
