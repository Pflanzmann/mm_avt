import "../style/Timeline.css";
import "../style/App.css";

import React from 'react';
import useTimeline from '../hooks/useTimeline';
import { useDrop } from 'react-dnd';
import FilterImage from './FilterImage';

import * as Constants from "../constants/FilterImageList.js";

export default () => {
    const {
        filterState,
        setFilterState,
        draggingState,
        setDraggingState,
        setFilterBoxPosition,
        dropNewFilter,
        deleteFilter,
    } = useTimeline();

    const [dropArea, setDropArea] = React.useState([]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addFilterToDropArea(item.id),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    const addFilterToDropArea = (id) => {
        dropNewFilter(id)
    };

    return (
        <div className="timeline" id="timeline" ref={drop}
            onMouseUp={() => {
                setDraggingState({
                    resizing: false,
                    draggingFilterBarIndex: -1,
                    draggingFilterIndex: -1,
                })
            }}
            onMouseLeave={() => {
                setDraggingState({
                    resizing: false,
                    draggingFilterBarIndex: -1,
                    draggingFilterIndex: -1,
                })
            }}
            onMouseMove={(e) => {
                if (draggingState.draggingFilterIndex === -1) {
                    return;
                }

                var bounds = document.getElementById("filterBar").getBoundingClientRect();
                var moveMouseX = e.clientX - bounds.left;

                var filterBoxGrab = moveMouseX;

                setFilterBoxPosition(filterBoxGrab)
            }}
        >
            {
                filterState.filterBars.map((filterBar, barIndex) => (
                    <div className="filterLine">
                        <div className="filterTitleBox">
                            <img className="timelineTitlePicture" src={Constants.FilterImageList[filterBar.filterId].url} />
                        </div>
                        <div className="filterBar" id="filterBar">
                            {
                                filterBar.filters.map((filter, filterIndex) => (
                                    <div className="filterBox" style={{
                                        width: filter.duration + 'px',
                                        marginLeft: filter.startTime,
                                    }}
                                        onDoubleClick={() => {
                                            deleteFilter(barIndex, filterIndex);
                                        }}
                                        onMouseDown={(e) => {
                                            var bounds = e.target.getBoundingClientRect();
                                            var moveMouseX = e.clientX;

                                            setDraggingState({
                                                resizing: Math.abs(bounds.right - moveMouseX) < 10,
                                                draggingFilterBarIndex: barIndex,
                                                draggingFilterIndex: filterIndex,
                                            })
                                        }}
                                    >
                                    </div>
                                ))}

                        </div>
                    </div>
                ))
            }
        </div >
    );
}