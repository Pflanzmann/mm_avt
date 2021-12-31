import React, { Component } from 'react';

export default () => {
    const filterBars = [
        {
            filterId: 0,
            filters: [
                {
                    index: 0,
                    isDragging: false,
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
                    index: 1,
                    isDragging: false,
                    filterId: 1,
                    startTime: 10,
                    duration: 20,
                },
                {
                    index: 2,
                    isDragging: false,
                    filterId: 1,
                    startTime: 150,
                    duration: 70,
                }
            ]
        },
    ];

    return (
        <div className="Timeline" >
            <h2>Timeline Title</h2>
            {
                filterBars.map(filterBar => (
                    <div className="filterBar" style={{
                        border: "1px solid black",
                        tablelayout: "fixed",
                        width: "1000px",
                        position: "relative",
                        height: "20px"
                    }}>
                        {filterBar.filters.map(filter => (
                            <div className="filterBox" id={filter.index} style={{
                                position: "absolute",
                                cursor: "move",
                                display: "flex",
                                boxSizing: "border-box",
                                tableLayout: "fixed",
                                backgroundColor: 'green',
                                width: filter.duration * 5 + 'px',
                                left: filter.startTime,
                                height: "20px",

                                draggable: 'true',
                                border: "1px solid black",
                                overflow: "hidden",
                                resize: 'horizontal',
                                whiteSpace: "nowrap"
                            }}

                                onMouseDown={() => {
                                    filter.isDragging = true
                                }}

                                onMouseUp={() => {
                                    filter.isDragging = false
                                }}
                                onMouseMove={(e) => {
                                    if (filter.isDragging) {
                                        //console.log("startTime: " + filter.startTime)
                                        const currentClientX = e.clientX;
                                        const moveMouseX = currentClientX;
                                        filter.startTime = moveMouseX;
                                        document.getElementById(filter.index).style.left = filter.startTime - (filter.duration * 5 / 2) + "px";
                                        console.log("left: " + document.getElementById(filter.index))
                                    }
                                }}
                            >
                            </div>
                        ))}
                    </div>
                ))
            }
        </div >
    )
}