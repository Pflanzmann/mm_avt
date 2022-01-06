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
        setFiltersToApply(filters)
        const request = convertFilters(filters)
        props.handleFilters(request)
    }

    return (
        <div>
            <h3>Select Filters</h3>
            <ul>
                {filters.map(({type}, index) => {
                    return (
                        <li key={index}>
                            <div>
                                <div className="left-section">
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={type}
                                        value={type}
                                        checked={checkedState[index]}
                                        onChange={() => handleOnChange(index)}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{type}</label>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <button onClick={applyFilters}>Apply Filter</button>
        </div>
    );
}
export default ApplyFilters
