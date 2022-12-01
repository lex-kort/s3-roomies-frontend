import connection from "./utils/BaseURL";

const url = "/login";

const login = (email, password) => {
    const data = connection.post(url, { email : email, password : password });
    return data;
}

const ListingService = {
    login
}

export default ListingService;