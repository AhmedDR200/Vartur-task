import { FastifyReply, FastifyRequest } from 'fastify';
import * as userService from '../services/user.service';

export async function getUsers(req: FastifyRequest, reply: FastifyReply) {
  const users = await userService.findAll();
  return reply.send(users);
}

export async function createUser(req: FastifyRequest<{ Body: { username: string; password: string; role?: string } }>, reply: FastifyReply) {
  const user = await userService.create(req.body);
  return reply.code(201).send(user);
}
