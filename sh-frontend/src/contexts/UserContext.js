import React, { useState, useEffect, createContext, useContext } from "react";

// Services
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";

const UserContext = createContext({
    auth: null,
    setAuth: () => {},
    user: null,
    setUser: () => {}
});

export const useAuth = () => useContext(UserContext);

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState(() => {
        return AuthService.getToken() ? true : false;
    });

    useEffect(() => {
        if(AuthService.getToken()){
            (async() => {
                const response = await UserService.getUser();
                setUser(response);
            })();
        }
    },[]);

    return (
        <UserContext.Provider value={{user, setUser, auth, setAuth }}>
            {children}
        </UserContext.Provider>
      );
};

export default UserProvider;