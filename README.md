# 🔐 Secure JWT Authentication API

A production-ready authentication REST API built using **Node.js**, **Express**, **MongoDB Atlas**, and **JWT**.

This project implements secure user registration and authentication using modern backend security best practices.

---

## 🚀 Features

- User Signup API
- JWT Token Generation
- Protected Routes Middleware
- MongoDB Atlas Integration
- Unique Email & Username Validation
- Secure Password Handling
- HttpOnly Cookie Support
- Error Handling & Validation

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- Thunder Client (API Testing)

---

## 📂 Project Structure

```
backend/
│── controllers/
│── routes/
│── models/
│── middleware/
│── index.js
```

---

## 🔑 API Endpoints

### ➤ Signup
```
POST /auth/signup
```

### ➤ Login (if implemented)
```
POST /auth/login
```

---

## ⚙️ Installation

1. Clone the repository:

```
git clone https://github.com/rupa375/jwt-auth-backend.git
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file and add:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Start the server:

```
npm run dev
```

---

## 🔐 Security Practices

- JWT Authentication
- HttpOnly Cookies
- Unique field validation
- Environment variables for secrets

---

## 📌 Future Improvements

- Login API
- Refresh Token System
- Role-based Authentication
- Password Hashing with bcrypt
- Email Verification

---

## 👩‍💻 Author

Rupa Singh  
B.Tech CSE | Backend Developer

