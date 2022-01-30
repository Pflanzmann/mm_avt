import { useState, useEffect } from "react";

/**
 * Audiofilter hook that gets called after a checkbox was ticked.
 * Instantiates each filter and checks afterwards, which value each filter should get, based on the checkboxes.
 */

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

    /**
     * Basic array setter.
     */
    const [audioFilterStates, setAudioFilterStates] = useState({
        lowpassChecked: false,
        bandpassChecked: false,
        highpassChecked: false,
        lowshelf: false,
        highshelf: false,
        peaking: false,
        notch: false,
    });

    /**
     * Sets only the lowpass value
     * @param {*} truelean Boolean value for the lowpass filter. Determines if the lowpass filter is enabled or not.
     */
    const setLowpass = (truelean) => {
        setAudioFilterStates({
            ...audioFilterStates,
            lowpassChecked: truelean,
        });
    }

    /**
     * Sets only the bandpass value
     * @param {*} truelean Boolean value for the bandpass filter. Determines if the bandpass filter is enabled or not.
     */
    const setBandpass = (truelean) => {
        setAudioFilterStates({
            ...audioFilterStates,
            bandpassChecked: truelean,
        });
    }

    /**
     * Sets only the highpass value
     * @param {*} truelean Boolean value for the highpass filter. Determines if the highpass filter is enabled or not.
     */
    const setHighpass = (truelean) => {
        setAudioFilterStates({
            ...audioFilterStates,
            highpassChecked: truelean,
        });
    }

    /**
     * Sets only the lowshelf value
     * @param {*} truelean Boolean value for the lowshelf filter. Determines if the lowshelf filter is enabled or not.
     */
    const setLowshelf = (truelean) => {
        setAudioFilterStates({
            ...audioFilterStates,
            lowshelfChecked: truelean,
        });
    }

    /**
     * Sets only the highshelf value
     * @param {*} truelean Boolean value for the highshelf filter. Determines if the highshelf filter is enabled or not.
     */
    const setHighshelf = (truelean) => {
        setAudioFilterStates({
            ...audioFilterStates,
            highshelfChecked: truelean,
        });
    }

    /**
     * Sets only the peaking value
     * @param {*} truelean Boolean value for the peaking filter. Determines if the peaking filter is enabled or not.
     */
    const setPeaking = (truelean) => {
        setAudioFilterStates({
            ...audioFilterStates,
            peakingChecked: truelean,
        });
    }

    /**
     * Sets only the notch value
     * @param {*} truelean Boolean value for the notch filter. Determines if the notch filter is enabled or not.
     */
    const setNotch = (truelean) => {
        setAudioFilterStates({
            ...audioFilterStates,
            notchChecked: truelean,
        });
    }

    useEffect(() => {
        applyFilter();
    })

    /**
     * Applies each audio filter based on the values of the checkboxes. If an audio filter was not checked, 
     * the frequency values are set to be out ouf the hearable range. 
     */
    function applyFilter() {
        videoElement = document.getElementById("videoSource");
        var mediaElement = ctx.createMediaElementSource(videoElement);
        mediaElement.connect(lowpass);

        lowpass.frequency.value = audioFilterStates.lowpassChecked ? 4000 : 24000;
        lowpass.connect(bandpass);

        bandpass.frequency.value = 12000;
        bandpass.Q.value = audioFilterStates.bandpassChecked ? 0.5 : 0;
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
        peaking.Q.value = audioFilterStates.peakingChecked ? 0.5 : 0;
        peaking.connect(notch);

        notch.frequency.value = 12000;
        notch.Q.value = audioFilterStates.notchChecked ? 0.5 : 1;
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
