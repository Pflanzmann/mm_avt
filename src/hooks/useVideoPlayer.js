import { useState, useEffect } from "react";

//hook takes single argument: reference to video(videoElement)
const useVideoPlayer = (videoElement) => {
    //state and its 3 properties
    const [playerState, setPlayerState] = useState({
        isPlaying: false,
        progress: 0,
        isMuted: false,
    });

    //function to dictate if player paused or not
    //keep values of other properties
    //when function executed: provide inverse value of current state
    const togglePlay = () => {
        setPlayerState({
            ...playerState,
            isPlaying: !playerState.isPlaying,
        });
    };

    //useEffect to pause video or not 
    //through value of isPlaying property
    useEffect(() => {
        playerState.isPlaying
            ? videoElement.current.play()
            : videoElement.current.pause();
    }, [playerState.isPlaying, videoElement]);

    //progress bar of video shows how much video is seen by duration of video
    //calculate how much of video seen/remain to be seen
    //keep values of other properties
    //only update progress value
    const handleOnTimeUpdate = () => {
        const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
        setPlayerState({
            ...playerState,
            progress,
        });
    };

    //drag progress bar
    //single argument: event
    //convert event value String->number
    //tell videoElement directly: current viewing time=value of manual change
    //keep values of other properties
    //update only progress
    const handleVideoProgress = (event) => {
        const manualChange = Number(event.target.value);
        videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;
        setPlayerState({
            ...playerState,
            progress: manualChange,
        });
    };

    //mute/unmute video
    //calculation similar to play/pause
    const toggleMute = () => {
        setPlayerState({
            ...playerState,
            isMuted: !playerState.isMuted,
        });
    };

    useEffect(() => {
        playerState.isMuted
            ? (videoElement.current.muted = true)
            : (videoElement.current.muted = false);
    }, [playerState.isMuted, videoElement]);

    //return state and all created functions
    return {
        playerState,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        toggleMute,
    };
};


export default useVideoPlayer