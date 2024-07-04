import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { BaseURL } from '../utils/URL';
const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState({});
  const [newUser, setNewUser] = useState({ name: '', email: '', address: '', password: '', role: 'user' });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BaseURL}/api/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardData(response.data);
    };

    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BaseURL}/api/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    };

    const fetchStores = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BaseURL}/api/stores`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStores(response.data);
    };

    fetchDashboardData();
    fetchUsers();
    fetchStores();
  }, []);

  const handleUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post(`${BaseURL}/api/admin/add-user`, newUser, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNewUser({ name: '', email: '', address: '', password: '', role: 'user' });
    const response = await axios.get(`${BaseURL}/api/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(response.data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="w-full max-w-4xl">
        <div className="mb-4 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Statistics</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>Total Users: {dashboardData.totalUsers}</div>
            <div>Total Stores: {dashboardData.totalStores}</div>
            <div>Total Ratings: {dashboardData.totalRatings}</div>
          </div>
        </div>
        <div className="mb-4 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Add User</h2>
          <form onSubmit={handleAddUser}>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleUserChange}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleUserChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleUserChange}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <input
              type="text"
              name="address"
              value={newUser.address}
              onChange={handleUserChange}
              placeholder="Address"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <select
              name="role"
              value={newUser.role}
              onChange={handleUserChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="user">Normal User</option>
              <option value="storeOwner">Store Owner</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Add User</button>
          </form>
        </div>
        <div className="mb-4 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.address}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-4 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">Stores</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Rating</th>
              </tr>
            </thead>
            <tbody>
              {stores.map(store => (
                <tr key={store._id}>
                  <td className="border px-4 py-2">{store.name}</td>
                  <td className="border px-4 py-2">{store.email}</td>
                  <td className="border px-4 py-2">{store.address}</td>
                  <td className="border px-4 py-2">{store.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={ ()=>{logout(); navigate('/login') }} className="w-full p-2 bg-red-500 text-white rounded">Logout</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
