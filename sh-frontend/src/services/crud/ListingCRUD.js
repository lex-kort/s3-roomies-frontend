import url from "../BaseURL.js";

const compURL = "/listings";

const getActiveListings = () => {    
    return url.get(compURL);
};

const getFilteredListings = data => {
    return url.get(compURL, data);
};

const getListing = id => {
    return url.get(compURL + "/" + id)
}

const ListingCRUD = {
    getActiveListings,
    getFilteredListings,
    getListing
};

export default ListingCRUD;