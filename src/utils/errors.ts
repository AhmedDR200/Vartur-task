import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

// Custom error classes
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string) {
    super(401, message);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string) {
    super(403, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message);
  }
}

// Error handler middleware
export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  // Log the error
  request.log.error(error);

  // Handle custom AppError
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      status: 'error',
      message: error.message,
      code: error.statusCode,
    });
  }

  // Handle validation errors
  if (error.validation) {
    return reply.status(400).send({
      status: 'error',
      message: 'Validation error',
      errors: error.validation,
      code: 400,
    });
  }

  // Handle Prisma errors
  if (error.name === 'PrismaClientKnownRequestError') {
    return reply.status(400).send({
      status: 'error',
      message: 'Database operation failed',
      code: 400,
    });
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    return reply.status(401).send({
      status: 'error',
      message: 'Invalid token',
      code: 401,
    });
  }

  // Default error response
  return reply.status(500).send({
    status: 'error',
    message: 'Internal server error',
    code: 500,
  });
}; 