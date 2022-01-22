import React from "react";
import {convertFilters} from "./Converter";

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
