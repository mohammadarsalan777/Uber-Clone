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


## POST `/captains/register`

### Description

Registers a new captain (driver) in the system. This endpoint accepts captain details, validates them, hashes the password, and creates a new captain record. If registration is successful, it returns the captain data (excluding password) and sets a JWT token as an HTTP-only cookie.

### Request Body

Send a JSON object with the following structure:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

- `fullname.firstname` (string, required): Captain's first name.
- `fullname.lastname` (string, optional): Captain's last name.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.
- `vehicle.color` (string, required): Vehicle color.
- `vehicle.plate` (string, required): Vehicle plate number (must be unique).
- `vehicle.capacity` (integer, required): Number of seats (1-8).
- `vehicle.vehicleType` (string, required): Must be one of `car`, `motorcycle`, or `bike`.

### Responses

- **201 Created**  
  Captain registered successfully. Returns captain data (excluding password) and sets a JWT token cookie.
  ```json
  {
    "message": "Captain registered successfully",
    "captain": {
      "id": "<captain_id>",
      "fullname": { "firstname": "Jane", "lastname": "Doe" },
      "email": "jane@example.com",
      "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

- **400 Bad Request**  
  Validation failed (e.g., missing fields, invalid email, etc.).
  ```json
  {
    "error": [ ... ]
  }
  ```

- **409 Conflict**  
  Captain or vehicle plate already exists.
  ```json
  {
    "error": "Captain already exists"
  }
  ```
  or
  ```json
  {
    "error": "Vehicle plate already exists"
  }
  ```

- **500 Internal Server Error**  
  Unexpected server error.
  ```json
  {
    "error": "Internal Server Error",
    "success": false
  }
  ```

---

## POST `/captains/login`

### Description

Authenticates a captain using email and password. If credentials are valid, returns captain data (excluding password) and sets a JWT token as an HTTP-only cookie.

### Request Body

```json
{
  "email": "jane@example.com",
  "password": "yourpassword"
}
```

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 6 characters.

### Responses

- **200 OK**  
  Captain logged in successfully. Returns captain data and sets a JWT token cookie.
  ```json
  {
    "message": "Captain logged in successfully",
    "captain": {
      "id": "<captain_id>",
      "fullname": { "firstname": "Jane", "lastname": "Doe" },
      "email": "jane@example.com",
      "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

- **400 Bad Request**  
  Validation failed.
  ```json
  {
    "error": [ ... ]
  }
  ```

- **401 Unauthorized**  
  Invalid credentials.
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

- **500 Internal Server Error**  
  Unexpected server error.
  ```json
  {
    "error": "Internal Server Error",
    "success": false
  }
  ```

---

## GET `/captains/profile`

### Description

Retrieves the authenticated captain's profile information. Requires a valid JWT token (sent as a cookie or in the `Authorization` header).

### Authentication

- Requires a valid JWT token (sent as a cookie named `token` or in the `Authorization` header as `Bearer <token>`).

### Responses

- **200 OK**  
  Captain profile fetched successfully.
  ```json
  {
    "message": "Captain profile fetched successfully",
    "captain": { ... }
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
    "error": "Internal Server Error",
    "success": false
  }
  ```

---

## GET `/captains/logout`

### Description

Logs out the authenticated captain by blacklisting the token and clearing the authentication cookie. Requires the captain to be authenticated.

### Authentication

- Requires a valid JWT token (sent as a cookie named `token` or in the `Authorization` header as `Bearer <token>`).

### Responses

- **200 OK**  
  Captain logged out successfully.
  ```json
  {
    "message": "Captain logged out successfully",
    "success": true
  }
  ```

- **400 Bad Request**  
  Token not provided.
  ```json
  {
    "message": "Token not provided"
  }
  ```

- **401 Unauthorized**  
  Unauthorized access.
  ```json
  {
    "message": "Unauthorized access"
  }
  ```

- **500 Internal Server Error**  
  Unexpected server error.
  ```json
  {
    "error": "Internal Server Error",
    "success": false
  }
  ```

  