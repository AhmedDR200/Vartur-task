import { FastifyInstance } from 'fastify';
import * as authController from '../controllers/auth.controller';
import { loginSchema } from '../schemas/auth.schema';

export default async function (fastify: FastifyInstance) {
  console.log('Registering auth routes');
  fastify.post('/auth/login', { schema: loginSchema }, authController.login);
} 