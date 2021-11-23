import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { playActions } from "../../redux/play-slice";

const PlaylistSong = ({ song }) => {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.play.currentSong);
  const [songHovered, setSongHovered] = useState(false);

  const selectSong = async () => {
    await dispatch(playActions.setCurrentSong(song));
  };

  let hoveredStyle;
  if (songHovered) {
    hoveredStyle = {
      background: `linear-gradient(to right, rgba(255,255,255,0) 50%, ${
        song.color[1] + 26
      })`,
      width: "100%",
    };
  } else {
    hoveredStyle = { width: "auto" };
  }

  const checkName = () => {
    if (Array.isArray(song.artist)) {
      return song.artist.join(", ");
    } else {
      return false;
    }
  };
  let artistResult = checkName();

  return (
    <div
      onMouseEnter={() => {
        setSongHovered(true);
      }}
      onMouseLeave={() => {
        setSongHovered(false);
      }}
      style={hoveredStyle}
      className={`playlist-item  ${
        currentSong.name === song.name && "highlight"
      }`}
      onClick={selectSong}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-info">
        <h4>{song.name}</h4>
        <h5>{artistResult ? artistResult : song.artist}</h5>
      </div>
    </div>
  );
};

export default PlaylistSong;
