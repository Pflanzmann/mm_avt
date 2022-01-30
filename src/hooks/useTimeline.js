import { useEffect, useState } from "react";
import * as Constants from "../constants/FilterBars.js";

var oldDraggingState = {
    resizing: false,
    draggingFilterBarIndex: -1,
    draggingFilterIndex: -1,
}

const useTimeline = () => {
    /**
     * The state to represent the shown FilterBars and FilterBoxes 
     */
    const [filterState, setFilterState] = useState({
        filterBars: Constants.filterBars
    });

    /**
     * Effect to store the FilterBar state globally every time it is changed
     * This helps accessing the state from outside the react component 
     */
    useEffect(() => {
        Constants.setFilterBars(filterState.filterBars);
    })

    /**
     * The state to represent which FilterBox is dragged or resized
     */
    const [draggingState, setDraggingState] = useState({
        resizing: false,
        draggingFilterBarIndex: -1,
        draggingFilterIndex: -1,
    })

    /**
     * The state to represent the scale 
     */
    const [scaleState, setScaleState] = useState({
        duration: 0
    })

    /**
     * The state to represent the progress indicator of the shown video inside of the scale
     */
    const [progressIndicator, setProgressIndicator] = useState({
        progress: 0,
    })

    /**
     * An effect that gets only triggered at the start of the app
     * It starts an intervall that checks periodically for changes in the video [video.duration, video.currentTime]
     * and updates the states accordingly
     */
    useEffect(() => {
        const timerId = setInterval(() => {
            const video = document.getElementById("videoSource");
            if (video != null) {
                const videoDuration = document.getElementById("videoSource").duration;
                if (scaleState.duration != videoDuration) {
                    setScaleState({
                        duration: Math.round(videoDuration)
                    })
                }

                if (videoDuration > 0) {
                    const lastScale = document.getElementById("lastScaleLine");
                    if (lastScale != null) {
                        const relativeProgress = 100 / Math.round(videoDuration) * video.currentTime;
                        const scaleLenght = lastScale.getBoundingClientRect().right - document.getElementById("scale").getBoundingClientRect().left
                        const progressInPx = scaleLenght / 100 * relativeProgress

                        setProgressIndicator({
                            progress: progressInPx,
                        })
                    }
                }
            }
        }, 100)

        return (function cleanup() {
            clearInterval(timerId)
        })
    }, [])


    /**
     * An effect that gets only triggered when the draggingState changes
     * It calculates the positions of the FilterBoxes to determin if it can merge some filters together 
     */
    useEffect(() => {
        if (oldDraggingState.draggingFilterIndex > -1 && draggingState.draggingFilterIndex == -1) {
            const setFilter = filterState.filterBars[oldDraggingState.draggingFilterBarIndex].filters[oldDraggingState.draggingFilterIndex];

            var filtersLenght = filterState.filterBars[oldDraggingState.draggingFilterBarIndex].filters.length;

            var filterStart = setFilter.startTime;
            var filterDuration = setFilter.duration;

            //iterate over all filter to check for filters infront of the current FilterBox to merge into
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

            //iterate over all filter to check for filters behind the current FilterBox to merge into
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


    /**
     * A function to set the position or duration of a FilterBox 
     * @param position the position of the cursor to adjust the position or duration accordingly
     */
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


    /**
     * A function to receive new filters by dragging and dropping them in
     * It sorts the filter into the proper FilterBar or creates a new one
     * It sets the start position 
     * @param filterId is the id of the filter that has to get added
     * @param globalPosition the position of the cursor to adjust the position or duration accordingly
     */
    const dropNewFilter = (filterId, globalPosition) => {
        var addedFilter = false;
        var relativePosition = globalPosition - document.getElementById("scale").getBoundingClientRect().left;

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

    /**
     * A function to delete filters 
     * @param barIndex is the index of the bar of the filter that should get deleted
     * @param filterIndex is the index of the filter inside the bar that should get deleted
     */
    const deleteFilter = (barIndex, filterIndex) => {
        filterState.filterBars[barIndex].filters.splice(filterIndex, 1);


        if (filterState.filterBars[barIndex].filters.length === 0) {
            filterState.filterBars.splice(barIndex, 1);
        }

        updateFilterBars();
    }

    /**
     * A function to update the filterBars because react did not allow to call "setFilterState" too often 
     */
    const updateFilterBars = () => {
        setFilterState({
            ...filterState,
        })
    }

    /**
     * A function to set the video progress to a certain time depending on the position clicked on the scale
     * @param globalPosition global position of the cursor
     */
    const clickInVideoProgress = (globalPosition) => {
        const lastScale = document.getElementById("lastScaleLine");
        const video = document.getElementById("videoSource");
        if (lastScale != null && video != null && video.duration > 0) {
            const scaleLenght = lastScale.getBoundingClientRect().right - document.getElementById("scale").getBoundingClientRect().left
            const offsetPosition = globalPosition - document.getElementById("scale").getBoundingClientRect().left

            const relativeProgress = 100 / scaleLenght * offsetPosition
            const newVideoProgress = video.duration / 100 * relativeProgress

            const videoSource = document.getElementById("videoSource");
            if (videoSource != undefined) {
                videoSource.currentTime = newVideoProgress;
            }
        }
    }

    return {
        filterState,
        setFilterState,
        draggingState,
        setDraggingState,
        scaleState,
        progressIndicator,
        setFilterBoxPosition,
        dropNewFilter,
        deleteFilter,
        clickInVideoProgress,
    };
}

export default useTimeline;