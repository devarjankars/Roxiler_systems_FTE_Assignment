import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes ,Navigate} from 'react-router-dom';
import {  AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const App = () => {


  const {user} = React.useContext(AuthContext);

  return (<>
   
      <ToastContainer position='top-center'  autoClose={3000}/>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route
          path="/admin"
          element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/user"
          element={user?.role === 'user' ? <UserDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/store-owner"
          element={user?.role === 'storeOwner' ? <StoreOwnerDashboard /> : <Navigate to="/login" />}
        />
         
        </Routes>
      </Router>
      </>
  );
};

export default App;
