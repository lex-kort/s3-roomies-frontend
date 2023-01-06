import React, { useState } from "react";
import './FilterMenu.css';

function FilterMenu( {applyFilter} ){
    const [ surfaceArea, setSurfaceArea ] = useState(0);
    const [ maxRent, setMaxRent ] = useState(0);
    const [ petsAllowed, setPetsAllowed ] = useState(true);
    const [ neighborhood, setNeighborhood ] = useState("");

    const changeSurfaceArea = (e) => {
        setSurfaceArea(e.target.value);
    }

    const changeMaxRent = (e) => {
        setMaxRent(e.target.value);
    }

    const changePetsAllowed = (e) => {
        setPetsAllowed(e.target.value);
    }

    const changeNeighborhood = (e) => {
        setNeighborhood(e.target.value);
    }

    const handleFilter = (e) => {
        e.preventDefault();
        applyFilter(surfaceArea, maxRent, petsAllowed, neighborhood);
    }

    return (
        <form className="form-filters" onSubmit={e => { e.preventDefault(); }}>
            <div className="form-group">
                <label className="form-label" htmlFor="rangeSurfaceArea">Minimal surface area (in m&sup3;):</label>
                <input className="form-control" value={surfaceArea} id="inputSurfaceArea" onChange={changeSurfaceArea} />
                <input className="form-range" type="range" min="0" max="200" step="1" value={surfaceArea} id="rangeSurfaceArea" onChange={changeSurfaceArea} />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="rangeRent">Maximum rent (in euro):</label>
                <input className="form-control" value={maxRent} id="inputRent" onChange={changeMaxRent} />
                <input className="form-range" type="range" min="0" max="2000" step="10" value={maxRent} id="rangeRent" onChange={changeMaxRent} />
            </div>
            <div className="form-group">
                <label className="form-check-label">Pets allowed:</label>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="petsAllowed" value="true" id="petsAllowedTrue"/>
                    <label className="form-check-label" htmlFor="petsAllowedTrue">Yes</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="petsAllowed" value="false" id="petsAllowedFalse"/>
                    <label className="form-check-label" htmlFor="petsAllowedFalse">No</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="petsAllowed" value="" id="petsAllowedNone" defaultChecked/>
                    <label className="form-check-label" htmlFor="petsAllowedNone">Doesn't matter</label>
                </div>
            </div>
            <div className="form-group">
                <label className="form-label">Neighborhood:</label>
                <input className="form-control" placeholder="Neighborhood" onChange={changeNeighborhood} value={neighborhood} />  
            </div>
            <button type="button" className="btn btn-primary" cy-name="filter-apply" onClick={handleFilter}>Apply filter</button>
            <button type="button" className="btn btn-secondary" cy-name="filter-reset" onClick={handleFilter}>Reset filter</button>
        </form>
    )
}

export default FilterMenu;