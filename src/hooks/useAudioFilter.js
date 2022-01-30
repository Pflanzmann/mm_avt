import { useState, useEffect } from "react";

/**
 * Audiofilter hook that gets called after a checkbox was ticked.
 * Instantiates each filter and checks afterwards, which value each filter should get, based on the checkboxes.
 */

var videoElement = undefined;
var mediaElement = undefined;
var ctx = undefined;
var lowpass = undefined;
var bandpass = undefined;
var highpass = undefined;
var lowshelf = undefined;
var highshelf = undefined;
var peaking = undefined;
var notch = undefined;

var startup = false;

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
        if (!startup) {
            startup = true;
            return
        }

        videoElement = document.getElementById("videoSource");
        if (videoElement != undefined && mediaElement == undefined) {
            ctx = new AudioContext();
            lowpass = ctx.createBiquadFilter();
            bandpass = ctx.createBiquadFilter();
            highpass = ctx.createBiquadFilter();
            lowshelf = ctx.createBiquadFilter();
            highshelf = ctx.createBiquadFilter();
            peaking = ctx.createBiquadFilter();
            notch = ctx.createBiquadFilter();

            mediaElement = ctx.createMediaElementSource(videoElement);

            lowpass.type = 'lowpass';
            bandpass.type = 'bandpass';
            highpass.type = 'highpass';
            lowshelf.type = 'lowshelf';
            highshelf.type = 'highshelf';
            peaking.type = 'peaking';
            notch.type = 'notch';

            mediaElement.connect(lowpass);
            lowpass.connect(bandpass);
            bandpass.connect(highpass);
            highpass.connect(lowshelf);
            lowshelf.connect(highshelf);
            highshelf.connect(peaking);
            peaking.connect(notch);
            notch.connect(ctx.destination);
        }


        lowpass.frequency.value = audioFilterStates.lowpassChecked ? 4000 : 24000;

        bandpass.frequency.value = 12000;
        bandpass.Q.value = audioFilterStates.bandpassChecked ? 0.5 : 0;

        highpass.frequency.value = audioFilterStates.highpassChecked ? 18000 : 0;

        lowshelf.gain.value = 20;
        lowshelf.frequency.value = audioFilterStates.lowshelfChecked ? 6000 : 0;

        highshelf.gain.value = 20;
        highshelf.frequency.value = audioFilterStates.highshelfChecked ? 18000 : 24000;

        peaking.gain.value = 20;
        peaking.frequency.value = 12000;
        peaking.Q.value = audioFilterStates.peakingChecked ? 0.5 : 0;

        notch.frequency.value = 12000;
        notch.Q.value = audioFilterStates.notchChecked ? 0.5 : 1;
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
