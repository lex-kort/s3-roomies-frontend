import connection from "./utils/BaseURL";

const url = "/login";

const login = async(email, password) => {
    let result = {};
    try{
        const response = await connection.post(url, { email : email, password : password });
        if(response.status === 200 && response.data){
            localStorage.setItem('jwt_access_token', response.data);
            result = { 
                result : true,
                message : "Login successful, redirecting to account page..." 
            };
        }
        else{
            result = { 
                result : false,
                message : "Invalid credentials, please try again." 
            };
        }
    }
    catch(error){
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(resMessage);
        result = { 
            result : false,
            message : "Failed to login." 
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