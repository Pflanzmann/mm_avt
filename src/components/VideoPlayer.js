
import React, { useState } from "react";
import { FileUploader } from "../helper/FileUploader";
import { Video } from "../helper/Video";
import axios from "axios";
import ApplyFilters from "../helper/ApplyFilters";
import { useBeforeunload } from 'react-beforeunload';
import * as ConstantBooleans from "../constants/checkBoxBooleans.js"


var videoElement;
const ctx = new AudioContext();
const lowpass = ctx.createBiquadFilter();
const bandpass = ctx.createBiquadFilter();
const highpass = ctx.createBiquadFilter();
const lowshelf = ctx.createBiquadFilter();
const highshelf = ctx.createBiquadFilter();
const peaking = ctx.createBiquadFilter();
const notch = ctx.createBiquadFilter();
lowpass.type = 'lowpass';
bandpass.type = 'bandpass';
highpass.type = 'highpass';
lowshelf.type = 'lowshelf';
highshelf.type = 'highshelf';
peaking.type = 'peaking';
notch.type = 'notch';

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
        setAudioFilter();
    }

    function setAudioFilter(){

        //This works, but only if the browser was refreshed due to changes in js
        //TODO: react on checkbox changes without uploading a new video
        //TODO: make it work after browsertab refresh - does work on firefox...

        videoElement = document.getElementById("videoSource");
        var mediaElement = ctx.createMediaElementSource(videoElement);
        mediaElement.connect(lowpass);
        
        lowpass.frequency.value = ConstantBooleans.checkBoxBooleans.lowpassChecked ? 4000 : 24000;
        lowpass.connect(bandpass);

        bandpass.frequency.value = 12000;
        bandpass.Q.value = ConstantBooleans.checkBoxBooleans.bandpassChecked ? 3000 : 0;
        bandpass.connect(highpass);
        
        highpass.frequency.value = ConstantBooleans.checkBoxBooleans.highpassChecked ? 18000 : 0;
        highpass.connect(lowshelf);
        
        lowshelf.gain.value = 20;
        lowshelf.frequency.value = ConstantBooleans.checkBoxBooleans.lowshelfChecked ? 6000 : 0;
        lowshelf.connect(highshelf);
        
        highshelf.gain.value = 20;
        highshelf.frequency.value = ConstantBooleans.checkBoxBooleans.highshelfChecked ? 18000 : 24000;
        highshelf.connect(peaking);
        
        peaking.gain.value = 20;
        peaking.frequency.value = 12000;
        peaking.Q.value = ConstantBooleans.checkBoxBooleans.peakingChecked ? 3000 : 0;
        peaking.connect(notch);
        
        notch.frequency.value = 12000;
        notch.Q.value = ConstantBooleans.checkBoxBooleans.notchChecked ? 3000 : 24000;
        notch.connect(ctx.destination);
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
            <ApplyFilters handleFilters={applyFilters} disableButton={uploadedVideo == null} />
            <div />
            <button disabled={!filtered} onClick={downloadVideo}>Download</button>
            <button onClick={loadNewVideo}>Upload new video</button>
        </div>
    )
}
