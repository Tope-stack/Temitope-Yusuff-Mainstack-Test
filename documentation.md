# API Documentation

## Overview 

This API provides authentication and product management functionalities, allowing users to register, log in, and manage products. The API follows RESTful principles and responds with JSON-formatted data.

## Authentication Endpoints

### Register User

Endpoint: POST /api/auth/register

Description: Registers a new user.

Request Body:
```json
{
  "fullname": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

### Responses
201 Created
```json
{
  "status": "success",
  "message": "Registration Successful, Proceed To Login",
  "id": "user_id",
  "fullname": "John Doe",
  "email": "johndoe@example.com"
}
```

400 Bad Request (User already exists or other validation errors)

### Login

Endpoint: POST /api/auth/login

Description: Authenticates a user and returns a JWT token.

Request Body:
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

### Responses
200 OK
```json 
{
  "status": "success",
  "message": "Login successful",
  "token": "jwt_token",
  "id": "user_id",
  "fullname": "John Doe",
  "email": "johndoe@example.com"
}
```
400 Bad Request (User not found or incorrect password)


## Product Management Endpoints

Create Product

Endpoint: POST /api/products

Description: Creates a new product.

Request Body:
```json
{
  "name": "Product Name",
  "price": 100,
  "status": "active"
}
```

Responses:
```json
{
  "status": "success",
  "message": "Product created successfully",
  "product": { ... }
}
```
400 Bad Request

 ### Get All Active Products

Endpoint: GET /api/products

Description: Retrieves all active products.

Responses:

200 OK
```json
{
  "status": "success",
  "message": "Products retrieved successfully",
  "products": [ ... ]
}
```

404 Not Found (If no products exist)

### Get Product by ID

Endpoint: GET /api/products/{id}

Description: Retrieves a product by its ID.

Responses:

200 OK
```json
{
  "status": "success",
  "message": "Product found successfully",
  "product": { ... }
}
```
400 Bad Request (Invalid product ID)

404 Not Found

### Update Product

Endpoint: PUT /api/products/{id}

Description: Updates an existing product.

Request Body:
```json
{
  "name": "Updated Product Name",
  "price": 150
}
```
Responses:

200 OK
```json
{
  "status": "success",
  "message": "Product updated successfully",
  "product": { ... }
}
```
400 Bad Request

404 Not Found

### Delete Product

Endpoint: DELETE /api/products/{id}

Description: Marks a product as inactive instead of deleting it.

Responses:

200 OK
```json
{
  "status": "success",
  "message": "Product deleted successfully"
}
```
404 Not Found

