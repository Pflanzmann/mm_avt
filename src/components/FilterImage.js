import React from 'react';
import { useDrag } from "react-dnd";
import "../style/DragDrop.css";

/**
 * implements all the logic needed for images to be draggable
 * each item has an ID, so that later only filters with the same ID can be dropped in the same area
 * isDragging: if the element is being dragged
 * drag: reference to element that is supposed to be draggable
 * collect: to define different states and props, whenever useDrag-Hook is being called
 * @param id: the ID of the draggable image, url: the source-url, where the image comes from
 * @returns a draggable object
 */
function FilterImage({ id, url }) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image", 
        item: { id: id }, 

        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        })
    }));


    return <img
        ref={drag}
        src={url}
        style={{ border: isDragging ? "5px dotted #ef476f" : "0px" }} />;
}

export default FilterImage;
