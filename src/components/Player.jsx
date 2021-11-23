import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Heart from "./Heart";
import VolumeControl from "./VolumeControl";

import { useDispatch, useSelector } from "react-redux";
import { playActions } from "../redux/play-slice";

const Player = () => {
  // redux store
  const currentPlaylist = useSelector((state) => state.play.currentPlaylist);
  const currentSong = useSelector((state) => state.play.currentSong);
  const dispatch = useDispatch();
  // other states
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  // event handlers
  const playSongHandler = () => {
    if (!isPlaying) {
      setIsPlaying(!isPlaying);
      audioRef.current.play();
    } else {
      setIsPlaying(!isPlaying);
      audioRef.current.pause();
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    //calculate percantage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage,
    });

    if (roundedCurrent === roundedDuration) {
      const currentSongIndex = currentPlaylist.indexOf(currentSong);

      const indexOfNewSong = currentSongIndex + 1;
      dispatch(playActions.setCurrentSong(currentPlaylist[indexOfNewSong]));
    }
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const skipSongHandler = async (direction) => {
    const currentSongIndex = currentPlaylist.indexOf(currentSong);

    let indexOfNewSong = currentSongIndex + direction;

    if (indexOfNewSong === -1) {
      indexOfNewSong = currentPlaylist.length - 1;
    } else if (indexOfNewSong === currentPlaylist.length) {
      indexOfNewSong = 0;
    }

    await dispatch(playActions.setCurrentSong(currentPlaylist[indexOfNewSong]));

    if (!isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const autoPlayHandler = () => {
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const getDuration = async () => {
    const newDuration = await getTime(songInfo.duration);
    return newDuration;
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  let linearGradient = { background: "#73adff" };
  if (currentSong.color != null) {
    linearGradient = {
      background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
    };
  }

  return (
    <div className="player">
      <div className="row-wrapper">
        <Heart currentSong={currentSong} />
        <div className="time-control">
          <p>{getTime(songInfo.currentTime)}</p>
          <div className="track" style={linearGradient}>
            <input
              type="range"
              min={0}
              max={songInfo.duration || 0}
              value={songInfo.currentTime}
              onChange={dragHandler}
            />
            <div className="animate-track" style={trackAnim}></div>
          </div>
          <p>
            {isNaN(songInfo.duration)
              ? () => {
                  getDuration();
                }
              : getTime(songInfo.duration)}
          </p>
        </div>
        <VolumeControl audioRef={audioRef} />
      </div>
      <div className="play-control">
        <button>
          <FontAwesomeIcon
            onClick={() => {
              skipSongHandler(-1);
            }}
            className="skip-back"
            size="2x"
            icon={faChevronLeft}
          />
        </button>
        <button>
          <FontAwesomeIcon
            onClick={playSongHandler}
            className="play"
            // viewBox="0 0 200 200"
            size="2x"
            icon={!isPlaying ? faPlay : faPause}
          />
        </button>
        <button>
          <FontAwesomeIcon
            onClick={() => {
              skipSongHandler(1);
            }}
            className="skip-right"
            size="2x"
            icon={faChevronRight}
          />
        </button>
      </div>
      <audio
        volume="1"
        onLoadedMetadata={timeUpdateHandler}
        onLoadedData={autoPlayHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
