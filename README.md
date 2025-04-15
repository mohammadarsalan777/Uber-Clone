# Uber-Clone
A full stack project for developing an Uber clone using the MERN stack.

## Project Description

This project is a comprehensive clone of the Uber ride-hailing platform, built using MongoDB, Express.js, React.js, and Node.js (MERN stack). It aims to replicate core functionalities of Uber, including user registration, authentication, ride booking, real-time updates, and more. The backend provides RESTful APIs for user management, ride operations, and real-time communication using sockets. The frontend offers a responsive and interactive user interface for both riders and drivers.

Key features include:
- Secure user registration and authentication
- Real-time ride requests and driver updates
- RESTful API endpoints for all major operations
- Scalable architecture for future enhancements

This project is intended for educational purposes and as a demonstration of full stack development best practices.

# Backend API Documentation

# Rgisters a new user.

## POST `/users/register`

### Request Body

Send a JSON object with the following fields:

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

- `firstname` (string, required)
- `lastname` (string, optional)
- `email` (string, required, must be a valid email)
- `password` (string, required, minimum 6 characters)

### Responses

- **201 Created**  
  User registered successfully. Returns a JSON object with a JWT token and user data.
  ```json
  {
    "token": "<jwt_token>",
    "user": { ... },
    "message": "User created successfully",
    "success": true
  }
  ```

- **400 Bad Request**  
  Validation failed (e.g., invalid email, password too short).
  ```json
  {
    "errors": [ ... ]
  }
  ```

- **409 Conflict**  
  User with this email already exists.
  ```json
  {
    "message": "User with this email already exists.",
    "success": false
  }
  ```

- **500 Internal Server Error**  
  Unexpected server error.
  ```json
  {
    "message": "Internal service error.",
    "success": false
  }
  ```