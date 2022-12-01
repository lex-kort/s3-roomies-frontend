import connection from "./utils/BaseURL";

const url = "/accounts";

const getUser = () => {
    return connection.get(url, { 
        headers: { 
            Authorization: `Bearer ${localStorage.getItem('jwt_access_token')}`
        }
    });
}

const UserService = {
    getUser
}

export default UserService;