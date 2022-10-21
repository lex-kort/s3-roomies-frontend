import React from "react";
import './FilterMenu.css';

function FilterMenu( {applyFilter} ){
    return (
        <div className="sidebar">
            <button onClick={applyFilter}>Apply filter</button>
        </div>
    )
}

export default FilterMenu;