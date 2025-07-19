#  Collection & Auth API – MERN Backend

A simple backend API built with Node.js, Express, and MongoDB to handle user authentication (JWT) and CRUD operations for user-defined collections.


## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
- cookie-parser for refresh tokens


## Features

-  User Register, Login, Logout, Refresh Token
-  Protected Routes with JWT
-  Create, Read, Update, Delete Collections

---

##  Setup Instructions

1. Clone repo & install dependencies:
   ```bash
   npm install

2. create .env file (refer .env.example):

PORT=3000
MONGO_URI=your_mongodb_uri
jwT_sECRET=secretkey123
ACCESS_TOKEN_EXPIRY=your_secret
REFRESH_TOKEN_EXPIRY=your_secret

DBNAME:ddmp
HOST:LOCALHOST


3. Start the server:

npm run dev

4. API Routes

Auth Routes

POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/refresh

Collection Routes (JWT Protected)

POST /api/collections

GET /api/collections

GET /api/collections/:id

PUT /api/collections/:id

DELETE /api/collections/:id

Postman Collection
Test all routes using:
DDMP_collection.postman_collection.json

