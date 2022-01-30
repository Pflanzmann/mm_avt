import React from 'react';
import { useDrop } from 'react-dnd';
import * as Colors from "../constants/FilterBoxColors.js";
import * as Constants from "../constants/FilterImageList.js";
import useTimeline from '../hooks/useTimeline';
import "../style/Timeline.css";



export default () => {
    const {
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
    } = useTimeline();

    /**
     * To receive the drag and drop event and procress it 
     */
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


    /**
     * This defines the lines of the timeline scale and how many are required
     */
    const temp = [];
    for (let index = 0; index < scaleState.duration; index++) {
        if (index % 10 === 0) {
            temp.push(<dev className="scalePrimaryLine"></dev>)
        } else {
            if (index % 5 === 0) {
                temp.push(<div className="scaleSecondaryLine" ></div>)
            } else {
                temp.push(<div className="scaleMinorLine" ></div>)
            }
        };
    }

    /**
     * This defines the last line of the timeline to treat it differently
     */
    if (scaleState.duration > 0) {
        if (scaleState.duration % 10 === 0) {
            temp[scaleState.duration] = (<dev className="scalePrimaryLine" id="lastScaleLine" style={{
                marginRight: "0vw",
            }}></dev>)
        } else {
            if (scaleState.duration % 5 === 0) {
                temp[scaleState.duration] = (<div className="scaleSecondaryLine" id="lastScaleLine" style={{
                    marginRight: "0vw",
                }}></div>)
            } else {
                temp[scaleState.duration] = (<div className="scaleMinorLine" id="lastScaleLine" style={{
                    marginRight: "0vw",
                }}></div>)
            }
        };
    }

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
                /**
                * Defines the Scale  
                */
                <div className="filterScaleLine">
                    <div className="scale" id='scale' onClick={(e) => {
                        clickInVideoProgress(e.clientX)
                    }}>
                        {temp}
                        {
                            <div className='scaleProgressIndicator' style={{
                                marginLeft: progressIndicator.progress + "px",
                            }}></div>
                        }
                    </div>
                </div>
            }
            {
                /**
                 * Defines the TimelineBars with all the FilterBoxes 
                 */
                filterState.filterBars.map((filterBar, barIndex) => (
                    <div className="filterLine" style={{
                        //Sets the TimelineBar width to fit the with of the scale
                        width: temp.length * 2.2 + + 3 + "vw",
                    }}>
                        <div className="filterTitleBox">
                            <img className="timelineTitlePicture" src={Constants.FilterImageList[filterBar.filterId].url} />
                        </div>
                        <div className="filterBar" id="filterBar" >
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
