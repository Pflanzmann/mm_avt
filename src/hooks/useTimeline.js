import { useState, useEffect } from "react";

const useTimeline = () => {
    const [filterState, setFilterState] = useState({
        filterBars: [
            {
                filterId: 0,
                filters: [
                    {
                        filterId: 0,
                        startTime: 0,
                        duration: 10,
                    }
                ]
            },
            {
                filterId: 1,
                filters: [
                    {
                        filterId: 1,
                        startTime: 10,
                        duration: 20,
                    },
                    {
                        filterId: 1,
                        startTime: 150,
                        duration: 70,
                    }
                ]
            },
        ],
    });

    const [draggingState, setDraggingState] = useState({
        draggingFilterBarIndex: -1,
        draggingFilterIndex: -1,
    })

    const setFilterBoxPosition = (position) => {
        if (draggingState.draggingFilterBarIndex == -1 && draggingState.draggingFilterIndex == -1)
            return;

        if (filterState.filterBars[draggingState.draggingFilterBarIndex].filters
        [draggingState.draggingFilterBarIndex] == undefined)
            return;

        filterState.filterBars[draggingState.draggingFilterBarIndex].filters
        [draggingState.draggingFilterIndex].startTime = position;

        console.log("min position: " + Math.min(
            position,
            (document.getElementById("timeline").getBoundingClientRect().right - filterState.filterBars[draggingState.draggingFilterBarIndex].filters
            [draggingState.draggingFilterIndex].duration)
        ))

        console.log("update position of filter: " + position)


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
    };
}

export default useTimeline;