import React, { useState } from 'react';
import FilterImage from './FilterImage';
import { useDrop } from 'react-dnd';
import "../style/DragDrop.css";
import "../style/App.css";
import * as Constants from "../Constants/FilterImageList.js";

function DragDrop() {
    return (
        <div >
            <div className="filter-images">
                {Constants.FilterImageList.map((filterImage) => {
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