import "../style/Timeline.css";
import "../style/App.css";

import React from 'react';
import useTimeline from '../hooks/useTimeline';
import { useDrop } from 'react-dnd';

import * as Constants from "../constants/FilterImageList.js";
import * as Colors from "../constants/FilterBoxColors.js";

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

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item, monitor) => {
            addFilterToDropArea(item.id, monitor.getClientOffset().x)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver,
        }),
    }));

    const addFilterToDropArea = (id, positionX) => {
        dropNewFilter(id, positionX)
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
                <div className="filterLine">
                    <div className="filterTitleBox">
                    </div>
                    <div className="scale">
                        {

                        }
                    </div>
                </div>
            }
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
                                        backgroundColor: Colors.FilterBoxColors[barIndex % Colors.FilterBoxColors.length].value,
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
                                        {
                                            <div className="filterBoxResizeArea">
                                                <div className="filterBoxMoveArea">
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))}

                        </div>
                    </div>
                ))
            }
        </div >
    );
}