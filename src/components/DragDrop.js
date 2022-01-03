import React, { useState } from 'react';
import FilterImage from './FilterImage';
import { useDrop } from 'react-dnd';
import "../style/DragDrop.css";
import "../style/App.css";
import Timeline from "../timeline/Timeline.js";
import useTimeline from '../hooks/useTimeline';

//list of filterImage-Objects to map through and display later
//since each element needs same logik and hooks to be draggabel
// - separate ImageFilter.js to implement logic
//maybe don't hardcode ids? 
const FilterImageList = [
    {
        id: 0,  //to identify each draggable Filter/image
        url: "http://drive.google.com/uc?export=view&id=1ha3vxlvLagCtuglChNmSgoKaOHgtd1lO",
    },
    {
        id: 1,  //to identify each draggable Filter/image
        url: "http://drive.google.com/uc?export=view&id=1oLVvf0WXDVAZQSSh5vrWQHqCCa6NBui7",
    },
    {
        id: 2,  //to identify each draggable Filter/image
        url: "http://drive.google.com/uc?export=view&id=1w-3bogLG14MreH_VD4WTgRFX6PdSpfex",
    },
    {
        id: 3,  //to identify each draggable Filter/image
        url: "http://drive.google.com/uc?export=view&id=1aFUyPH1rf5DUwpbPF1qatRkp8lVU6gp4",
    },
]

function DragDrop() {

    return (
        <div >
            <div className="filter-images">
                {FilterImageList.map((filterImage) => {
                    return (
                        <FilterImage url={filterImage.url} id={filterImage.id} />
                    )
                })
                }
            </div>
        </div>
    );
}

export default DragDrop;