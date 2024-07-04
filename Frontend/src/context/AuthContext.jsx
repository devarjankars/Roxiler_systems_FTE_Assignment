import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BaseURL } from '../utils/URL';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${BaseURL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(response => {
        setUser(response.data.user);
      }).catch(() => {
        localStorage.removeItem('token');
      });
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(`${BaseURL}/api/auth/login`, { email, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return true;
  };

  const signup = async (name, email, address, password) => {
     let res=await axios.post(`${BaseURL}/api/auth/signup`, { name, email, address, password });
     console.log(res);
     if(res.data?.status){
      toast.success("succfully created User");
     }
     else{
       toast.error("Something Went Wrong");
     }
     return true;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
