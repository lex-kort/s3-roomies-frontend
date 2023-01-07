import connection from "./utils/BaseURL";

// Enums
import AlertTypes from "./utils/AlertTypes";

const componentURL = "/accounts";

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

        }
    }
    catch(error){

    }
    return result;
}

const RegisterService = {
    register
}

export default RegisterService;