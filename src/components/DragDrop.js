import React, { useState } from 'react';
import FilterImage from './FilterImage';
import { useDrop } from 'react-dnd';
import "../style/DragDrop.css";

//list of filterImage-Objects to map through and display later
//since each element needs same logik and hooks to be draggabel
// - separate ImageFilter.js to implement logic
//maybe don't hardcode ids? 
const FilterImageList = [
    {
        id: 1,  //to identify each draggable Filter/image
        url: "https://upload.wikimedia.org/wikipedia/commons/2/28/Sillitoe-black-white.gif",
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
            <div className="Filters">
                {FilterImageList.map((filterImage) => {
                    return (
                        <FilterImage url={filterImage.url} id={filterImage.id} />
                    )
                })
                }
            </div>
            <div
                className="DropArea" ref={drop}>
                {dropArea.map((filterImage) => {
                    return (
                        <FilterImage url={filterImage.url} id={filterImage.id} />
                    )
                })}

            </div>
        </>
    );
}

export default DragDrop;