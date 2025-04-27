import { FastifyInstance } from 'fastify';
import * as authController from '../controllers/auth.controller';
import { loginSchema } from '../schemas/auth.schema';

export default async function (fastify: FastifyInstance) {
  console.log('Registering auth routes');
  
  fastify.post('/auth/login', {
    schema: {
      ...loginSchema,
      tags: ['Authentication'],
      summary: 'Login to get JWT token',
      description: 'Authenticate user and return JWT token',
      security: []
    }
  }, authController.login);
} 