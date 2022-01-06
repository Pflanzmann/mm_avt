import React, {useEffect, useState} from "react";
import {filters} from "../helper/filters"
import {convertFilters} from "./Converter";

const ApplyFilters = props => {
    const [filtersToApply, setFiltersToApply] = useState()
    const [checkedState, setCheckedState] = useState(
        new Array(filters.length).fill(false)
    );

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        filters[position].isActive = updatedCheckedState[position];
        console.log(filters)
    }

    const applyFilters = () => {
        const request = convertFilters(filters)
        props.handleFilters(request)
    }

    return (
        <div>
            <button onClick={applyFilters}>Apply Filter</button>
        </div>
    );
}
export default ApplyFilters
