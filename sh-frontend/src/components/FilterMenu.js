import React, { useState } from "react";
import './FilterMenu.css';

function FilterMenu( {applyFilter} ){
    const minSurfaceAreaRange = 200;
    const maxRentRange = 2000;

    const [ surfaceArea, setSurfaceArea ] = useState(0);
    const [ maxRent, setMaxRent ] = useState(0);
    const [ petsAllowed, setPetsAllowed ] = useState("");
    const [ neighborhood, setNeighborhood ] = useState("");

    const changeSurfaceArea = (e) => {
        let val = e.target.value;
        if(Number.isNaN(Number(val))) return;
        if(val > minSurfaceAreaRange){
            val = minSurfaceAreaRange;
        }
        if(val < 0){
            val = 0;
        }
        setSurfaceArea(val);
    }

    const changeMaxRent = (e) => {
        let val = e.target.value;
        if(Number.isNaN(Number(val))) return;
        if(val > maxRentRange){
            val = maxRentRange;
        }
        if(val < 0){
            val = 0;
        }
        setMaxRent(val);
    }

    const changePetsAllowed = (e) => {
        console.log(e.target.value);
        setPetsAllowed(e.target.value);
    }

    const changeNeighborhood = (e) => {
        setNeighborhood(e.target.value);
    }

    const handleApplyFilter = (e) => {
        e.preventDefault();
        applyFilter(surfaceArea, maxRent, petsAllowed, neighborhood);
    }

    const handleResetFilter = (e) => {
        e.preventDefault();
        setSurfaceArea(0);
        setMaxRent(0);
        setPetsAllowed("");
        setNeighborhood("");
    }

    return (
        <div className="filter-container">
            <h4 className="text-center fw-semibold">Filtering options</h4>
            <form className="form-filters " onSubmit={e => { e.preventDefault(); }}>
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="rangeSurfaceArea">Minimal surface area (in m&sup3;):</label>
                    <input className="form-control" value={surfaceArea} type="number" id="inputSurfaceArea" onChange={changeSurfaceArea} />
                    <input className="form-range" type="range" min="0" max={minSurfaceAreaRange} step="1" value={surfaceArea} id="rangeSurfaceArea" onChange={changeSurfaceArea} />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="rangeRent">Maximum rent (in euro):</label>
                    <input className="form-control" value={maxRent} type="number" id="inputRent" onChange={changeMaxRent} />
                    <input className="form-range" type="range" min="0" max={maxRentRange} step="10" value={maxRent} id="rangeRent" onChange={changeMaxRent} />
                </div>
                <div className="form-group mb-3">
                    <label className="form-check-label">Pets allowed:</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" value="true" onChange={changePetsAllowed} checked={petsAllowed.toLowerCase() === "true"} id="petsAllowedTrue"/>
                        <label className="form-check-label" htmlFor="petsAllowedTrue">Yes</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" value="false" onChange={changePetsAllowed} checked={petsAllowed.toLowerCase() === "false"} id="petsAllowedFalse"/>
                        <label className="form-check-label" htmlFor="petsAllowedFalse">No</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" value="" onChange={changePetsAllowed} checked={petsAllowed === ""} id="petsAllowedNone"/>
                        <label className="form-check-label" htmlFor="petsAllowedNone">Doesn't matter</label>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Neighborhood:</label>
                    <input className="form-control" placeholder="Neighborhood" onChange={changeNeighborhood} value={neighborhood} />  
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <button type="button" className="btn btn-primary" cy-name="filter-apply" onClick={handleApplyFilter}>Apply filter</button>
                    <button type="button" className="btn btn-secondary" cy-name="filter-reset" onClick={handleResetFilter}>Reset filter</button>
                </div>
            </form>
        </div>
    )
}

export default FilterMenu;