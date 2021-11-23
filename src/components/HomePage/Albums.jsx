import React, { useState, useRef } from "react";
import AlbumItem from "./AlbumItem";

import { useSelector } from "react-redux";

const Albums = () => {
  // redux
  const allAvailableAlbums = useSelector((state) => state.data.listOfAllAlbums);

  // other states
  const [seeAllState, setSeeAllState] = useState(false);
  const albumsRef = useRef();

  const AlbumList = () => {
    const result = allAvailableAlbums.map((album) => {
      return <AlbumItem key={album.id} album={album} />;
    });

    return result;
  };

  function scrollTo(ref) {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="card choose-album" ref={albumsRef}>
      <div className="top-text">
        <h2>Albums</h2>
        <h3
          onClick={() => {
            setSeeAllState(!seeAllState);
            {
              !seeAllState && scrollTo(albumsRef);
            }
          }}
        >
          {!seeAllState ? "See All" : "Minimize"}
        </h3>
      </div>
      <div className={`album-list ${seeAllState ? "see-all" : "minimize"}`}>
        <AlbumList />
      </div>
    </div>
  );
};

export default Albums;
