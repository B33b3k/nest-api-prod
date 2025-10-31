# NestJS Production API

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<p align="center">
  <a href="https://nest-api-prod.onrender.com" target="_blank"><img src="https://img.shields.io/badge/Render-Live%20Demo-46E3B7" alt="Live Demo" /></a>
  <a href="https://nest-api-prod.onrender.com/docs" target="_blank"><img src="https://img.shields.io/badge/Swagger-API%20Docs-85EA2D" alt="API Docs" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/badge/NestJS-11.x-E0234E" alt="NestJS Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
</p>

## 🌐 Live API

- **Production URL**: [https://nest-api-prod.onrender.com](https://nest-api-prod.onrender.com)
- **API Documentation**: [https://nest-api-prod.onrender.com/docs](https://nest-api-prod.onrender.com/docs)

## Overview
A production-ready NestJS boilerplate demonstrating enterprise-level API development practices. Features include robust logging, rate limiting, database integration with Prisma, and comprehensive API documentation.

## Features
- 🚀 **Modern NestJS Architecture** - Built with NestJS 11.x
- 🔒 **API Protection** - Rate limiting and throttling
- 📝 **Advanced Logging System**
  - Structured logging with Winston
  - Request/Response logging
  - Daily log rotation
  - Separate error tracking
- 🗄️ **Database Integration**
  - Prisma ORM with PostgreSQL
  - Type-safe database operations
  - Migration management
- 🔍 **Monitoring & Debugging**
  - Detailed API metrics
  - Performance tracking
  - Request tracing
- 📚 **Well-Structured Modules**
  - Users management
  - Products handling
  - Employee records
  - Database services

## Prerequisites
- Node.js v20.x or later
- PostgreSQL 15.x or later
- pnpm (recommended) or npm

## Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
pnpm prisma migrate dev

# Start the development server
pnpm start:dev
```

## Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
PORT=3000
```

## Project Structure
```
src/
├── common/          # Shared utilities, guards, and middleware
├── database/        # Database configuration and service
├── employees/       # Employee module
├── my-logger/       # Custom logging implementation
├── products/        # Products module
├── users/          # Users module
└── main.ts         # Application entry point
```

## API Endpoints

### Users
- `GET /users` - List all users
- `POST /users` - Create a new user
- `GET /users/:id` - Get user details
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Products
- `GET /products` - List all products
- `POST /products` - Create a new product
- `GET /products/:id` - Get product details
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Employees
- `GET /employees` - List all employees
- `POST /employees` - Create a new employee
- `GET /employees/:id` - Get employee details
- `PATCH /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

## Rate Limiting
The API implements rate limiting with the following rules:
- Short window: 3 requests per second
- Long window: 100 requests per minute

## Logging
Logs are stored in the `/logs` directory with the following files:
- `application-%DATE%.log` - General application logs
- `error-%DATE%.log` - Error logs
- `api-%DATE%.log` - API request/response logs

Log files are automatically rotated daily and when they reach 20MB.

## Development

```bash
# Start in development mode
pnpm start:dev

# Run tests
pnpm test

# Run e2e tests
pnpm test:e2e

# Build for production
pnpm build
```

## Production Deployment

```bash
# Build the application
pnpm build

# Start production server
pnpm start:prod
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is [MIT licensed](LICENSE).
# nest-api-prod
