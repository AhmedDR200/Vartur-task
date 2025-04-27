import { FastifyReply, FastifyRequest } from 'fastify';
import * as userService from '../services/user.service';

export async function getUsers(req: FastifyRequest, reply: FastifyReply) {
  const users = await userService.findAll();
  return reply.send(users);
}

export async function getUser(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const user = await userService.findById(Number(req.params.id));
    return reply.send(user);
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
}

export async function createUser(req: FastifyRequest<{ Body: { username: string; password: string; role?: string } }>, reply: FastifyReply) {
  try {
    const user = await userService.create(req.body);
    return reply.code(201).send(user);
  } catch (error: any) {
    return reply.code(400).send({ message: error.message });
  }
}

export async function updateUser(req: FastifyRequest<{ Params: { id: string }; Body: { username?: string; password?: string; role?: string } }>, reply: FastifyReply) {
  try {
    const user = await userService.update(Number(req.params.id), req.body);
    return reply.send(user);
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
}

export async function deleteUser(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    await userService.remove(Number(req.params.id));
    return reply.code(204).send();
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
}
