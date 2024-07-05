import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { login,logout } = useContext(AuthContext);
  
const Navigate= useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
   let res= await login(email, password);
   console.log(res);
   if(res===false){
    Navigate('/')
    return;
   }
   Navigate(`/${res}`)

  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Login</button>
        <Link to={'/Signup'} className=" text-blue-500 underline"> Create an Account </Link>
      </form>
    </div>
  );
};

export default Login;
