import React, { useState } from "react";
import { FileUploader } from "../helper/FileUploader";
import { Video } from "../helper/Video";
import axios from "axios";
import ApplyFilters from "../helper/ApplyFilters";
import { useBeforeunload } from 'react-beforeunload';

export default () => {
    const [uploderVisibility, setUploaderVisibility] = useState("hidden")
    const [viseoVisibility, setVideoVisibility] = useState("visible")
    const [uploadedVideo, setUploadedVideo] = useState(null)
    const [filtered, setFiltered] = useState(false)
    const [defaultEnabled, setDefaultEnabled] = useState(true)

    useBeforeunload(() => deleteUploadedAndFilteredVideos());

    /**
     * Sends request to server to apply chosen filters to uploaded video
     * @param props converted string representing filters
     */
    function applyFilters(props) {
        console.log(props)
        axios.post(`//localhost:5000/filter`, { filters: props }, {})
            .then((res) => {
                onSuccess(res.data)
                setFiltered(true)
            })
            .catch((e) => {
                console.error('Error', e)
            })
    }

    /**
     * Triggers action to happen after the video was successfully uploaded:
     * Sets uploaded video to be displayed. Controls visibility of upload input field and video itself.
     * Permits filtering for audio
     * @param uploadedVideo
     */
    function onSuccess(uploadedVideo) {
        setUploadedVideo(uploadedVideo)
        setUploaderVisibility("hidden")
        setVideoVisibility("visible")
    }

    /**
     * Sends request to server to download filtered video
     */
    function downloadVideo() {
        fetch('http://localhost:5000/filtered.mp4')
            .then(response => {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'filtered.mp4';
                    a.click();
                });
            });
    }

    /**
     * Deletes uploaded and/or filtered video files
     */
    function deleteUploadedAndFilteredVideos() {
        axios.post(`//localhost:5000/delete`)
            .then((res) => {
                console.log('Success in deleting videos')
            })
            .catch((e) => {
                console.error('Error', e)
            })
    }

    /**
     * Sets states to default and deletes uploaded/filtered video
     */
    function loadNewVideo() {
        setDefaultEnabled(false)
        setUploadedVideo(null)
        setFiltered(false)
        setUploaderVisibility("visible")
        setVideoVisibility("hidden")
        deleteUploadedAndFilteredVideos()
    }

    return (
        <div className='videoDiv'>
            <FileUploader id="uploader" onSuccess={onSuccess} visibility={uploderVisibility} />
            <Video uploadedVideo={uploadedVideo} filtered={filtered} visibility={viseoVisibility} isDefault={defaultEnabled}/>
            <div />
            <ApplyFilters handleFilters={applyFilters} disableButton={(defaultEnabled===false && uploadedVideo == null)} />
            <div />
            <button disabled={!filtered} onClick={downloadVideo}>Download</button>
            <button onClick={loadNewVideo}>Upload new video</button>
        </div>
    )
}
