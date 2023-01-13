import connection from "./utils/BaseURL";

// Enums
import AlertTypes from "./utils/AlertTypes";

// Service
import AuthService from "./AuthService";

const componentURL = "/responses";

const respondToListing = async(listingId) => {
    let result = {};
    try{
        const response = await connection.post(componentURL + "/" + listingId, null, { 
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${AuthService.getToken()}`
            },
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });
        if(response.status === 200 && response.data){
            result = {
                result : true,
                message : "Your response has been added",
                type : AlertTypes.Success
            }
        }
        else{
            result = { 
                result : false,
                message : "",
                type : AlertTypes.Error
            };
            if(response.status === 400){
                result.message = "You have already responded to this listing.";
            }
            else if(response.status === 403){
                result.message = "Non-student accounts cannot respond to listings.";
            }
            else if(response.status === 404){
                result.message = "You cannot respond to closed / non-active listings.";
            }
        }
    }
    catch(error){
        result = { 
            result : false,
            message : "Failed to respond to listing, please try again later.",
            type : AlertTypes.Error
        };
    }
    return result;
};

const removeResponse = async(responseId) => {
    let result = {};
    try{
        const response = await connection.delete(componentURL + "/" + responseId, { 
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${AuthService.getToken()}`
            },
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });
        if(response.status === 200 && response.data){
            result = {
                result : true,
                message : "Your response has been removed.",
                type : AlertTypes.Success
            }
        }
        else{
            result = { 
                result : false,
                message : "",
                type : AlertTypes.Error
            };
            if(response.status === 403){
                result.message = "Non-student accounts cannot remove responses.";
            }
            else if(response.status === 404){
                result.message = "Could not remove response because no response was found.";
            }
        }
    }
    catch(error){
        result = { 
            result : false,
            message : "Failed to respond to listing, please try again later.",
            type : AlertTypes.Error
        };
    }
    return result;
};

const getListingResponses = async(responseId) => {
    let result = {};
    try{
        const response = await connection.get(componentURL + "/" + responseId, { 
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${AuthService.getToken()}`
            },
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });
        if(response.status === 200 && response.data){
            result = {
                result : true,
                message : "Retrieved listing responses",
                type : AlertTypes.Success
            }
        }
        else{
            result = { 
                result : false,
                message : "",
                type : AlertTypes.Error
            };
            if(response.status === 403){
                result.message = "You do not have the right permissions.";
            }
            else if(response.status === 404){
                result.message = "Could not find the listing.";
            }
        }
    }
    catch(error){
        result = { 
            result : false,
            message : "Failed to retrieve responses, please try again later.",
            type : AlertTypes.Error
        };
    }
    return result;
};

const getUserResponses = async() => {
    let result = {};
    try{
        const response = await connection.get(componentURL + "/user", { 
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${AuthService.getToken()}`
            },
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });
        if(response.status === 200 && response.data){
            return response.data;
        }
        else{
            result = { 
                result : false,
                message : "You do not have the right permissions.",
                type : AlertTypes.Error
            };
        }
    }
    catch(error){
        result = { 
            result : false,
            message : "Failed to retrieve responses, please try again later.",
            type : AlertTypes.Error
        };
    }
    return result;
};

const getTotalResponses = async(listingId) => {
    try{
        const response = await connection.get(componentURL + "/total/" + listingId);
        if(response.status === 200 && response.data){
            return response.data;
        }
    }
    catch(error){
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(resMessage);
    }
    return 0;
};

const ResponseService = {
    respondToListing,
    removeResponse,
    getListingResponses,
    getUserResponses,
    getTotalResponses
};

export default ResponseService;