import React, { useState, useRef } from "react";
import volume0 from "./assets/volume0.svg";
import volume1 from "./assets/volume1.svg";
import volume2 from "./assets/volume2.svg";
import volume3 from "./assets/volume3.svg";

const VolumeControl = ({ audioRef }) => {
  const [volumeIcon, setVolumeIcon] = useState(volume3);

  let rangeRef = useRef(null);

  const changeVolumeIcon = (value) => {
    if (value == 0) {
      setVolumeIcon(volume0);
      console.log("volume0");
    } else if (value > 0 && value <= 33) {
      setVolumeIcon(volume1);
    } else if (value > 33 && value <= 66) {
      setVolumeIcon(volume2);
    } else if (value > 66) {
      setVolumeIcon(volume3);
    } else {
      console.log("error");
    }
  };

  const volumeDragHandler = (e) => {
    audioRef.current.volume = e.target.value / 100;
    changeVolumeIcon(e.target.value);
  };

  const muteHandler = () => {
    console.log(audioRef.current.volume);
    console.log(rangeRef.current.value);
    if (audioRef.current.volume > 0) {
      audioRef.current.volume = 0;
      rangeRef.current.value = 0;
      setVolumeIcon(volume0);
    } else {
      audioRef.current.volume = 0.5;
      rangeRef.current.value = 50;
      setVolumeIcon(volume2);
    }
  };

  return (
    <div className="volume-control">
      <img
        src={volumeIcon}
        alt="volume control"
        onClick={muteHandler}
        className="svg-filter"
      />
      <input
        ref={rangeRef}
        type="range"
        id="vertical"
        min={0}
        max={100}
        onChange={volumeDragHandler}
        defaultValue="100"
      />
    </div>
  );
};

export default VolumeControl;
