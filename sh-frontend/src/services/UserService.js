import connection from "./utils/BaseURL";

// Services
import AuthService from "./AuthService";

const url = "/accounts";

const getUser = async() => {
    const promise = await connection.get(url, { 
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${AuthService.getToken()}`
        }
    });
    return promise.data;
}

const getTokenizedUser = () => {
    const user = {
        token: "",
        id: 0,
        role: "",
    }
    if(AuthService.getToken()){
        user.token = AuthService.getToken();
        user.role = "LANDLORD";
        user.id = 1;
    }
    return user;
}

const UserService = {
    getUser,
    getTokenizedUser
}

export default UserService;