import "../style/Timeline.css";
import "../style/App.css";

import React from 'react';
import useTimeline from '../hooks/useTimeline';
import { useDrop } from 'react-dnd';

export default () => {
    const {
        filterState,
        setFilterState,
        draggingState,
        setDraggingState,
        setFilterBoxPosition,
        dropNewFilter,
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
                    draggingFilterBarIndex: -1,
                    draggingFilterIndex: -1,
                })
            }}
            onMouseMove={(e) => {
                if (filterState.draggingFilterIndex != -1) {
                    var bounds = document.getElementById("timeline").getBoundingClientRect();
                    var moveMouseX = e.clientX - bounds.left;
                    
                    var filterBoxGrab = moveMouseX;

                    setFilterBoxPosition(filterBoxGrab)
                }
            }}
        >
            {
                filterState.filterBars.map((filterBar, barIndex) => (
                    <div className="filterBar">
                        {
                            filterBar.filters.map((filter, filterIndex) => (
                                <div className="filterBox" style={{
                                    width: filter.duration * 5 + 'px',
                                    marginLeft: filter.startTime,
                                }}
                                    onMouseDown={() => {
                                        setDraggingState({
                                            draggingFilterBarIndex: barIndex,
                                            draggingFilterIndex: filterIndex,
                                        })
                                    }}
                                >
                                </div>
                            ))}
                    </div>
                ))
            }
        </div >
    );
}