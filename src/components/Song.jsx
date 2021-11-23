import React from "react";
import { useSelector } from "react-redux";

const Song = () => {
  const currentSong = useSelector((state) => state.play.currentSong);

  const checkName = () => {
    if (Array.isArray(currentSong.artist)) {
      return currentSong.artist.join(", ");
    } else {
      return false;
    }
  };
  let artistResult = checkName();

  return (
    <div className="song-container">
      <img
        className="image"
        src={currentSong.cover}
        alt={currentSong.name}
      ></img>
      <div className="description">
        <h2>{currentSong.name}</h2>
        <h3>{artistResult ? artistResult : currentSong.artist}</h3>
      </div>
    </div>
  );
};

export default Song;
