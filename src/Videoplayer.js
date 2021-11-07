import React, { useRef } from "react";
import "./style/Videoplayer.css";
import video from "./assets/video.mp4";
import useVideoPlayer from "./hooks/useVideoPlayer";
import "boxicons";
import Timeline from "timeline-editor-react";

export default () => {
  const videoElement = useRef(null); //create videoElement's reference

  //get playerState and functions from hook
  const {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    toggleMute,
  } = useVideoPlayer(videoElement);

  return (
    <div className="container">
      <div className="videoWrapper">
        <video
          src={video}
          ref={videoElement}
          onTimeUpdate={handleOnTimeUpdate}
        />

        <div className="controls">
          <div className="actions">
            <button onClick={togglePlay}>
              {!playerState.isPlaying ? (
                <box-icon name="play"></box-icon>
              ) : (
                <box-icon name="pause"></box-icon>
              )}
            </button>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleVideoProgress(e)}
          />
          <button
            className="mute-btn"
            onClick={toggleMute}>
            {!playerState.isMuted ? (
              <box-icon name="volume-full"></box-icon>
            ) : (
              <box-icon name="volume-mute" type="solid"></box-icon>
            )}
          </button>
        </div>
        <div className="timeline">
        <Timeline layers={layers} frames={frames} onUpdateFrames={onUpdateFrames} />
      </div>
      </div>
    </div>
  )
};

var layers = [
  {
    id: "3d1df1b4-4d9d-45a4-bf14-cb580ee74675",
    name: "Left"
  },
  {
    id: "7d8c4210-0cfa-4a10-8b21-01e6601e00bf",
    name: "Top"
  },
  {
    id: "65079f30-47a8-4469-833e-4f0eea04d233",
    name: "Bottom"
  }
];
var frames = {
  "3d1df1b4-4d9d-45a4-bf14-cb580ee74675": [{
    name: "Hello.png",
    second: 0,
    duration: 70
  },
  {
    name: "Welcome.png",
    second: 130,
    duration: 200
  }],
  "7d8c4210-0cfa-4a10-8b21-01e6601e00bf": [{
    name: "Goodbye.png",
    second: 10,
    duration: 150
  }],
  "65079f30-47a8-4469-833e-4f0eea04d233": []
};

function onUpdateFrames(frames) {
  //TODO: deal with frames
}
