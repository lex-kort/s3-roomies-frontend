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

const UserService = {
    getUser
}

export default UserService;