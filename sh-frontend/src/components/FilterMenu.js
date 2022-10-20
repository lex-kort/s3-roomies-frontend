import React from "react";
import './FilterMenu.css';

function FilterMenu( {applyFilter} ){
    return (
        <div class="sidebar">
            <button onClick={applyFilter}>Apply filter</button>
        </div>
    )
}

export default FilterMenu;