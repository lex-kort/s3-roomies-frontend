import connection from "./utils/BaseURL.js";

const compURL = "/listings";

const getActiveListings = () => {    
    return connection.get(compURL);
};

const getFilteredListings = ( data ) => {
    return connection.post(compURL, null, { 
        params : data
    });
}

const getListing = id => {
    return connection.get(compURL + "/" + id)
}

const ListingService = {
    getActiveListings,
    getFilteredListings,
    getListing
};

export default ListingService;