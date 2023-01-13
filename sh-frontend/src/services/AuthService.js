import connection from "./utils/BaseURL";

// Enums
import AlertTypes from "./utils/AlertTypes";

const url = "/login";

const login = async(email, password) => {
    let result = {};
    try{
        const response = await connection.post(url, { email : email, password : password });
        if(response.status === 200 && response.data){
            localStorage.setItem('jwt_access_token', response.data);
            result = { 
                result : true,
                message : "Login successful, redirecting to account page...",
                type : AlertTypes.Success
            };
        }
        else{
            result = { 
                result : false,
                message : "Invalid credentials, please try again.",
                type : AlertTypes.Error
            };
        }
    }
    catch(error){
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(resMessage);
        result = { 
            result : false,
            message : "Failed to login.",
            type : AlertTypes.Error
        };
    }
    return result;
}

const logout = () => {
    localStorage.removeItem('jwt_access_token');
}

const getToken = () => {
    return localStorage.getItem('jwt_access_token');
}

const AuthService = {
    login,
    logout,
    getToken
}

export default AuthService;