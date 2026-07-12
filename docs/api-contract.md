# API Contract

## Base URL
* Development: `http://localhost:5000/api`
* Production: `https://api.yourdomain.com/api`

## Authentication
* Method: Bearer Token (JWT) / Session Cookies
* Header: `Authorization: Bearer <token>`

## Endpoints

| Method | Route | Request Body / Params | Response Body (Success) | Description |
|--------|-------|----------------------|-------------------------|-------------|
| GET    | `/users` | None | `[ { "id": 1, "name": "Alice" } ]` | Retrieve all users |
| POST   | `/users` | `{ "name": "Bob" }` | `{ "id": 2, "name": "Bob" }` | Create a new user |

## Error Response Format
All error responses must return the appropriate HTTP status code and follow this JSON structure:

```json
{
  "success": false,
  "error": {
    "message": "Detailed error message describing what went wrong.",
    "code": "ERROR_CODE",
    "details": []
  }
}
```
