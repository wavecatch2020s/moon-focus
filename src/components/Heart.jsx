import React, { useState } from "react";
import heartEmpty from "./assets/heart-empty.svg";
import heartFull from "./assets/heart-full.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  submitFavoriteSong,
  removeSongFromFavorites,
} from "../fetch-actions/fetch-actions";

const Heart = (props) => {
  // redux
  const dispatch = useDispatch();
  const favoriteSongs = useSelector((state) => state.data.favoriteSongs);
  const currentSong = useSelector((state) => state.play.currentSong);

  const checkInitialStatus = () => {
    if (
      favoriteSongs.findIndex((song) => {
        return song.name === props.currentSong.name;
      }) !== -1
    ) {
      return true;
    } else {
      return false;
    }
  };
  const initialStatus = checkInitialStatus();

  const [, reloadComponent] = useState();

  const clickHeartHandler = () => {
    if (!initialStatus) {
      dispatch(submitFavoriteSong(currentSong));
      reloadComponent(Math.random());
    } else {
      const currentFavorites = favoriteSongs;
      let newList1 = currentFavorites.filter(
        (item) => item.name !== currentSong.name
      );

      dispatch(removeSongFromFavorites(newList1));
      reloadComponent(Math.random());
    }
  };

  return (
    <button onClick={clickHeartHandler}>
      {initialStatus ? (
        <img
          className="heart"
          src={heartFull}
          alt="remove this to favorites playlist"
        />
      ) : (
        <img
          className="heart"
          src={heartEmpty}
          alt="add this to favorites playlist"
        />
      )}
    </button>
  );
};

export default Heart;
