import React from 'react';
import FilterImage from './FilterImage';

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

function DragDrop(props) {
    return (
        <>
            <div className="Filters">
                {FilterImageList.map((filterImage) => {
                    return(
                    <FilterImage url={filterImage.url} id={filterImage.id} />
                   )
                    })
                }
            </div>
            <div className="DropArea"></div>
        </>
    );
}

export default DragDrop;