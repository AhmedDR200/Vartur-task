import { FastifyInstance } from 'fastify';
import * as authController from '../controllers/auth.controller';
import { loginSchema } from '../schemas/auth.schema';

export default async function (fastify: FastifyInstance) {
  fastify.post('/auth/login', { schema: loginSchema }, authController.login);
} 