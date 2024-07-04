import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



///import {  } from 'react-router-dom';


const Signup = ({ history }) => {
    const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  

// //The name length should be 60 characters max and 20 characters min
// ● The Address length should be 400 characters max
// ● The password length max 16 and 8 min, it should have at least 1
// upper, and 1 special character in it.
// ● Email address validation should be there in the email field.
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  function validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
    return passwordPattern.test(password);
}
  const handleSubmit = async (e) => {

    e.preventDefault();
    
    if(validatePassword(password) ){
        if(validateEmail(email)){
            let ans= await signup(name, email, address, password);
             console.log(ans);
            navigate('/');
        }
        else {
            toast.error("Email is Invalid")
        }
    }
        
    else{
        toast.error("Please Check your Password length max 16 and 8 min, it should have atleast 1 Upper, and 1 special character in it ")
      
    }
    
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4">Signup</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded mb-1">Signup</button>
        <Link to={'/'} className=" text-blue-500 rounded border-l-pink-200 m-4 underline "> Clike here to Login</Link>
      </form>
    </div>
  );
};

export default Signup;
