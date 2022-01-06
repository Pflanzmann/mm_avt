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
                        duration: 50,
                    }
                ]
            },
            {
                filterId: 1,
                filters: [
                    {
                        filterId: 1,
                        startTime: 10,
                        duration: 40,
                    },
                    {
                        filterId: 1,
                        startTime: 150,
                        duration: 200,
                    }
                ]
            },
        ],
    });

    const [draggingState, setDraggingState] = useState({
        resizing: false,
        draggingFilterBarIndex: -1,
        draggingFilterIndex: -1,
    })

    const setFilterBoxPosition = (position) => {
        if (draggingState.draggingFilterBarIndex == -1 && draggingState.draggingFilterIndex == -1)
            return;


        console.log("isResizing: " + draggingState.resizing)
        if (draggingState.resizing) {
            console.log("isResizing")
            filterState.filterBars[draggingState.draggingFilterBarIndex].filters
            [draggingState.draggingFilterIndex].duration = Math.abs(position - filterState.filterBars[draggingState.draggingFilterBarIndex].filters
            [draggingState.draggingFilterIndex].startTime)

            updateFilterBars();
            return;
        }

        var newPosition = Math.min(
            position - filterState.filterBars[draggingState.draggingFilterBarIndex].filters
            [draggingState.draggingFilterIndex].duration / 2,
            (document.getElementById("timeline").getBoundingClientRect().right - document.getElementById("filterBar").getBoundingClientRect().left - filterState.filterBars[draggingState.draggingFilterBarIndex].filters
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

    const convertFilters = () => {
        let request = []
        filterState.filterBars.map(filterBar => {
            filterBar.filters.map(filter => {
                let startTime = filter.startTime
                let endTime = filter.endTime
                switch (filter.filterId) {
                    case 0:
                        request.push(`unsharp=7:7:-2:7:7:-2:enable=\'between(t,${startTime},${endTime})\'`)
                        break;
                    case 1:
                        request.push(`hue=s=0:enable=\'between(t,${startTime},${endTime})\'`)
                        break;
                    case 2:
                        request.push(`rgbashift=rh=15:bv=15:gh=-15:enable=\'between(t,${startTime},${endTime})\'`)
                        break;
                    case 3:
                        request.push(`geq=r='255-r(X,Y)':g='255-g(X,Y)':b='255-b(X,Y)':enable=\'between(t,${startTime},${endTime})\'`)
                        break;
                    case 4:
                        request.push(`noise=alls=100:allf=t+u:enable=\'between(t,${startTime},${endTime})\'`)
                        break;
                    case 5:
                        //can also make cold filter with colortemperature=9000:pl=1
                        request.push(`colortemperature=3000:pl=1:enable=\'between(t,${startTime},${endTime})\'`)
                        break;
                    default:
                        break;
                }
            })
        })

        console.log(request.join(","))
        return request.join(",")
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