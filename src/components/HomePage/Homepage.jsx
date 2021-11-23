import React from "react";
import Albums from "./Albums";
import Artists from "./Artists";

import { useDispatch, useSelector } from "react-redux";
import { playActions } from "../../redux/play-slice";
import { uiActions } from "../../redux/ui-slice";

const Homepage = () => {
  const dispatch = useDispatch();
  const favoriteSongs = useSelector((state) => state.data.favoriteSongs);
  const songs = useSelector((state) => state.data.listOfAllSongs);

  // shuffle function
  const shuffle = (array) => {
    let newArr = [...array];
    var currentIndex = newArr.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [newArr[currentIndex], newArr[randomIndex]] = [
        newArr[randomIndex],
        newArr[currentIndex],
      ];
    }

    return newArr;
  };

  // event listener
  const changePlaylist = (type) => {
    dispatch(uiActions.animateTab(true));
    let playlist = [];
    if (type === "all") {
      playlist = songs;
    } else if (type === "random") {
      playlist = shuffle(songs);
    } else if (type === "favorites") {
      playlist = favoriteSongs;
    }
    dispatch(playActions.setCurrentPlaylist(playlist));
    setTimeout(() => {
      dispatch(uiActions.animateTab(false));
    }, 900);
  };

  return (
    <div className="homepage">
      <div className="inner-homepage">
        <div className="top-list">
          <div
            onClick={() => {
              changePlaylist("all");
            }}
            className="top-list-item img-1"
          >
            <h2>Play All</h2>
          </div>
          <div
            onClick={() => {
              changePlaylist("random");
            }}
            className="top-list-item img-2"
          >
            <h2 className="random">Random Playlist</h2>
          </div>
          <div
            onClick={() => {
              changePlaylist("favorites");
            }}
            className="top-list-item img-3"
          >
            <h2 className="favorite">Favorite Songs</h2>
          </div>
        </div>
        <h1>...Or play songs by:</h1>
        <Albums songs={songs} />
        <Artists songs={songs} />
      </div>
    </div>
  );
};

export default Homepage;
