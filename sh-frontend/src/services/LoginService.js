import connection from "./utils/BaseURL";

const url = "/login";

const login = (email, password) => {
    return connection.post(url, { email : email, password : password })
        .then((response) => {
            if(response.data){
                localStorage.setItem('jwt_access_token', response.data);
            }
            return response;
        });
}

const ListingService = {
    login
}

export default ListingService;