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

---

## POST `/users/register`

### Description

Registers a new user in the system. This endpoint accepts user details, validates them, hashes the password, and creates a new user record. If the registration is successful, it returns a JWT token and the user data. If the email already exists or validation fails, it returns an appropriate error.

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

- `firstname` (string, required): The user's first name.
- `lastname` (string, optional): The user's last name.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

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

---

## POST `/users/login`

### Description

Authenticates an existing user using email and password. If the credentials are valid, returns a JWT token and user data. Handles validation errors, incorrect credentials, and user-not-found scenarios.

### Request Body

Send a JSON object with the following fields:

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

### Responses

- **200 OK**  
  User logged in successfully. Returns a JSON object with a JWT token and user data.
  ```json
  {
    "token": "<jwt_token>",
    "user": { ... },
    "message": "User logged in successfully",
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

- **401 Unauthorized**  
  Invalid credentials.
  ```json
  {
    "message": "Invalid credentials",
    "success": false
  }
  ```

- **404 Not Found**  
  User not found.
  ```json
  {
    "message": "User not found",
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
    ---
  
  ## GET `/users/profile`
  
  ### Description
  
  Retrieves the authenticated user's profile information. This endpoint requires a valid JWT token to be sent in the request (usually as a cookie or in the `Authorization` header). Returns the user's profile data if authenticated.
  
  ### Authentication
  
  - Requires a valid JWT token (sent as a cookie named `token` or in the `Authorization` header as `Bearer <token>`).
  
  ### Responses
  
  - **200 OK**  
    User profile retrieved successfully.
    ```json
    {
      "message": "User profile retrieved successfully",
      "success": true,
      "user": { ... }
    }
    ```
  
  - **401 Unauthorized**  
    Missing or invalid authentication token.
    ```json
    {
      "message": "Not authorized, token failed",
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
  
  ---
  
  ## GET `/users/logout`
  
  ### Description
  
  Logs out the authenticated user by clearing the authentication token cookie and blacklisting the token. Requires the user to be authenticated.
  
  ### Authentication
  
  - Requires a valid JWT token (sent as a cookie named `token` or in the `Authorization` header as `Bearer <token>`).
  
  ### Responses
  
  - **200 OK**  
    User logged out successfully.
    ```json
    {
      "message": "User logged out successfully",
      "success": true
    }
    ```
  
  - **401 Unauthorized**  
    Missing or invalid authentication token.
    ```json
    {
      "message": "Not authorized, token failed",
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