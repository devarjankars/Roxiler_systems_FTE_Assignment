require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const bodyParser=require('body-parser')

const AuthRoutes= require('./routes/AuthRoute')
const UserRoutes= require('./routes/UserRoute')
// const StoreRotutes= require('./routes/StoreRoutes');
const AdminRoute= require('./routes/AdminRoute')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());



// Routes
app.use('/api/auth',AuthRoutes)
app.use('/api/users', UserRoutes);
// app.use('/api/stores', StoreRotutes);
app.use('/api/admin', AdminRoute)


const PORT = process.env.PORT || 5000;
const MongoURL= process.env.MONGO
mongoose.connect(MongoURL, {
  
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));