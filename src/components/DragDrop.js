import React, { useState } from 'react';
import FilterImage from '../components/FilterImage';
import "../style/DragDrop.css";
import * as Constants from "../constants/FilterImageList.js";

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
