# E-Commerce Backend API

## Overview

This is a scalable e-commerce backend built with Node.js, Express, MongoDB, and Socket.IO.  
Features include:

- Products, Categories, Users, Orders collections with full CRUD  
- JWT-based authentication with roles (admin/customer)  
- Real-time stock updates via WebSockets (Socket.IO)  
- Real-time admin dashboard analytics  
- Coupon and discount system (planned)  
- Report generation and scheduled tasks (planned)  

---

## Features

- RESTful API with secure JWT authentication  
- Real-time product stock updates to subscribed clients  
- Real-time admin analytics via socket events  
- Modular controllers and routes  
- Centralized error handling and API response formatting  
- Docker-ready and Swagger documentation  

---

## Technologies Used

- Node.js  
- Express  
- MongoDB with Mongoose  
- Socket.IO  
- JSON Web Tokens (JWT)  
- dotenv for environment variables  
- nodemon for development  

---

## API Documentation

### Swagger UI

- Swagger UI is integrated for interactive API docs and testing.  
- After starting the server, visit:  
  `http://localhost:3000/api-docs`  
- Explore all endpoints, see request/response formats, and test APIs directly.

---

## Setup & Run

1. Clone the repo:  
```bash
git clone <your-repo-url>
cd e-com-backend-think-debug
