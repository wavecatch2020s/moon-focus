import React, { useState, useEffect, Fragment } from "react";
import Navbar from "./Navbar";
import Song from "./Song";
import Player from "./Player";
import Homepage from "./HomePage/Homepage";

import { useSelector } from "react-redux";

const RightSide = () => {
  const [displayedContainer, setDisplayedContainer] = useState("homepage");
  const currentPlaylist = useSelector((state) => state.play.currentPlaylist);

  console.log("RightSide rendered");

  return (
    <div className="right-side">
      <Navbar
        displayedContainer={displayedContainer}
        setDisplayedContainer={setDisplayedContainer}
      />

      {displayedContainer === "homepage" && <Homepage />}

      <div
        className={`song-and-player ${
          displayedContainer === "player" ? "main-container" : "move-down"
        }`}
      >
        {currentPlaylist == null ? (
          ""
        ) : (
          <Fragment>
            <Song />
            <Player />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default RightSide;
