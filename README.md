# Blog Application

This is a full-stack blog application that enables users to create, read, update, and delete blog posts. Users can register, log in, and manage their blogs. The application is built with a React front-end and an Express.js back-end, and MongoDB is used as the database.

## Features

- User Registration and Login
- JWT-based Authentication and Authorization
- CRUD Operations for Blog Posts
- Email verification (using nodemailer)
- Responsive design using React Bootstrap
- Form validation with Formik
- API calls using Axios
- Secure password hashing with bcryptjs

## Technologies Used

### Frontend

- **React** - JavaScript library for building user interfaces
- **react-router-dom** - Routing and navigation for React
- **react-bootstrap** - UI components and styling
- **axios** - HTTP client for making API requests
- **formik** - Form validation and handling
- **react-icons** - Icon library for React

### Backend

- **Express.js** - Web application framework for Node.js
- **mongoose** - MongoDB object modeling for Node.js
- **nodemon** - Automatically restarts the server on changes
- **cors** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable loader
- **jsonwebtoken** - JSON Web Token for secure authentication
- **bcryptjs** - Password hashing
- **nodemailer** - Email sending functionality

## Installation and Setup

### Prerequisites

- **Node.js** - Make sure you have Node.js installed on your machine.
- **MongoDB** - Set up MongoDB for the backend.

### Getting Started

Authentication
Register a new account.
Log in to access your account and create blogs.
JWT tokens are used for secure authentication.
Blog Management
Users can create, update, and delete their own blog posts.
All users can view blog posts, but only the author can edit or delete them.
Email Verification
Upon registration, users can change the password by registered email

## Database

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
