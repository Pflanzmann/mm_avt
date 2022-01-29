import React from "react";
import {convertFilters} from "./Converter";

/**
 * Helper for video filtering
 * @param props carries handleFilters prop to send a converted string of filters that should
 * be applied to the video to VideoPlayer.js
 * @returns {JSX.Element} button for applying filters
 */
const ApplyFilters = props => {

    const applyFilters = () => {
        const request = convertFilters()
        props.handleFilters(request)
    }

    return (
        <div>
            <button disabled={props.disableButton} classname="btn" onClick={applyFilters}>Apply Filter</button>
        </div>
    );
}
export default ApplyFilters
