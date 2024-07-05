import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { BaseURL } from '../utils/URL';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate= useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [stores, setStores] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchStores = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BaseURL}/api/stores`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStores(response.data);
    };

    fetchStores();
  }, []);

  const handleRatingSubmit = async (storeId) => {
    const token = localStorage.getItem('token');
    await axios.post(`${BaseURL}/api/stores/rating`, { storeId, rating }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const response = await axios.get(`${BaseURL}/api/stores`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStores(response.data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <div className="w-full max-w-4xl">
        <div className="mb-4 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Stores</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">My Rating</th>
                <th className="px-4 py-2">Submit Rating</th>
              </tr>
            </thead>
            <tbody>
              {stores.map(store => (
                <tr key={store._id}>
                  <td className="border px-4 py-2">{store.name}</td>
                  <td className="border px-4 py-2">{store.address}</td>
                  <td className="border px-4 py-2">{store.rating}</td>
                  <td className="border px-4 py-2">
                    {store.ratings.find(r => r.user === user._id)?.rating || 'N/A'}
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <button onClick={() => handleRatingSubmit(store._id)} className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={ ()=>{logout(); navigate('/');}} className="w-full p-2 bg-red-500 text-white rounded">Logout</button>
      </div>
    </div>
  );
};

export default UserDashboard;
