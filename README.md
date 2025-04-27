# E-Commerce API

A robust, scalable, and secure RESTful API for e-commerce platforms built with Fastify, Prisma, and Redis.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control
  - Secure password hashing with bcrypt

- **User Management**
  - User registration and login
  - Profile management
  - Role-based permissions

- **Product Management**
  - CRUD operations for products
  - Product categorization

- **Category Management**
  - Hierarchical category structure
  - Category CRUD operations
  - Product-category relationships

- **Performance & Caching**
  - Redis caching for improved performance
  - Optimized database queries

- **API Documentation**
  - Swagger/OpenAPI documentation
  - Interactive API testing interface
  - Detailed endpoint documentation

## 🛠️ Tech Stack

- **Backend Framework**: Fastify
- **Database**: MySQL with Prisma ORM
- **Caching**: Redis
- **Authentication**: JWT
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker

## 📋 Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- MySQL 8.0
- Redis 7

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/AhmedDR200/Vartur-task
   cd Vartur-task
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL="mysql://root:root@localhost:3306/ecommerce"
   REDIS_HOST="localhost"
   JWT_SECRET="your-secret-key"
   ```

4. **Start the application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm run build
   npm start
   ```

## 🐳 Docker Setup

1. **Build and start containers**
   ```bash
   docker-compose up --build
   ```

2. **Access the API**
   - API: http://localhost:3000
   - Swagger UI: http://localhost:3000/documentation
   - MySQL: localhost:3306
   - Redis: localhost:6380

## 📚 API Documentation

The API documentation is available at `/documentation` when the server is running. It includes:

- Authentication endpoints
- User management endpoints
- Product management endpoints
- Category management endpoints

### Example API Endpoints

#### Authentication
```http
POST /api/auth/login
```

#### Users
```http
GET /api/users
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id
```

#### Products
```http
GET /api/products
POST /api/products
GET /api/products/:id
PUT /api/products/:id
DELETE /api/products/:id
```

#### Categories
```http
GET /api/categories
POST /api/categories
GET /api/categories/:id
PUT /api/categories/:id
DELETE /api/categories/:id
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation

## 📦 Project Structure

```
src/
├── controllers/     # Route controllers
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Utility functions
├── plugins/        # Fastify plugins
└── index.ts        # Application entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Ahmed Magdy 