import url from "../BaseURL.js";

const listURL = "/listings";

const getActiveListings = () => {    
    return url.get(listURL);
};

const getFilteredListings = data => {
    console.log(data);
    return url.get(listURL, data)
}

const ListingCRUD = {
    getActiveListings,
    getFilteredListings
};

export default ListingCRUD;