import React, { useState, useEffect, createContext, useContext } from "react";
import UserService from "../services/UserService";

const UserContext = createContext({
    auth: null,
    setAuth: () => {},
    user: null,
});

export const useAuth = () => useContext(UserContext);

const UserProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        console.log("triggered");
        const isAuth = async() =>{
            try{
                const res = await UserService.getUser();
                setUser(res);
            }
            catch(error){
                setUser(null);
            }
        }
        isAuth();
    }, [auth])

    return (
        <UserContext.Provider value={{auth, setAuth, user}}>
            {children}
        </UserContext.Provider>
      );
};

export default UserProvider;