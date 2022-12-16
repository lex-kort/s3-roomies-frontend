import React from "react";
import './FilterMenu.css';

function FilterMenu( {applyFilter} ){
    return (
        <form className="form-filters">
            <div className="mb-3">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">Default Checkbox</label>
            </div>
            <button type="button" onClick={applyFilter}>Apply filter</button>
        </form>
    )
}

export default FilterMenu;