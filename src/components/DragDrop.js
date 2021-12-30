import React, { useState } from 'react';
import FilterImage from './FilterImage';
import { useDrop } from 'react-dnd';
import "../style/DragDrop.css";

import Timeline from "timeline-editor-react";

//list of filterImage-Objects to map through and display later
//since each element needs same logik and hooks to be draggabel
// - separate ImageFilter.js to implement logic
//maybe don't hardcode ids? 
const FilterImageList = [
    {
        id: 1,  //to identify each draggable Filter/image
        url: "http://drive.google.com/uc?export=view&id=1ha3vxlvLagCtuglChNmSgoKaOHgtd1lO",
    },
    {
        id: 2,  //to identify each draggable Filter/image
        url: "https://www.4freephotos.com/medium/2015/Blurry-city-lights-7318.jpg",
    },
    {
        id: 3,  //to identify each draggable Filter/image
        url: "http://chhsarts.weebly.com/uploads/2/6/0/4/26049834/barack-obama-hope-a-g-8075457-0.jpg?250",
    },
]

function DragDrop() {

    //list of FilterImages that are dropped in dropArea
    const [dropArea, setDropArea] = useState([]);

    //[if FilterImage is over dropArea, reference to dropArea]
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addFilterToDropArea(item.id),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    const addFilterToDropArea = (id) => {
        const currentFilterImageList = FilterImageList.filter((filterImage) => id === filterImage.id);
        setDropArea((dropArea) => [...dropArea, currentFilterImageList[0]]);

        //replace FilterImage
        //setDropArea([currentFilterImageList[0]]);
    };

    return (
        <>

            <div >
               
                <div className="filter-images">
                    {FilterImageList.map((filterImage) => {
                        return (
                            <FilterImage url={filterImage.url} id={filterImage.id} />
                        )
                    })
                    }
                </div>

                <div
                    className="drop-area" ref={drop}>
                        <p>Droparea</p>
                    {dropArea.map((filterImage) => {
                        // return (
                        //     <FilterImage url={filterImage.url} id={filterImage.id} />
                        // )
                        console.log(filterImage.id)
                    })}
                </div>

                {/* <Timeline layers={layers} frames={frames} onUpdateFrames={onUpdateFrames} /> */}

            </div>
        </>
    );
}

var layers = [
    {
        id: "3d1df1b4-4d9d-45a4-bf14-cb580ee74675",
        name: "Left"
    },
    {
        id: "7d8c4210-0cfa-4a10-8b21-01e6601e00bf",
        name: "Top"
    },
    {
        id: "65079f30-47a8-4469-833e-4f0eea04d233",
        name: "Bottom"
    }
];
var frames = {
    "3d1df1b4-4d9d-45a4-bf14-cb580ee74675": [{
        name: "Hello.png",
        second: 0,
        duration: 70
    },
    {
        name: "Welcome.png",
        second: 130,
        duration: 200
    }],
    "7d8c4210-0cfa-4a10-8b21-01e6601e00bf": [{
        name: "Goodbye.png",
        second: 10,
        duration: 150
    }],
    "65079f30-47a8-4469-833e-4f0eea04d233": []
};

function onUpdateFrames(frames) {
    //TODO: deal with frames
}

export default DragDrop;