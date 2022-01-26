import { useEffect, useState } from "react";
import * as Constants from "../constants/FilterBars.js";

var oldDraggingState = {
    resizing: false,
    draggingFilterBarIndex: -1,
    draggingFilterIndex: -1,
}

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
    
    const [scaleState, setScaleState] = useState({
        duration: 60
    })

    useEffect(() => {
        if (oldDraggingState.draggingFilterIndex > -1 && draggingState.draggingFilterIndex == -1) {
            const setFilter = filterState.filterBars[oldDraggingState.draggingFilterBarIndex].filters[oldDraggingState.draggingFilterIndex];

            var filtersLenght = filterState.filterBars[oldDraggingState.draggingFilterBarIndex].filters.length;

            var filterStart = setFilter.startTime;
            var filterDuration = setFilter.duration;

            for (let filterIndex = filtersLenght - 1; filterIndex > -1; filterIndex--) {
                if (filterState.filterBars[oldDraggingState.draggingFilterBarIndex].filters[filterIndex] === setFilter) {
                    continue;
                }

                const otherFilterStart = filterState.filterBars[oldDraggingState.draggingFilterBarIndex].filters[filterIndex].startTime;
                const otherFilterDuration = filterState.filterBars[oldDraggingState.draggingFilterBarIndex].filters[filterIndex].duration;

                if (otherFilterStart > filterStart && otherFilterStart < filterStart + filterDuration) {
                    const newDuration = filterDuration + ((otherFilterStart + otherFilterDuration) - (filterStart + filterDuration))

                    setFilter.duration = newDuration;
                    filterState.filterBars[oldDraggingState.draggingFilterBarIndex].filters.splice(filterIndex, 1);

                    updateFilterBars();
                    break;
                }
            }

            filtersLenght = filterState.filterBars[oldDraggingState.draggingFilterBarIndex].filters.length;
            filterStart = setFilter.startTime;
            filterDuration = setFilter.duration;

            for (let filterIndex = 0; filterIndex < filtersLenght; filterIndex++) {
                if (filterState.filterBars[oldDraggingState.draggingFilterBarIndex].filters[filterIndex] === setFilter) {
                    continue;
                }

                const otherFilterStart = filterState.filterBars[oldDraggingState.draggingFilterBarIndex].filters[filterIndex].startTime;
                const otherFilterDuration = filterState.filterBars[oldDraggingState.draggingFilterBarIndex].filters[filterIndex].duration;

                if (otherFilterStart + otherFilterDuration > filterStart && otherFilterStart < filterStart) {
                    const newDuration = filterDuration + (filterStart - otherFilterStart)

                    setFilter.startTime = otherFilterStart;
                    setFilter.duration = newDuration;
                    filterState.filterBars[oldDraggingState.draggingFilterBarIndex].filters.splice(filterIndex, 1);

                    updateFilterBars();
                    break;
                }
            }
        }

        oldDraggingState = draggingState;
    }, [draggingState])

    const setFilterBoxPosition = (position) => {
        if (draggingState.draggingFilterBarIndex == -1 && draggingState.draggingFilterIndex == -1) {
            return;
        }

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

    const dropNewFilter = (filterId, globalPosition) => {
        var addedFilter = false;
        var relativePosition = globalPosition - document.getElementById("filterBar").getBoundingClientRect().left;

        filterState.filterBars.forEach(filterBar => {
            if (filterBar.filterId == filterId) {
                filterBar.filters.push(
                    {
                        filterId: filterId,
                        startTime: relativePosition,
                        duration: 50,
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
                        startTime: relativePosition,
                        duration: 50,
                    }
                ]
            })

        updateFilterBars();
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
        scaleState,
        setFilterBoxPosition,
        dropNewFilter,
        deleteFilter,
    };
}

export default useTimeline;