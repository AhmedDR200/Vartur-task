import { FastifyRequest, FastifyReply } from 'fastify';
import * as authService from '../services/auth.service';

export async function authHook(request: FastifyRequest, reply: FastifyReply) {
  // Skip authentication for login route
  if (request.url === '/api/auth/login' && request.method === 'POST') {
    return;
  }

  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = await authService.verifyToken(token, request.server);
    
    request.user = decoded;
  } catch (error) {
    reply.code(401).send({ message: 'Unauthorized' });
  }
} 