import React, { Component } from 'react';

export default class Timeline extends Component {
    render() {
        const timelineScale = {
            duration: 360_000,          // gesamt dauer
            currentProgress: 69         // progress in %
        }

        const filterBars = [
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
                        startTime: 50,
                        duration: 70,
                    }
                ]
            },
        ]

        return (
            <div className="Timeline" >
                <h2>Timeline Title</h2>
                {
                    filterBars.map(filterBar => (
                        <div className="filterBar">
                            {filterBar.filters.map(filter => (
                                <div>
                                    <b>filterStart= {filter.startTime} | duration= {filter.duration}; </b>
                                </div>
                            ))}
                        </div>
                    ))}
            </div>
        )
    }
}