import React, {useEffect, useState} from "react";

/**
 * Represents video component
 * @param uploadedVideo video that has been uploaded by the user
 * @param filtered boolean value to choose what video to display: original or filtered
 * @param visibility boolean value to set visibility of a component
 * @param isDefault
 * @returns {JSX.Element} video component or empty div component if there is no video to display
 */
export const Video = ({uploadedVideo, filtered, visibility, isDefault}) => {

    const [videoSource, setVideoSource] = useState()
    useEffect(() => {
            if (isDefault) {
                setVideoSource(`//localhost:5000/default_video.mp4`)
                if (filtered) {
                    setVideoSource(`//localhost:5000/filtered.mp4`)
                }
            } else {
                if (uploadedVideo === undefined || uploadedVideo === null) {
                    if (videoSource != null) {
                        setVideoSource(null)
                    }
                    return <div/>
                }
                if (filtered) {
                    setVideoSource(`//localhost:5000/filtered.mp4`)
                } else {
                    document.getElementById("video-wrapper").className = "visible"
                    setVideoSource(`//localhost:5000/${uploadedVideo.filename}`)
                }
            }
        }, [uploadedVideo, filtered, videoSource, isDefault]
    )

    return <div id="video-wrapper" className={visibility}>
        <video id="videoSource" key={videoSource} crossOrigin="anonymous" className="video-frame" controls loop>
            <source src={videoSource}/>
        </video>
    </div>
}
