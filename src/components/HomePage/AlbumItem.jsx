import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { playActions } from "../../redux/play-slice";

const AlbumItem = ({ album }) => {
  const dispatch = useDispatch();
  const listOfAllSongs = useSelector((state) => state.data.listOfAllSongs);

  const selectAlbumHandler = () => {
    const selectedAlbumName = album.name;
    const allAlbumSongs = [];
    listOfAllSongs.forEach((song) => {
      if (
        song.albumName === selectedAlbumName &&
        allAlbumSongs.indexOf(song) === -1
      ) {
        allAlbumSongs.push(song);
      }
    });
    dispatch(playActions.setCurrentPlaylist(allAlbumSongs));
  };

  return (
    <div onClick={selectAlbumHandler} key={album.id} className="album-cover">
      <img src={album.cover} alt={album.name} />
      <h4 className="song-info">{album.name}</h4>
    </div>
  );
};

export default AlbumItem;
