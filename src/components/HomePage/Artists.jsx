import React, { useState, useRef } from "react";
import ArtistItem from "./ArtistItem";

import { useSelector } from "react-redux";

const Artists = () => {
  const allArtists = useSelector((state) => state.data.listOfAllArtists);
  const artistRef = useRef("choose-artist");

  const [seeAllState, setSeeAllState] = useState(false);

  const artistList = allArtists.map((artist) => {
    return <ArtistItem key={artist.id} artist={artist} />;
  });

  function scrollTo(ref) {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="card choose-artist" ref={artistRef}>
      <div className="top-text">
        <h2>Artists</h2>
        <h3
          onClick={() => {
            setSeeAllState(!seeAllState);
            {
              !seeAllState && scrollTo(artistRef);
            }
          }}
        >
          {!seeAllState ? "See All" : "Minimize"}
        </h3>
      </div>
      <div className={`artist-list ${seeAllState ? "see-all" : "minimize"}`}>
        {artistList}
      </div>
    </div>
  );
};

export default Artists;
