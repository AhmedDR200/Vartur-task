import { FastifySchema } from 'fastify';

export const loginSchema: FastifySchema = {
  body: {
    type: 'object',
    required: ['username', 'password'],
    properties: {
      username: { type: 'string', minLength: 1 },
      password: { type: 'string', minLength: 1 }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            username: { type: 'string' },
            role: { type: 'string' }
          }
        }
      }
    },
    401: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
}; 