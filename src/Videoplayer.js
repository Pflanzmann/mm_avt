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
    <div className="video-container">
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
       
      </div>
    </div>
  )
};


