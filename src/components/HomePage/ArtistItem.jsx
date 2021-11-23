import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { playActions } from "../../redux/play-slice";

const ArtistItem = ({ artist }) => {
  const dispatch = useDispatch();
  const allAvailableSongs = useSelector((state) => state.data.listOfAllSongs);

  // event handler
  const chooseArtistHandler = () => {
    let currentArtist = artist.name;
    let chosenArtistPlaylist = [];
    allAvailableSongs.forEach((song) => {
      if (Array.isArray(song.artist)) {
        song.artist.forEach((artistInArray) => {
          if (artistInArray === currentArtist) {
            chosenArtistPlaylist.push(song);
          }
        });
      } else if (song.artist === currentArtist) {
        chosenArtistPlaylist.push(song);
      }
    });
    dispatch(playActions.setCurrentPlaylist(chosenArtistPlaylist));
  };

  return (
    <div onClick={chooseArtistHandler} className="artist">
      <img src={artist.photo} alt={`${artist.name} profile`} />
      <h3>{artist.name}</h3>
    </div>
  );
};

export default ArtistItem;
