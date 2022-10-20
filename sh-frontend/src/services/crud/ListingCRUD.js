import url from "../BaseURL.js";

const compURL = "/listings";

const getActiveListings = () => {    
    return url.get(compURL);
};

const getFilteredListings = data => {
    return url.get(compURL, data)
}

const ListingCRUD = {
    getActiveListings,
    getFilteredListings
};

export default ListingCRUD;