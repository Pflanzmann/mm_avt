import React, {useEffect, useState} from "react";
import {convertFilters} from "./Converter";

const ApplyFilters = props => {    
    const applyFilters = () => {
        const request = convertFilters()
        props.handleFilters(request)
    }

    return (
        <div>
            <button onClick={applyFilters}>Apply Filter</button>
        </div>
    );
}
export default ApplyFilters
