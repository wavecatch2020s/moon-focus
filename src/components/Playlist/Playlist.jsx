import React, { useState } from "react";
import PlaylistSong from "./PlaylistSong";
import tabSvg from "../assets/tab.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMaximize } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";

const Playlist = () => {
  // redux store
  const currentPlaylist = useSelector((state) => state.play.currentPlaylist);
  const tabAnimation = useSelector((state) => state.ui.tabAnimation);
  // other states
  const [playlistActive, setPlaylistActive] = useState(false);

  const showSidebarHandler = () => {
    setPlaylistActive(!playlistActive);
  };

  console.log("Playlist rendered");

  return (
    <div className={`sidebar ${!playlistActive ? "hide-left" : ""}`}>
      <div className="tab-btn">
        <h2>Playlist</h2>
        {playlistActive ? (
          <div onClick={showSidebarHandler} className="minimize">
            <FontAwesomeIcon size="2x" icon={faWindowMaximize} />
          </div>
        ) : (
          <img
            onClick={showSidebarHandler}
            src={tabSvg}
            alt={"tab that toggles playlist"}
            className={tabAnimation ? "glow" : ""}
          />
        )}
      </div>
      <div className="playlist">
        {currentPlaylist != null &&
          currentPlaylist.map((song) => (
            <PlaylistSong key={song.id} song={song} id={song.id} />
          ))}
      </div>
    </div>
  );
};

export default Playlist;
