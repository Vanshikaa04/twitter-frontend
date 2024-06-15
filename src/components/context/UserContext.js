import React, { createContext, useState, useContext, useEffect, Children } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserContext = createContext()

export const UserProvider = ({ children }) =>{
    const [user,setUser] = useState(null)

    const getUserDetails = async () => {
        const token = Cookies.get('token');
        console.log('token of user', token);
    
        try {
          const response = await axios.get('http://localhost:3008/user/details', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('response of context ', response);
          setUser(response?.data?.user);
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(() => {
      console.log("in useEffect of context")
      getUserDetails();
    }, [])
    
    return(
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}
export const useUser = () => useContext(UserContext);