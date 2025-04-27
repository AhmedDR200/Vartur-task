import { FastifyReply, FastifyRequest } from 'fastify';
import * as authService from '../services/auth.service';

export async function login(
  req: FastifyRequest<{ Body: { username: string; password: string } }>,
  reply: FastifyReply
) {
  try {
    const result = await authService.login(req.body.username, req.body.password, req.server);
    return reply.send(result);
  } catch (error) {
    return reply.code(401).send({ message: error.message });
  }
} 