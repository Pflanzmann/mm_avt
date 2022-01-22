import { useState, useEffect } from "react";
import * as Constants from "../constants/checkBoxBooleans.js"

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
    })

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
