import React, {useState} from "react";
import {FileUploader} from "../helper/FileUploader";
import {Video} from "../helper/Video";
import axios from "axios";
import ApplyFilters from "../helper/ApplyFilters";
import {useBeforeunload} from 'react-beforeunload';

export default () => {
    const [uploderVisibility, setUploaderVisibility] = useState("hidden")
    const [videoVisibility, setVideoVisibility] = useState("visible")
    const [uploadedVideo, setUploadedVideo] = useState(null)
    const [filtered, setFiltered] = useState(false)
    const [defaultEnabled, setDefaultEnabled] = useState(true)

    useBeforeunload(() => deleteUploadedAndFilteredVideos());

    /**
     * Sends request to server to apply chosen filters to uploaded video
     * @param props converted string representing filters
     */
    function applyFilters(props) {
        if (filtered) {
            deleteFilteredVideo()
        }
        axios.post(`//localhost:5000/filter`, {filters: props}, {})
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
     * Deletes uploaded video file
     */
    function deleteUploadedVideo() {
        axios.post(`//localhost:5000/deleteUploaded`)
            .then((res) => {
                console.log('Success in deleting uploaded video')
            })
            .catch((e) => {
                console.error('Error', e)
            })
        setUploadedVideo(null)
    }

    /**
     * Deletes filtered video file
     */
    function deleteFilteredVideo() {
        axios.post(`//localhost:5000/deleteFiltered`)
            .then((res) => {
                console.log('Success in deleting filtered video')
            })
            .catch((e) => {
                console.error('Error', e)
            })
        setFiltered(false)
    }

    /**
     * Deletes both uploaded and filtered video files
     */
    function deleteUploadedAndFilteredVideos() {
        deleteUploadedVideo()
        deleteFilteredVideo()
    }

    /**
     * Sets states to default and deletes uploaded/filtered video
     */
    function loadNewVideo() {
        setDefaultEnabled(false)
        setUploaderVisibility("visible")
        setVideoVisibility("hidden")
        deleteUploadedAndFilteredVideos()
    }

    return (
        <div className='videoDiv'>
            <FileUploader id="uploader" onSuccess={onSuccess} visibility={uploderVisibility}/>
            <Video uploadedVideo={uploadedVideo} filtered={filtered} visibility={videoVisibility}
                   isDefault={defaultEnabled}/>
            <div/>
            <ApplyFilters handleFilters={applyFilters}
                          disableButton={(defaultEnabled === false && uploadedVideo == null)}/>
            <div/>
            <button disabled={!filtered} onClick={downloadVideo}>Download</button>
            <button onClick={loadNewVideo}>Upload new video</button>
        </div>
    )
}
