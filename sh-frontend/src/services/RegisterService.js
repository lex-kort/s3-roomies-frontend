import connection from "./utils/BaseURL";

// Enums
import AlertTypes from "./utils/AlertTypes";

const componentURL = "/accounts/register";

const register = async(data) => {
    let result = {};
    try{
        const response = await connection.put(componentURL, data, {
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        });
        if(response.status === 200 && response.data){
            result = {
                result : true,
                message : "Account successfully registered, redirecting to login page...",
                type : AlertTypes.Success
            }
        }
        else{
            result = { 
                result : false,
                message : "This email is already taken.",
                type : AlertTypes.Error
            };
        }
    }
    catch(error){
        result = { 
            result : false,
            message : "Failed to register account, please try again.",
            type : AlertTypes.Error
        };
    }
    return result;
}

const RegisterService = {
    register
}

export default RegisterService;