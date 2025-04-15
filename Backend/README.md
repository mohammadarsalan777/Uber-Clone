# Backend API Documentation

## POST `/users/register`

Registers a new user.

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