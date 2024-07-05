# Store Rating Platform

This is a MERN stack web application that allows users to submit ratings for registered stores. The application supports different user roles: System Admin, Normal User, and Store Owner. Each user role has specific functionalities.

## Features

### System Admin Functionalities
- Add stores, normal users, and admin users to the system
- Dashboard displaying:
  - Total Users
  - Total Stores
  - Total Users Submitted Rating
- User management (add, view, and filter users)
- Store management (add, view, and filter stores)
- View details of all types of users
- Logout option

### Normal User Functionalities
- Signup and login to the platform
- Change password after login
- View and search registered stores
- Submit and modify ratings for stores
- Logout option

### Store Owner Functionalities
- Login to the platform
- Change password after login
- View users who have submitted ratings for their store
- View the average total submitted ratings for their store
- Logout option

## Validations
- Name length: 20-60 characters
- Address length: up to 400 characters
- Password length: 8-16 characters, with at least 1 uppercase and 1 special character
- Email validation

## Setup and Installation

### Prerequisites
- Node.js
- MongoDB
- npm 

#### frontend 
vite bundler  and npm i


#### error handling 
we have used toast for error handling 