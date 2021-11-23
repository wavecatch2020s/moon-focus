import { useEffect, Fragment } from "react";
import "./styles/app.scss";
import Playlist from "./components/Playlist/Playlist";
import RightSide from "./components/RightSide";

import { fetchData } from "./fetch-actions/fetch-actions";
import { useDispatch, useSelector } from "react-redux";
import { playActions } from "./redux/play-slice";

function App() {
  /// redux
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.data.listOfAllSongs);
  const currentPlaylist = useSelector((state) => state.play.currentPlaylist);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  // set initial playlist
  useEffect(() => {
    if (songs.length) {
      dispatch(playActions.setCurrentPlaylist(songs));
    }
  }, [songs]);

  console.log("App rendered");

  return (
    <div className="App">
      {!currentPlaylist.length ? (
        <div className="loader">Loading...</div>
      ) : (
        <Fragment>
          <Playlist />
          <RightSide />
        </Fragment>
      )}
    </div>
  );
}

export default App;
