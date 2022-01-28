import { useState, useEffect } from "react";
import * as Constants from "../constants/checkBoxBooleans.js"

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

const useAudioFilter = () => {

	const [audioFilterStates, setAudioFilterStates] = useState({
        lowpassChecked: false,
        bandpassChecked: false,
        highpassChecked: false,
        lowshelf: false,
        highshelf: false,
        peaking: false,
        notch: false,
    });
    
    const setLowpass = (truelean) => {
        setAudioFilterStates({
            ...audioFilterStates,
            lowpassChecked: truelean,
        });
    }
    
    const setBandpass = (truelean) => {
        setAudioFilterStates({
            ...audioFilterStates,
            bandpassChecked: truelean,
        });
    }

    const setHighpass = (truelean) => {
        setAudioFilterStates({
            ...audioFilterStates,
            highpassChecked: truelean,
        });
    }

    const setLowshelf = (truelean) => {
        setAudioFilterStates({
            ...audioFilterStates,
            lowshelfChecked: truelean,
        });
    }
    
    const setHighshelf = (truelean) => {
        setAudioFilterStates({
            ...audioFilterStates,
            highshelfChecked: truelean,
        });
    }

    const setPeaking = (truelean) => {
        setAudioFilterStates({
            ...audioFilterStates,
            peakingChecked: truelean,
        });
    }
    
    const setNotch = (truelean) => {
        setAudioFilterStates({
            ...audioFilterStates,
            notchChecked: truelean,
        });
    }

    useEffect(() => {
        Constants.setCheckBoxBooleans(audioFilterStates);
        applyFilter();
    })

    function applyFilter(){
        videoElement = document.getElementById("videoSource");
        var mediaElement = ctx.createMediaElementSource(videoElement);
        mediaElement.connect(lowpass);

        lowpass.frequency.value = audioFilterStates.lowpassChecked ? 4000 : 24000;
        lowpass.connect(bandpass);

        bandpass.frequency.value = 12000;
        bandpass.Q.value = audioFilterStates.bandpassChecked ? 3000 : 0;
        bandpass.connect(highpass);
        
        highpass.frequency.value = audioFilterStates.highpassChecked ? 18000 : 0;
        highpass.connect(lowshelf);
        
        lowshelf.gain.value = 20;
        lowshelf.frequency.value = audioFilterStates.lowshelfChecked ? 6000 : 0;
        lowshelf.connect(highshelf);
        
        highshelf.gain.value = 20;
        highshelf.frequency.value = audioFilterStates.highshelfChecked ? 18000 : 24000;
        highshelf.connect(peaking);
        
        peaking.gain.value = 20;
        peaking.frequency.value = 12000;
        peaking.Q.value = audioFilterStates.peakingChecked ? 3000 : 0;
        peaking.connect(notch);
        
        notch.frequency.value = 12000;
        notch.Q.value = audioFilterStates.notchChecked ? 3000 : 24000;
        notch.connect(ctx.destination);
    }

    return {
        audioFilterStates,
        setAudioFilterStates,
        setLowpass,
        setBandpass,
        setHighpass,
        setLowshelf,
        setHighshelf,
        setPeaking,
        setNotch,
    }
};

export default useAudioFilter;
