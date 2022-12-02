import connection from "./utils/BaseURL";

const url = "/accounts";

const getUser = async() => {
    const promise = await connection.get(url, { 
        headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt_access_token')}`
        }
    });
    return promise.data;
}

const UserService = {
    getUser
}

export default UserService;