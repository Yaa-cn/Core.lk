# Core.lk

A modern full-stack MERN e-commerce application for purchasing computer accessories. Core.lk is built using MongoDB, Express.js, React, and Node.js with secure session-based authentication, responsive UI, and a complete shopping experience for customers and administrators.

## Features

### Customer Features

- User registration and login
- Session based authentication
- Browse products by category
- Product search
- Product filtering and sorting
- Product details page
- Shopping cart
- Wishlist
- Product reviews and ratings
- Address management
- Checkout
- PayHere payment integration
- Order history
- Order tracking
- User profile management
- Responsive design

### Admin Features

- Admin dashboard
- Product management (CRUD)
- Order management
- User management
- Dashboard statistics

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Context API
- Fetch API

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- express-session
- bcrypt

## Installation

Clone the repository

Install frontend dependencies

```powershell
cd client
npm install
```

Install backend dependencies

```powershell
cd server
npm install
```

Database Configuration

1. Install MongoDB Community Edition and start the MongoDB services.
2. Create a db and get connection string and use that in .env 

Environment Variables

1. Copy the example environment file.
2. Fill in the required values inside the ".env" file before starting the application.

## Running the Project

Start the backend

```powershell
cd server
npm run dev
```

Start the frontend

```powershell
cd client
npm run dev
```

## Main Modules

- Authentication
- Categories
- Search
- Filtering & Sorting
- Shopping Cart
- Wishlist
- Reviews & Ratings
- Address Management
- Checkout
- Order Management
- User Profile
- Admin Dashboard

## Note

The initial structure of the admin dashboard was AI assisted. I then adapted and integrated it with the existing Express.js backend that I created, updating the UI, components, routing, and business logic to align with the architecture and requirements of the Core.lk project.

## Authentication

Core.lk uses session-based authentication with "express-session" and secure HTTP cookies to manage authenticated user sessions.

## Author

Developed by Yaseen

## License

This project was developed for educational purposes as part of the Higher National Diploma in Information Technology (HNDIT) final project.