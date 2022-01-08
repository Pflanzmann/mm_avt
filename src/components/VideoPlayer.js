import '../style/App.css';

import React, { useState } from "react";
import { FileUploader } from "../helper/FileUploader";
import { Video } from "../helper/Video";
import axios from "axios";
import ApplyFilters from "../helper/ApplyFilters";
import { useBeforeunload } from 'react-beforeunload';

export default () => {
    const [uploderVisibility, setUploaderVisibility] = useState("visible")
    const [viseoVisibility, setVideoVisibility] = useState("hidden")
    const [uploadedVideo, setUploadedVideo] = useState(null)
    const [filtered, setFiltered] = useState(false)

    useBeforeunload(() => deleteUploadedAndFilteredVideos());
    function applyFilters(props) {
        console.log(props)
        axios.post(`//localhost:5000/filter`, { filters: props }, {})
            .then((res) => {
                console.log('Success in apply filter')
                console.log(res.data)
                onSuccess(res.data)
                setFiltered(true)
            })
            .catch((e) => {
                console.error('Error', e)
            })
    }

    function onSuccess(uploadedVideo) {
        console.log("On sucess in videoPlayer")
        setUploadedVideo(uploadedVideo)
        setUploaderVisibility("hidden")
        setVideoVisibility("visible")
    }

    function downloadVideo() {
        console.log("ready for download")
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

    function deleteUploadedAndFilteredVideos() {
        axios.post(`//localhost:5000/delete`)
            .then((res) => {
                console.log('Success in deleting videos')
            })
            .catch((e) => {
                console.error('Error', e)
            })
    }

    function loadNewVideo() {
        setUploadedVideo(null)
        setFiltered(false)
        setUploaderVisibility("visible")
        setVideoVisibility("hidden")
        deleteUploadedAndFilteredVideos()
    }

    return (
        <div className='videoDiv'>
            <FileUploader id="uploader" onSuccess={onSuccess} visibility={uploderVisibility} />
            <Video uploadedVideo={uploadedVideo} filtered={filtered} visibility={viseoVisibility} />
            <div />
            <ApplyFilters handleFilters={applyFilters} />
            <div />
            <button disabled={!filtered} onClick={downloadVideo}>Download</button>
            <button onClick={loadNewVideo}>Upload new video</button>

        </div>
    )
}
