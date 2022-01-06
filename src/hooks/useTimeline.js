import { useState, useEffect } from "react";
import * as Constants from "../constants/FilterBars.js"

const useTimeline = () => {
    const [filterState, setFilterState] = useState({
        filterBars: Constants.filterBars
    });

    useEffect(() => {
        Constants.setFilterBars(filterState.filterBars);
    })

    const [draggingState, setDraggingState] = useState({
        resizing: false,
        draggingFilterBarIndex: -1,
        draggingFilterIndex: -1,
    })

    const setFilterBoxPosition = (position) => {
        if (draggingState.draggingFilterBarIndex == -1 && draggingState.draggingFilterIndex == -1)
            return;

        if (draggingState.resizing) {
            filterState.filterBars[draggingState.draggingFilterBarIndex].filters
            [draggingState.draggingFilterIndex].duration = Math.abs(position - filterState.filterBars[draggingState.draggingFilterBarIndex].filters
            [draggingState.draggingFilterIndex].startTime)

            updateFilterBars();
            return;
        }

        var newPosition = Math.min(
            position - filterState.filterBars[draggingState.draggingFilterBarIndex].filters
            [draggingState.draggingFilterIndex].duration / 2,
            (document.getElementById("filterBar").getBoundingClientRect().right - document.getElementById("filterBar").getBoundingClientRect().left - filterState.filterBars[draggingState.draggingFilterBarIndex].filters
            [draggingState.draggingFilterIndex].duration)
        );

        newPosition = Math.max(0, newPosition);

        filterState.filterBars[draggingState.draggingFilterBarIndex].filters
        [draggingState.draggingFilterIndex].startTime = newPosition;

        updateFilterBars();
    };

    const dropNewFilter = (filterId) => {
        console.log("update drop: " + filterId)
        var addedFilter = false;

        filterState.filterBars.forEach(filterBar => {
            if (filterBar.filterId == filterId) {
                filterBar.filters.push(
                    {
                        filterId: filterId,
                        startTime: 10,
                        duration: 20,
                    })
                addedFilter = true;
            }
        });

        if (!addedFilter)
            filterState.filterBars.push({
                filterId: filterId,
                filters: [
                    {
                        filterId: filterId,
                        startTime: 10,
                        duration: 20,
                    }
                ]
            })

        setFilterBoxPosition(-1)
    }

    const deleteFilter = (barIndex, filterIndex) => {
        filterState.filterBars[barIndex].filters.splice(filterIndex, 1);

        updateFilterBars();
    }

    const updateFilterBars = () => {
        setFilterState({
            ...filterState,
        })
    }

    return {
        filterState,
        setFilterState,
        draggingState,
        setDraggingState,
        setFilterBoxPosition,
        dropNewFilter,
        deleteFilter,
    };
}

export default useTimeline;