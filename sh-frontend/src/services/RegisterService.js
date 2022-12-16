import connection from "./utils/BaseURL";

const componentURL = "/accounts";

const register = (input) => {
    return connection.post(componentURL, null, {
        params : data
    })
}

const RegisterService = {
    register
}

export default RegisterService;