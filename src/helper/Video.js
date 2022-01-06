import React, {useEffect, useState} from "react";

export const Video = ({uploadedVideo, filtered, visibility}) => {
    const [videoSource, setVideoSource] = useState()
    useEffect(() => {
            if (uploadedVideo === undefined || uploadedVideo == null) {
                return <div/>
            }
            if (filtered) {
                console.log("filtered")
                setVideoSource(`//localhost:5000/filtered.mp4`)
            } else {
                document.getElementById("video-wrapper").className = "visible"

                console.log(uploadedVideo.filename)
                setVideoSource(`//localhost:5000/${uploadedVideo.filename}`)
            }
        }
    )

    return <div id="video-wrapper" className={visibility}>
        <video key={videoSource} className="video-frame" controls loop>
            <source src={videoSource}/>
        </video>

    </div>
}
