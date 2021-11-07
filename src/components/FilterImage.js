import React from 'react';
import { useDrag } from "react-dnd";

//implement all the logic needed to make Images draggable
function FilterImage({ id, url }) {

    //[if element is being dragged, reference to element that is supposed to be draggable]
    //returns object
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image", //identifier in case different things should be dragged different ways
        item: { id: id }, //for later: so that only filters with same id can be dropped in same area

        //define different states&props whenever useDrag-Hook is called
        //monitor.  -> has lots of different functions
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    }));


    return <img
        ref={drag}
        src={url}
        width="150px"
        height="250px"
        style={{ border: isDragging ? "10px solid pink" : "0px" }} />;
}

export default FilterImage;