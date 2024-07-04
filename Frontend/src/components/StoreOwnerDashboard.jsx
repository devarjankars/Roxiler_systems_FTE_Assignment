import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { BaseURL } from '../utils/URL';
const StoreOwnerDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [store, setStore] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BaseURL}/api/stores?owner=${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStore(response.data);
    };

    fetchStore();
  }, [user._id]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Store Owner Dashboard</h1>
      <div className="w-full max-w-4xl">
        {store && (
          <div className="mb-4 p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Store Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>Name: {store.name}</div>
              <div>Email: {store.email}</div>
              <div>Address: {store.address}</div>
              <div>Rating: {store.rating}</div>
            </div>
          </div>
        )}
        <button onClick={()=>{ logout(); navigate('/login');}} className="w-full p-2 bg-red-500 text-white rounded">Logout</button>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
