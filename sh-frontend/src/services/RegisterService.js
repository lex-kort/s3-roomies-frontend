import connection from "./utils/BaseURL";

// Enums
import AlertTypes from "./utils/AlertTypes";

const componentURL = "/accounts/register";

const register = async(data) => {
    let result = {};
    try{
        const response = await connection.post(componentURL, data);
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
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(resMessage);
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