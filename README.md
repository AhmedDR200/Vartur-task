# Task Management API

A RESTful API built with Fastify, TypeScript, Prisma, MySQL, and Redis for managing users, categories, and products.

## Features

- 🔐 JWT Authentication with Redis token storage
- 👥 User management
- 📁 Category management with nested categories
- 🛍️ Product management
- ✅ Input validation
- 🐳 Docker support
- 📝 API documentation

## Prerequisites

- Node.js (v20 or higher)
- Docker and Docker Compose
- MySQL
- Redis

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd task
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
DATABASE_URL="mysql://root:root@localhost:3306/vartur_task"
REDIS_HOST="localhost"
JWT_SECRET="your-secret-key"
PORT=3000
```

4. Generate Prisma client:
```bash
npm run prisma:generate
```

5. Run database migrations:
```bash
npm run prisma:migrate
```

## Running the Project

### Using Docker (Recommended)

1. Build and start the containers:
```bash
docker compose up --build
```

2. Stop the containers:
```bash
docker compose down
```

### Without Docker

1. Start the development server:
```bash
npm run dev
```

2. For production:
```bash
npm run build
npm start
```

## API Documentation

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
    "username": "your_username",
    "password": "your_password"
}
```

Response:
```json
{
    "token": "your.jwt.token",
    "user": {
        "id": 1,
        "username": "your_username",
        "role": "user"
    }
}
```

### Users

#### Create User
```http
POST /api/users
Content-Type: application/json
Authorization: Bearer your.jwt.token

{
    "username": "newuser",
    "password": "password123",
    "role": "user"
}
```

#### Get All Users
```http
GET /api/users
Authorization: Bearer your.jwt.token
```

### Categories

#### Create Category
```http
POST /api/categories
Content-Type: application/json
Authorization: Bearer your.jwt.token

{
    "name": "Electronics",
    "parentId": null
}
```

#### Get All Categories
```http
GET /api/categories
Authorization: Bearer your.jwt.token
```

#### Get Category by ID
```http
GET /api/categories/:id
Authorization: Bearer your.jwt.token
```

#### Update Category
```http
PUT /api/categories/:id
Content-Type: application/json
Authorization: Bearer your.jwt.token

{
    "name": "Updated Category",
    "parentId": null
}
```

#### Delete Category
```http
DELETE /api/categories/:id
Authorization: Bearer your.jwt.token
```

### Products

#### Create Product
```http
POST /api/products
Content-Type: application/json
Authorization: Bearer your.jwt.token

{
    "name": "Laptop",
    "price": 999.99,
    "categoryId": 1
}
```

#### Get All Products
```http
GET /api/products
Authorization: Bearer your.jwt.token
```

#### Get Product by ID
```http
GET /api/products/:id
Authorization: Bearer your.jwt.token
```

#### Update Product
```http
PUT /api/products/:id
Content-Type: application/json
Authorization: Bearer your.jwt.token

{
    "name": "Updated Product",
    "price": 899.99,
    "categoryId": 1
}
```

#### Delete Product
```http
DELETE /api/products/:id
Authorization: Bearer your.jwt.token
```

## Error Responses

The API uses standard HTTP status codes:

- 200: Success
- 201: Created
- 204: No Content
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

Error response format:
```json
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "Error description"
}
```

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run prisma:generate`: Generate Prisma client
- `npm run prisma:migrate`: Run database migrations

### Project Structure

```
src/
├── controllers/     # Request handlers
├── services/       # Business logic
├── routes/         # Route definitions
├── schemas/        # Request/response validation
├── plugins/        # Fastify plugins
├── hooks/          # Request hooks
└── index.ts        # Application entry point
```

## License

ISC 